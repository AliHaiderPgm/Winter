import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Breadcrumb, Button, Collapse, Empty, Input, Tag } from "antd"
import {
	CarOutlined,
	ClockCircleOutlined,
	CreditCardOutlined,
	ExpandOutlined,
	MailOutlined,
	PhoneOutlined,
	RollbackOutlined,
	SafetyCertificateOutlined,
	SearchOutlined,
	ShoppingOutlined,
} from "@ant-design/icons"
import FancyHeader from "../../components/shared/FancyHeader"

const SUPPORT_EMAIL = "admin@winter.com"
const SUPPORT_PHONE = "+92 300 1234567"

const topics = [
	{
		key: "orders",
		title: "Orders & Tracking",
		description: "Order status, changes and cancellations",
		icon: <ShoppingOutlined />,
	},
	{
		key: "shipping",
		title: "Shipping & Delivery",
		description: "Delivery times, charges and coverage",
		icon: <CarOutlined />,
	},
	{
		key: "returns",
		title: "Returns & Refunds",
		description: "30-day returns and size exchanges",
		icon: <RollbackOutlined />,
	},
	{
		key: "payments",
		title: "Payments & Pricing",
		description: "Cards, cash on delivery and taxes",
		icon: <CreditCardOutlined />,
	},
	{
		key: "sizing",
		title: "Sizing & Fit",
		description: "Size charts and finding your fit",
		icon: <ExpandOutlined />,
	},
	{
		key: "account",
		title: "Account & Security",
		description: "Password, profile and privacy",
		icon: <SafetyCertificateOutlined />,
	},
]

const articles = [
	{
		id: "orders-status",
		topic: "orders",
		question: "How do I track the status of my order?",
		answer:
			"Sign in and open the Orders page from your account menu to see every order you have placed. Each one is labelled Pending, In Progress, Delivered or Cancelled, so you always know exactly where it is.",
	},
	{
		id: "orders-change",
		topic: "orders",
		question: "Can I change or cancel an order after placing it?",
		answer:
			"Yes, as long as it is still Pending. Once an order moves to In Progress it has already been handed to our courier, so email us your order ID and we will do our best to intercept it.",
	},
	{
		id: "orders-id",
		topic: "orders",
		question: "Where do I find my order ID?",
		answer:
			"Your order ID is in the confirmation email and on the Orders page. Please quote it in any support message so we can pull up your order straight away.",
	},
	{
		id: "shipping-times",
		topic: "shipping",
		question: "How long does delivery take?",
		answer:
			"Orders are dispatched within 24 hours. Delivery takes 2 to 4 business days in major cities and 4 to 7 business days elsewhere.",
	},
	{
		id: "shipping-cost",
		topic: "shipping",
		question: "How much does shipping cost?",
		answer:
			"Shipping is a flat Rs. 250 per order, and it is free on every order over Rs. 4,999. There are no extra charges added at checkout.",
	},
	{
		id: "shipping-international",
		topic: "shipping",
		question: "Do you deliver outside the country?",
		answer:
			"Not yet. We currently deliver only within the country, but international shipping is on our roadmap.",
	},
	{
		id: "returns-window",
		topic: "returns",
		question: "What is the return window?",
		answer:
			"You have 30 days from delivery to return unworn shoes in their original box with all tags attached. Items that show signs of wear cannot be accepted.",
	},
	{
		id: "returns-refunds",
		topic: "returns",
		question: "How long does a refund take?",
		answer:
			"Card payments are refunded to the same card within 5 to 7 business days after we receive the return. Cash on delivery orders are refunded by bank transfer within 7 business days.",
	},
	{
		id: "returns-exchange",
		topic: "returns",
		question: "Can I exchange for a different size?",
		answer:
			"Yes. Your first size exchange is free within 30 days, and the replacement pair ships as soon as the original is handed to the courier.",
	},
	{
		id: "payments-methods",
		topic: "payments",
		question: "Which payment methods do you accept?",
		answer:
			"You can pay by debit or credit card through our secure Stripe checkout, or choose cash on delivery.",
	},
	{
		id: "payments-cod",
		topic: "payments",
		question: "Is cash on delivery available?",
		answer:
			"Yes, cash on delivery is available on orders up to Rs. 25,000. Please keep the exact amount ready for the rider.",
	},
	{
		id: "payments-tax",
		topic: "payments",
		question: "Do the prices include tax?",
		answer:
			"Yes. The price shown on every product page is the final price you pay, including tax.",
	},
	{
		id: "sizing-choose",
		topic: "sizing",
		question: "How do I choose the right size?",
		answer:
			"Every product page lists the sizes available for that model. If you are between two sizes, go for the larger one, as running and basketball styles fit close to the foot.",
	},
	{
		id: "sizing-wrong",
		topic: "sizing",
		question: "What if the size I ordered does not fit?",
		answer:
			"Request a free size exchange within 30 days from the Orders page, or contact us and we will arrange the swap for you.",
	},
	{
		id: "sizing-brands",
		topic: "sizing",
		question: "Do sizes differ between brands?",
		answer:
			"They can differ slightly. Most brands vary by about half a size, so measuring your foot and comparing it with the sizes listed on the product page is the safest approach.",
	},
	{
		id: "account-password",
		topic: "account",
		question: "How do I change my password?",
		answer:
			"Sign in, open your Profile page and choose Change password. You will need to enter your current password to set a new one.",
	},
	{
		id: "account-forgot",
		topic: "account",
		question: "I forgot my password, what now?",
		answer:
			"Self-service password reset is coming soon. In the meantime, email us from the address on your account and we will help you get back in.",
	},
	{
		id: "account-security",
		topic: "account",
		question: "How is my account protected?",
		answer:
			"Passwords are stored hashed with bcrypt, never in plain text, and your session is carried in a signed authentication cookie that expires automatically.",
	},
]

