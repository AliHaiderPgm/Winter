import { useState } from "react"
import axios from "axios"
import Button from "antd/es/button"
import { CheckCircleFilled } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.png"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"
import { ServerURL } from "../../context"

const SUBSCRIBE_URL = `${ServerURL()}/subscribe`
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const footerLinks = [
	{
		title: "About Us",
		navigateTo: "/about"
	},
	{
		title: "Help Center",
		navigateTo: "/help"
	},
	{
		title: "Contact Us",
		navigateTo: "/contact"
	},
]

export default function Footer() {
	const year = new Date().getFullYear()
	const [email, setEmail] = useState("")
	const [subscribing, setSubscribing] = useState(false)
	const [notice, setNotice] = useState(null)

	const handleSubscribe = async (event) => {
		event.preventDefault()
		const value = email.trim()

		if (!EMAIL_PATTERN.test(value)) {
			setNotice({ tone: "error", message: "Please enter a valid email address." })
			return
		}

		try {
			setSubscribing(true)
			setNotice(null)
			const { data } = await axios.post(SUBSCRIBE_URL, { email: value })
			setNotice({ tone: "done", message: data?.message || "You are on the list." })
			setEmail("")
		} catch (requestError) {
			setNotice({
				tone: "error",
				message: requestError.response?.data?.message || "We could not add you right now. Please try again.",
			})
		} finally {
			setSubscribing(false)
		}
	}

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
		if (notice) setNotice(null)
	}

	return (
		<div className="container-fluid text-light footer-wrapper">
			<div className="container p-5">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<img
									src={logo}
									alt="Winter logo"
									className="img-fluid"
									loading="lazy"
								/>
							</div>
							<div className="col-12">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
									culpa impedit fugit vel autem veritatis commodi esse qui.
									Iure, corporis.
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<h3 className="fw-bold">Office</h3>
							</div>
							<div className="col-12">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Beatae, facilis! Quo quisquam
								</p>
							</div>
							<div className="col-12">
								<p className="m-0">
									<a href="mailto:admin@winter.com" className="footer-link">
										<u>admin@winter.com</u>
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<h3 className="fw-bold">Links</h3>
							</div>
							<div className="col-12">
								<ul className="navbar-nav">
									{
										footerLinks.map((link, index) => {
											return <li key={index}>
											<NavLink
												to={link.navigateTo}
												className={({ isActive }) =>
													isActive ? "footer-link active" : "footer-link"
												}
											>
													{link.title}
												</NavLink>
											</li>
										})
									}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<h3 className="fw-bold p-0">Newsletter</h3>
						{
							notice?.tone === "done" ? (
								<p className="newsletter-done d-flex align-items-start gap-2 mb-0">
									<CheckCircleFilled />
									<span>{notice.message}</span>
								</p>
							) : (
								<form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
									<label className="visually-hidden" htmlFor="newsletter-email">
										Email address
									</label>
									<input
										id="newsletter-email"
										type="email"
										name="email"
										className="form-control"
										placeholder="you@example.com"
										value={email}
										onChange={handleEmailChange}
										autoComplete="email"
										disabled={subscribing}
										aria-invalid={notice?.tone === "error"}
										aria-describedby={notice?.tone === "error" ? "newsletter-error" : undefined}
									/>
									<Button className="mt-2" htmlType="submit" loading={subscribing}>
										Subscribe
									</Button>
									{
										notice?.tone === "error" ? (
											<p className="newsletter-error mb-0" id="newsletter-error" role="alert">
												{notice.message}
											</p>
										) : null
									}
								</form>
							)
						}
						<p className="newsletter-note mb-0">
							New arrivals and sales, about once a month. Unsubscribe any time.
						</p>
					</div>
					<hr className="my-3" />
					<div className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center mt-1">
						<p className="text-center m-0">
							&#169; All Rights Reserved {year}.
						</p>
						<ul className="navbar-nav flex-row gap-3 text-light-emphasis ">
							<li>
								<BsFacebook className="fs-4" />
							</li>
							<li>
								<BsTwitter className="fs-4" />
							</li>
							<li>
								<BsInstagram className="fs-4" />
							</li>
							<li>
								<BsGithub className="fs-4" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
