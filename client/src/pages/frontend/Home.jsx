import React, { Suspense, useEffect, useMemo, useRef, useState } from "react"
import Header from "../../components/shared/Header"
import Trusted from "../../components/frontend/Trusted"
import Services from "../../components/frontend/Services"
import AboutSection from "../../components/frontend/AboutSection"
import CatalogSection from "../../components/frontend/CatalogSection"
import HorizontalScroll from "../../components/frontend/HorizontalScroll"
import { ArrowUpwardOutlined } from "@mui/icons-material"
import Featured from "../../components/frontend/Featured"
import { useProduct } from "../../context/ProductContext"
import FancyHeader from "../../components/shared/FancyHeader"
import Loader from "../../components/shared/Loader"

const Home = () => {
	const [recentProducts, setRecentProducts] = useState([])
	const [topRatedProducts, setTopRatedProducts] = useState([])
	const [isActive, setIsActive] = useState("new")
	const [loading, setLoading] = useState(false)
	const { RecentAndTopRated } = useProduct()
	const log = useRef(true)
	const products = useMemo(() => {
		return isActive === "topRated" ? topRatedProducts : recentProducts;
	}, [isActive, recentProducts, topRatedProducts]);
	const handleCarousel = async (e) => {
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
			<Header title="E-Store" />
			<div className="wrapper">
				<CatalogSection />
				<div className="container my-4">
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
					<HorizontalScroll products={products} loading={loading} />
				</div>
				<FancyHeader front="featured" back="sneakers" small="products" />
				{/* <Featured /> */}
				<Trusted />
				<AboutSection />
				<Services />
			</div>
		</>
	)
}

export default Home
