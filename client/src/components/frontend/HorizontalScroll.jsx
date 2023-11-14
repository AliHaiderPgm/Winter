import {
	ArrowUpwardOutlined,
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
} from "@mui/icons-material"
import BnbCard from "../shared/BnbCard"
import React, { useEffect, useMemo, useRef, useState } from "react"
import BnbCardLoading from "../shared/BnbCardLoading"
import { useProduct } from "../../context/ProductContext"
const HorizontalScroll = () => {
	const [recentProducts, setRecentProducts] = useState([])
	const [topRatedProducts, setTopRatedProducts] = useState([])
	const [isActive, setIsActive] = useState("new")
	const [loading, setLoading] = useState(false)
	const { RecentAndTopRated } = useProduct()
	const log = useRef(true)
	const products = useMemo(() => {
		return isActive === "topRated" ? topRatedProducts : recentProducts;
	}, [isActive, recentProducts, topRatedProducts]);
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
		setIsActive(e.target.value)
	}
	// get products
	const getRecentProducts = async () => {
		setLoading(true)
		try {
			const res = await RecentAndTopRated({ limit: 6, sort: -1 })
			setRecentProducts(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	const getTopRatedProducts = async () => {
		setLoading(true)
		try {
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
			getTopRatedProducts()
			log.current = false
		}
	}, [])
	return (
		<>
			<div className="horizontal-scroll">
				<div className="d-flex align-items-center ">
					<div className="buttons-wrapper my-3">
						<ArrowUpwardOutlined className={`arrow ${isActive}`} />
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
						<KeyboardArrowLeftOutlined className="icon" onClick={scrollLeft} />
						<KeyboardArrowRightOutlined className="icon" onClick={scrollRight} />
					</div>
				</div>
				<div className="cards-container" ref={scroll}>
					{
						loading ? Array.from({ length: 6 }, (_, index) => {
							return <BnbCardLoading key={index} />
						})
							: products.map((product, index) => {
								return <div className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3" key={index}>
									<BnbCard data={product} uniqueKey={product._id} />
								</div>
							})
					}
				</div>
			</div>
		</>
	)
}
export default HorizontalScroll
