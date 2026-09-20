import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Breadcrumb, Button } from "antd"
import {
	CarOutlined,
	CheckCircleOutlined,
	CreditCardOutlined,
	CustomerServiceOutlined,
	ExpandOutlined,
	RollbackOutlined,
	SearchOutlined,
	ShoppingOutlined,
} from "@ant-design/icons"
import FancyHeader from "../../components/shared/FancyHeader"
import Trusted from "../../components/frontend/Trusted"
import data from "../../global/data"
import StoryImage from "../../assets/hero-section.jpg"
import MenImage from "../../assets/men.jpg"
import WomenImage from "../../assets/women.jpg"
import KidsImage from "../../assets/child.jpg"

// Numbers come from the same data the catalogs are built from, so they stay true.
const brandsInStock = data.brands.filter((brand) => !brand.disabled).length
const shoeTypes = data.types.filter((type) => !type.disabled).length
const sizeValues = data.sizes.map((size) => Number(size.value)).filter(Number.isFinite)

const departments = [
	{ title: "Men", description: "Sizes 6 to 14", image: MenImage, to: "/men", alt: "Men's shoes" },
	{ title: "Women", description: "Sizes 5 to 10.5", image: WomenImage, to: "/women", alt: "Women's shoes" },
	{ title: "Kids", description: "Sizes 18 to 30", image: KidsImage, to: "/kids", alt: "Kids' shoes" },
]

const values = [
	{
		key: "curated",
		title: "Curated, not crowded",
		description:
			"Every pair is listed with the exact sizes, stock and rating we hold, so what you see is what you can actually order.",
		tone: "green",
		icon: <CheckCircleOutlined />,
	},
	{
		key: "pricing",
		title: "Straight-up pricing",
		description:
			"Prices include tax, shipping is free over Rs. 4,999, and nothing new appears at checkout.",
		tone: "blue",
		icon: <CreditCardOutlined />,
	},
	{
		key: "fit",
		title: "Fit comes first",
		description:
			"Each product page lists its own size run. If the fit is off, your first size exchange is free within 30 days.",
		tone: "violet",
		icon: <ExpandOutlined />,
	},
	{
		key: "support",
		title: "Support that answers",
		description:
			"A real person reads every message and replies within 24 hours, Monday to Saturday, 9:00 am to 8:00 pm.",
		tone: "amber",
		icon: <CustomerServiceOutlined />,
	},
]

const steps = [
	{
		key: "browse",
		title: "Find your pair",
		description: "Filter by department, brand, category, size and price until the shortlist is short.",
		tone: "blue",
		icon: <SearchOutlined />,
	},
	{
		key: "order",
		title: "Order and pay",
		description: "Pay by card through our secure checkout, or choose cash on delivery up to Rs. 25,000.",
		tone: "green",
		icon: <ShoppingOutlined />,
	},
	{
		key: "deliver",
		title: "Track delivery",
		description: "We dispatch within 24 hours and you follow every status change from your orders page.",
		tone: "teal",
		icon: <CarOutlined />,
	},
	{
		key: "aftercare",
		title: "Return or exchange",
		description: "Thirty days to change your mind, with free size exchanges if the fit is not right.",
		tone: "rose",
		icon: <RollbackOutlined />,
	},
]

