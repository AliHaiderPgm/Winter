import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Alert, Breadcrumb, Button, Form, Input, Result, Select } from "antd"
import {
	CarOutlined,
	ClockCircleOutlined,
	MailOutlined,
	MessageOutlined,
	PhoneOutlined,
	SearchOutlined,
	ShoppingOutlined,
	UserOutlined,
} from "@ant-design/icons"
import FancyHeader from "../../components/shared/FancyHeader"
import { ServerURL } from "../../context"
import { useAuth } from "../../context/AuthContext"

const SUPPORT_EMAIL = "admin@winter.com"
const SUPPORT_PHONE = "+92 300 1234567"
const CONTACT_URL = `${ServerURL()}/contact`

// Same topics the Help Center uses, so a message arrives already sorted.
const topicOptions = [
	{ value: "orders", label: "Orders & Tracking" },
	{ value: "shipping", label: "Shipping & Delivery" },
	{ value: "returns", label: "Returns & Refunds" },
	{ value: "payments", label: "Payments & Pricing" },
	{ value: "sizing", label: "Sizing & Fit" },
	{ value: "account", label: "Account & Security" },
	{ value: "other", label: "Something else" },
]

const channels = [
	{
		key: "email",
		title: "Email us",
		value: SUPPORT_EMAIL,
		description: "Every message is read by a person, not a bot.",
		tone: "blue",
		icon: <MailOutlined />,
		href: `mailto:${SUPPORT_EMAIL}`,
	},
	{
		key: "phone",
		title: "Call us",
		value: SUPPORT_PHONE,
		description: "Monday to Saturday, 9:00 am to 8:00 pm.",
		tone: "teal",
		icon: <PhoneOutlined />,
		href: `tel:${SUPPORT_PHONE.replace(/\s/g, "")}`,
	},
	{
		key: "orders",
		title: "Track an order",
		value: "Open your orders",
		description: "Status, cancellations and returns are all there.",
		tone: "amber",
		icon: <ShoppingOutlined />,
		to: "/orders",
	},
]

const quickAnswers = [
	{
		key: "track",
		title: "Where is my order?",
		description: "Follow every status change from Pending to Delivered.",
		tone: "blue",
		icon: <CarOutlined />,
		to: "/orders",
	},
	{
		key: "faq",
		title: "Browse the Help Center",
		description: "Eighteen answers on shipping, returns, sizing and payments.",
		tone: "green",
		icon: <SearchOutlined />,
		to: "/help",
	},
	{
		key: "sizing",
		title: "Not sure about your size?",
		description: "Sizing help and free exchanges within 30 days.",
		tone: "violet",
		icon: <MessageOutlined />,
		to: "/help",
	},
]

