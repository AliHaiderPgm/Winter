import BnbCard from "../shared/BnbCard"
import React, { useEffect, useMemo, useRef, useState } from "react"
import BnbCardLoading from "../shared/BnbCardLoading"
import { useProduct } from "../../context/ProductContext"
import { ArrowUpOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"
const HorizontalScroll = () => {
	const [recentProducts, setRecentProducts] = useState([])
	const [topRatedProducts, setTopRatedProducts] = useState([])
	const [isActive, setIsActive] = useState("new")
	const [loading, setLoading] = useState(false)
	const { RecentAndTopRated } = useProduct()
	const log = useRef(true)
	// const products = useMemo(() => {
	// 	return isActive === "topRated" ? topRatedProducts : recentProducts;
	// }, [isActive, recentProducts, topRatedProducts]);
	const scroll = useRef()

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
		}
		if (val === "topRated") {
			getTopRatedProducts()
		}
	}
	// get products
	const getRecentProducts = async () => {
		try {
			setRecentProducts([])
			setTopRatedProducts([])
			setLoading(true)
			const res = await RecentAndTopRated({ limit: 6, sort: -1 })
			setRecentProducts(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	const getTopRatedProducts = async () => {
		try {
			setRecentProducts([])
			setTopRatedProducts([])
			setLoading(true)
			const res = await RecentAndTopRated({ limit: 6, topRated: true })
			setTopRatedProducts(res)
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
						<ArrowUpOutlined className={`arrow ${isActive}`} />
						<button
							className={isActive === "new" ? "active" : ""}
							onClick={handleCarousel}
							value="new"
						>
							New Arrivals
						</button>
						<button
							className={isActive === "topRated" ? "active" : ""}
							onClick={handleCarousel}
							value="topRated"
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
						loading ? Array.from({ length: 4 }, (_, index) => {
							return <BnbCardLoading key={index} />
						}) : null
					}
					{
						recentProducts.length > 0 ? recentProducts.map((product, index) => {
							return <div className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3" key={index}>
								<BnbCard data={product} uniqueKey={product._id} />
							</div>
						}) : null
					}
					{
						topRatedProducts.length > 0 ? topRatedProducts.map((product, index) => {
							return <div className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3" key={index}>
								<BnbCard data={product} uniqueKey={product._id} />
							</div>
						}) : null
					}
				</div>
			</div>
		</>
	)
}
export default HorizontalScroll