export default function About() {
	const introRef = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		document.title = "About Us"
		const metaDescription = document.querySelector('meta[name="description"]')

		if (metaDescription && introRef.current) {
			metaDescription.content = introRef.current.textContent
		}

		return () => {
			document.title = "Winter"
			if (metaDescription) {
				metaDescription.content =
					"Welcome to our online e-store, your one-stop destination for all your shopping needs. Discover an extensive range of high-quality products, carefully curated to cater to your diverse interests and preferences."
			}
		}
	}, [])

	const breadCrumbItems = [
		{
			title: <Link to="/">Home</Link>,
		},
		{
			title: "About Us",
		},
	]

	const stats = [
		{ value: "3", label: "Departments - Men, Women & Kids" },
		{ value: `${brandsInStock}`, label: "Brands in stock" },
		{ value: `${shoeTypes}`, label: "Shoe categories" },
		{ value: "30 days", label: "Returns & size exchanges" },
	]

	return (
		<div className="about-us">
			<div className="px-4 px-md-5 py-3">
				<Breadcrumb items={breadCrumbItems} />
			</div>
			<FancyHeader front="about" back="us" small="our story" />

			<div className="container py-4 py-md-5">
				<div className="row g-4 g-lg-5 align-items-center">
					<div className="col-12 col-lg-6">
						<p className="text-uppercase fw-semibold text-black-50 mb-2">Who we are</p>
						<h2 className="fw-bold headline mb-3">
							We create <span>incredible</span> products
						</h2>
						<p ref={introRef}>
							Winter is a footwear store built around one simple idea: buying shoes online should
							feel as certain as trying them on. We stock {brandsInStock} brands across {shoeTypes}{" "}
							categories, from running shoes to everyday lifestyle pairs, for men, women and kids.
						</p>
						<p>
							Each listing carries the sizes we actually hold, the stock behind it and the rating
							from people who already bought it. When something does not fit, our return window
							gives you thirty days to sort it out without a fight.
						</p>
						<div className="d-flex flex-wrap gap-2 mt-4">
							<Button className="btn-filled" onClick={() => navigate("/men")}>Shop the catalog</Button>
							<Button className="btn-outline" onClick={() => navigate("/help")}>Visit the Help Center</Button>
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<img
							src={StoryImage}
							alt="Winter store footwear"
							className="img-fluid rounded story-image"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>

				<div className="row g-3 py-5">
					{
						stats.map((stat) => (
							<div className="col-6 col-lg-3" key={stat.label}>
								<div className="about-stat h-100">
									<p className="value">{stat.value}</p>
									<p className="label">{stat.label}</p>
								</div>
							</div>
						))
					}
				</div>

				<h3 className="fw-bold mb-3">What we stand for</h3>
				<div className="row g-3">
					{
						values.map((value) => (
							<div className="col-12 col-sm-6 col-lg-3" key={value.key}>
								<div className="about-value h-100">
									<span className={`icon tone-${value.tone}`}>{value.icon}</span>
									<p className="title">{value.title}</p>
									<p className="description">{value.description}</p>
								</div>
							</div>
						))
					}
				</div>

				<h3 className="fw-bold mt-5 mb-3">How ordering works</h3>
				<div className="row g-3">
					{
						steps.map((step, index) => (
							<div className="col-12 col-sm-6 col-lg-3" key={step.key}>
								<div className="about-step h-100">
									<div className="d-flex align-items-center gap-2">
										<span className={`icon tone-${step.tone}`}>{step.icon}</span>
										<span className="count">{`Step ${index + 1}`}</span>
									</div>
									<p className="title">{step.title}</p>
									<p className="description">{step.description}</p>
								</div>
							</div>
						))
					}
				</div>

				<h3 className="fw-bold mt-5 mb-3">Shop by department</h3>
				<div className="row g-3">
					{
						departments.map((department) => (
							<div className="col-12 col-sm-4" key={department.title}>
								<button
									type="button"
									className="about-department"
									onClick={() => navigate(department.to)}
								>
									<img
										src={department.image}
										alt={department.alt}
										className="img-fluid"
										loading="lazy"
										decoding="async"
									/>
									<div className="overlay">
										<h4>{department.title}</h4>
										<p>{department.description}</p>
									</div>
								</button>
							</div>
						))
					}
				</div>
			</div>

			<div className="container pb-4 pb-md-5">
				<div className="about-cta row g-3 align-items-center">
					<div className="col-12 col-lg-8 mt-0">
						<h3 className="fw-bold mb-2">Ready to find your next pair?</h3>
						<p className="m-0">
							{`Sizes ${Math.min(...sizeValues)} to ${Math.max(...sizeValues)} across every department, with free shipping over Rs. 4,999.`}
						</p>
					</div>
					<div className="col-12 col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end mt-0">
						<Button className="bg-white text-black border-0" onClick={() => navigate("/women")}>Shop Women</Button>
						<Button className="bg-white text-black border-0" onClick={() => navigate("/kids")}>Shop Kids</Button>
					</div>
				</div>
			</div>

			<Trusted />
		</div>
	)
}
