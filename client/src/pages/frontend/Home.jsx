import Header from "../../components/shared/Header"
import Trusted from "../../components/frontend/Trusted"
import Services from "../../components/frontend/Services"
import AboutSection from "../../components/frontend/AboutSection"
import CatalogSection from "../../components/frontend/CatalogSection"
import HorizontalScroll from "../../components/frontend/HorizontalScroll"
import { useState } from "react"
import { ArrowUpwardOutlined } from "@mui/icons-material"
import Featured from "../../components/frontend/Featured"

const Home = () => {
	const [isActive, setIsActive] = useState("New")
	const handleCarousel = (e) => {
		setIsActive(e.target.value)
	}
	let arrowClass
	if (isActive === "New") {
		arrowClass = "first"
	} else if (isActive === "Trending") {
		arrowClass = "second"
	} else {
		arrowClass = "third"
	}
	return (
		<>
			<Header title="E-Store" />
			<div className="wrapper">
				<CatalogSection />
				<div className="container my-4">
					<div className="buttons-wrapper my-3">
						<ArrowUpwardOutlined className={`arrow ${arrowClass}`} />
						<button
							className={isActive === "New" ? "active" : ""}
							onClick={handleCarousel}
							value="New"
						>
							New Arrivals
						</button>
						<button
							className={isActive === "Trending" ? "active" : ""}
							onClick={handleCarousel}
							value="Trending"
						>
							What{"'"}s Trending
						</button>
						<button
							className={isActive === "Members" ? "active" : ""}
							onClick={handleCarousel}
							value="Members"
						>
							Member Exclusive
						</button>
					</div>
					<HorizontalScroll />
				</div>
				<Featured />
				<Trusted />
				<AboutSection />
				<Services />
			</div>
		</>
	)
}

export default Home
