import BnbCard from "../shared/BnbCard"
import React, { useEffect, useRef, useState } from "react"
import BnbCardLoading from "../shared/BnbCardLoading"
import { useProduct } from "../../context/ProductContext"
import { ArrowRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"
const HorizontalScroll = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const { RecentAndTopRated } = useProduct()
	const log = useRef(true)
	const scroll = useRef()
	const [isActive, setIsActive] = useState("new")
	const [arrowPosition, setArrowPosition] = useState(0);
	const newBtnRef = useRef(null);
	const topRatedBtnRef = useRef(null);
	const [newBtnWidth, setNewBtnWidth] = useState(0)
	const [topRatedBtnWidth, setTopRatedBtnWidth] = useState(0)

	useEffect(() => {
		setNewBtnWidth(newBtnRef.current.offsetWidth)
		setTopRatedBtnWidth(topRatedBtnRef.current.offsetWidth)
	}, []);
	const arrowStyle = {
		transform: `translateX(${arrowPosition}px)`,
	};

	const scrollRight = () => {
		if (scroll.current) {
			const totalWidth = scroll.current.scrollWidth
			const containerWidth = scroll.current.clientWidth
			const maxScroll = totalWidth - containerWidth

			scroll.current.scrollLeft += 900

			// Check if scroll position is at the end
			if (Math.ceil(scroll.current.scrollLeft) >= maxScroll) {
				scroll.current.scrollLeft = 0
			}
		}
	}
	const scrollLeft = () => {
		if (scroll.current) {
			scroll.current.scrollLeft -= 900

			if (scroll.current.scrollLeft <= 0) {
				const totalWidth = scroll.current.scrollWidth
				scroll.current.scrollLeft = totalWidth
			}
		}
	}

	const handleCarousel = (e) => {
		const val = e.target.value
		setIsActive(val)
		if (val === "new") {
			getRecentProducts()
			setArrowPosition(0)
		}
		if (val === "topRated") {
			getTopRatedProducts()
			setArrowPosition(newBtnWidth + 10)
		}
	}
	// get products
	const getRecentProducts = async () => {
		try {
			setLoading(true)
			setProducts([])
			const res = await RecentAndTopRated({ limit: 6, sort: -1 })
			setProducts(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	const getTopRatedProducts = async () => {
		try {
			setLoading(true)
			setProducts([])
			const res = await RecentAndTopRated({ limit: 6, topRated: true })
			setProducts(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (log.current) {
			getRecentProducts()
			log.current = false
		}
	}, [])
	return (
		<>
			<div className="horizontal-scroll">
				<div className="d-flex align-items-center ">
					<div className="buttons-wrapper my-3">
						<ArrowRightOutlined className={`arrow ${isActive}`} style={arrowStyle} />
						<button
							className={isActive === "new" ? "active" : ""}
							onClick={handleCarousel}
							value="new"
							ref={newBtnRef}
						>
							New Arrivals
						</button>
						<button
							className={isActive === "topRated" ? "active" : ""}
							onClick={handleCarousel}
							value="topRated"
							ref={topRatedBtnRef}
						>
							Top Rated
						</button>
					</div>
					<div className="controller d-none d-md-flex">
						<LeftOutlined className="icon" onClick={scrollLeft} />
						<RightOutlined className="icon" onClick={scrollRight} />
					</div>
				</div>
				<div className="cards-container" ref={scroll}>
					{
						loading ? Array.from({ length: 5 }, (_, index) => {
							return <BnbCardLoading key={index} />
						}) : products?.map((product, index) => {
							return <div className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3" key={index}>
								<BnbCard data={product} uniqueKey={product._id} />
							</div>
						})
					}
					{
						!loading && products.length === 0 ? <p className="fw-bold text-center fs-4">Products coming soon...</p> : null
					}
				</div>
			</div>
		</>
	)
}
export default HorizontalScroll