const matchesFilters = (article, search, topic) => {
	if (topic && article.topic !== topic) return false
	if (!search) return true
	return `${article.question} ${article.answer}`.toLowerCase().includes(search)
}

export default function Help() {
	const navigate = useNavigate()
	const [query, setQuery] = useState("")
	const [activeTopic, setActiveTopic] = useState(null)
	const [activeKeys, setActiveKeys] = useState([])

	useEffect(() => {
		document.title = "Help Center"
		return () => {
			document.title = "Winter"
		}
	}, [])

	const filteredArticles = useMemo(() => {
		const search = query.trim().toLowerCase()
		return articles.filter((article) => matchesFilters(article, search, activeTopic))
	}, [query, activeTopic])

	// Keep the most relevant answer open instead of making the user click again.
	useEffect(() => {
		const search = query.trim().toLowerCase()
		const firstMatch = articles.find((article) => matchesFilters(article, search, activeTopic))
		setActiveKeys(firstMatch ? [firstMatch.id] : [])
	}, [query, activeTopic])

	const filteredSearch = query || activeTopic
	const activeTopicTitle = topics.find((topic) => topic.key === activeTopic)?.title
	const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Support request - Winter Store")}`

	const handleTopic = (key) => {
		setActiveTopic((prev) => (prev === key ? null : key))
	}

	const clearFilters = () => {
		setQuery("")
		setActiveTopic(null)
	}

	const breadCrumbItems = [
		{
			title: <Link to="/">Home</Link>,
		},
		{
			title: "Help Center",
		},
	]

	const contactOptions = [
		{
			key: "email",
			title: "Email us",
			value: SUPPORT_EMAIL,
			description: "We reply to every message within 24 hours.",
			icon: <MailOutlined />,
			href: mailtoLink,
		},
		{
			key: "phone",
			title: "Call us",
			value: SUPPORT_PHONE,
			description: "Monday to Saturday, 9:00 am to 8:00 pm.",
			icon: <PhoneOutlined />,
			href: `tel:${SUPPORT_PHONE.replace(/\s/g, "")}`,
		},
		{
			key: "orders",
			title: "Manage an order",
			value: "Open your orders",
			description: "Check status, cancel a pending order or start a return.",
			icon: <ShoppingOutlined />,
			to: "/orders",
		},
	]

	const collapseItems = filteredArticles.map((article) => ({
		key: article.id,
		label: article.question,
		children: <p className="m-0 help-answer">{article.answer}</p>,
	}))

	return (
		<div className="help-center">
			<div className="px-4 px-md-5 py-3">
				<Breadcrumb items={breadCrumbItems} />
			</div>
			<FancyHeader front="help" back="center" small="support" />

			<div className="container py-4 py-md-5">
				<div className="help-search text-center mb-4">
					<h2 className="fw-bold mb-2">How can we help you today?</h2>
					<p className="text-black-50">
						Search our answers, or pick a topic below to narrow things down.
					</p>
					<Input
						size="large"
						className="mt-2"
						placeholder="Search for answers"
						prefix={<SearchOutlined className="text-black-50" />}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						allowClear
					/>
					<div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
						<Button className="btn-outline" onClick={() => navigate("/orders")}>Track an order</Button>
						<Button className="btn-outline" onClick={() => navigate("/men")}>Browse the catalog</Button>
						<Button className="btn-filled" href={mailtoLink}>Contact support</Button>
					</div>
				</div>

				<div className="row g-3 mb-5">
					{
						topics.map((topic) => (
							<div className="col-12 col-sm-6 col-lg-4" key={topic.key}>
								<button
									type="button"
									className={`help-topic ${activeTopic === topic.key ? "active" : ""}`}
									onClick={() => handleTopic(topic.key)}
									aria-pressed={activeTopic === topic.key}
								>
									<span className="icon">{topic.icon}</span>
									<p className="title">{topic.title}</p>
									<p className="description">{topic.description}</p>
								</button>
							</div>
						))
					}
				</div>

				<div className="row g-4">
					<div className="col-12 col-lg-8">
						<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
							<h3 className="fw-bold m-0">Frequently asked questions</h3>
							<p className="text-black-50 m-0">
								{
									filteredSearch
										? `${filteredArticles.length} of ${articles.length} answers`
										: `${articles.length} answers`
								}
							</p>
						</div>
						{
							activeTopicTitle ? <div className="d-flex align-items-center gap-2 mb-3">
								<span className="text-black-50">Filtering by</span>
								<Tag color="#111" className="text-white">{activeTopicTitle}</Tag>
							</div> : null
						}
						{
							filteredArticles.length === 0 ? <div className="py-5">
								<Empty description="No answers match your search yet.">
									<Button className="btn-outline" onClick={clearFilters}>Clear filters</Button>
								</Empty>
							</div> : <Collapse
								accordion
								items={collapseItems}
								activeKey={activeKeys}
								onChange={(keys) => setActiveKeys(Array.isArray(keys) ? keys : [keys])}
							/>
						}
					</div>

					<div className="col-12 col-lg-4">
						<div className="help-cta h-100">
							<h4 className="fw-bold mb-2">Still stuck?</h4>
							<p className="mb-4">
								Send us your order ID and what went wrong. A real person will get back to you
								within 24 hours.
							</p>
							<Button className="bg-white text-black border-0" href={mailtoLink} block>Email support</Button>
							<div className="d-flex align-items-center gap-2 mt-3">
								<ClockCircleOutlined />
								<p className="m-0">Monday to Saturday, 9:00 am to 8:00 pm</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className="fw-bold mt-5 mb-3">Other ways to reach us</h3>
				<div className="row g-3">
					{
						contactOptions.map((option) => {
							const content = <>
								<span className="icon">{option.icon}</span>
								<p className="title">{option.title}</p>
								<p className="value">{option.value}</p>
								<p className="description">{option.description}</p>
							</>
							return <div className="col-12 col-md-6 col-lg-4" key={option.key}>
								{
									option.to
										? <Link to={option.to} className="help-contact">{content}</Link>
										: <a href={option.href} className="help-contact">{content}</a>
								}
							</div>
						})
					}
				</div>
			</div>
		</div>
	)
}