export default function Contact() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState("")
	const [sentFrom, setSentFrom] = useState(null)

	useEffect(() => {
		document.title = "Contact Us"
		return () => {
			document.title = "Winter"
		}
	}, [])

	// Signed-in visitors should not have to type what we already know.
	useEffect(() => {
		if (!user) return
		form.setFieldsValue({
			name: [user.name, user.secondName].filter(Boolean).join(" "),
			email: user.email,
		})
	}, [form, user])

	const handleSubmit = async (values) => {
		try {
			setSubmitting(true)
			setError("")
			await axios.post(CONTACT_URL, {
				name: values.name.trim(),
				email: values.email.trim(),
				topic: values.topic,
				orderId: values.orderId ? values.orderId.trim() : "",
				message: values.message.trim(),
			})
			setSentFrom(values.email.trim())
			form.resetFields()
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"We could not send your message right now. Please try again, or email us directly."
			)
		} finally {
			setSubmitting(false)
		}
	}

	const handleSendAnother = () => {
		setSentFrom(null)
		setError("")
		if (user) form.setFieldsValue({ name: [user.name, user.secondName].filter(Boolean).join(" "), email: user.email })
	}

	const breadCrumbItems = [
		{
			title: <Link to="/">Home</Link>,
		},
		{
			title: "Contact Us",
		},
	]

	return (
		<div className="contact-page">
			<div className="px-4 px-md-5 py-3">
				<Breadcrumb items={breadCrumbItems} />
			</div>
			<FancyHeader front="contact" back="us" small="get in touch" />

			<div className="container py-4 py-md-5">
				<div className="contact-intro">
					<h2 className="fw-bold mb-2">Tell us what went wrong</h2>
					<p className="text-black-50 mb-0">
						Send us the details and a real person will get back to you within 24 hours. For order
						problems, adding your order ID helps us answer in one go.
					</p>
				</div>

				<div className="row g-4 mt-1">
					<div className="col-12 col-lg-7">
						<div className="contact-card">
							{
								sentFrom ? <Result
									status="success"
									title="Message sent"
									subTitle={`Thanks, we have it. Look out for a reply at ${sentFrom} within 24 hours, Monday to Saturday.`}
									extra={[
										<Button key="another" className="btn-outline" onClick={handleSendAnother}>
											Send another message
										</Button>,
										<Button key="help" className="btn-filled" onClick={() => navigate("/help")}>
											Browse the Help Center
										</Button>,
									]}
								/> : <>
									{error && <Alert className="mb-3" type="error" showIcon message={error} />}
									<Form
										form={form}
										layout="vertical"
										requiredMark={false}
										onFinish={handleSubmit}
										initialValues={{ topic: "orders" }}
									>
										<div className="d-flex flex-column flex-md-row gap-0 gap-md-3">
											<Form.Item
												name="name"
												label="Your name"
												className="w-100"
												rules={[
													{ required: true, whitespace: true, message: "Please enter your name" },
													{ min: 2, max: 80, message: "Please enter between 2 and 80 characters" },
												]}
											>
												<Input prefix={<UserOutlined />} size="large" placeholder="Jane Doe" />
											</Form.Item>
											<Form.Item
												name="email"
												label="Email address"
												className="w-100"
												rules={[
													{ required: true, message: "Please enter your email address" },
													{ type: "email", message: "Please enter a valid email address" },
												]}
											>
												<Input prefix={<MailOutlined />} size="large" placeholder="you@example.com" />
											</Form.Item>
										</div>
										<div className="d-flex flex-column flex-md-row gap-0 gap-md-3">
											<Form.Item
												name="topic"
												label="What is it about?"
												className="w-100"
												rules={[{ required: true, message: "Please choose a topic" }]}
											>
												<Select size="large" options={topicOptions} />
											</Form.Item>
											<Form.Item
												name="orderId"
												label="Order ID (optional)"
												className="w-100"
												rules={[{ max: 40, message: "That order ID looks too long" }]}
											>
												<Input size="large" placeholder="From your confirmation email" />
											</Form.Item>
										</div>
										<Form.Item
											name="message"
											label="Your message"
											rules={[
												{ required: true, whitespace: true, message: "Please write your message" },
												{ min: 10, message: "Please add a little more detail (10 characters minimum)" },
												{ max: 2000, message: "Please keep it under 2000 characters" },
											]}
										>
											<Input.TextArea
												rows={6}
												maxLength={2000}
												showCount
												placeholder="What happened, and what would you like us to do?"
											/>
										</Form.Item>
										<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2">
											<p className="text-black-50 small m-0">
												We reply to the address above, usually the same day.
											</p>
											<Button className="btn-filled" size="large" htmlType="submit" loading={submitting}>
												Send message
											</Button>
										</div>
									</Form>
								</>
							}
						</div>
					</div>

					<div className="col-12 col-lg-5">
						<div className="contact-channels">
							<h3 className="fw-bold mb-3">Other ways to reach us</h3>
							<div className="d-flex flex-column gap-3">
								{
									channels.map((channel) => {
										const content = <>
											<div className="d-flex align-items-center gap-2">
												<span className={`icon tone-${channel.tone}`}>{channel.icon}</span>
												<p className="title">{channel.title}</p>
											</div>
											<p className="value">{channel.value}</p>
											<p className="description">{channel.description}</p>
										</>
										return channel.to ? (
											<Link to={channel.to} key={channel.key} className="contact-channel">
												{content}
											</Link>
										) : (
											<a href={channel.href} key={channel.key} className="contact-channel">
												{content}
											</a>
										)
									})
								}
							</div>
							<div className="contact-hours d-flex align-items-start gap-2 mt-3">
								<ClockCircleOutlined />
								<p className="m-0">
									Messages sent after hours are answered the next working morning. Orders placed
									on weekends are dispatched on Monday.
								</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className="fw-bold mt-5 mb-3">Maybe we have already answered it</h3>
				<div className="row g-3">
					{
						quickAnswers.map((answer) => (
							<div className="col-12 col-md-4" key={answer.key}>
								<button type="button" className="contact-quick" onClick={() => navigate(answer.to)}>
									<span className={`icon tone-${answer.tone}`}>{answer.icon}</span>
									<p className="title">{answer.title}</p>
									<p className="description">{answer.description}</p>
								</button>
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}
