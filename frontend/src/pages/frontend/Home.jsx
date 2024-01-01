import Header from "../../components/shared/Header"
import Trusted from "../../components/frontend/Trusted"
import AboutSection from "../../components/frontend/AboutSection"
import CatalogSection from "../../components/frontend/CatalogSection"
import HorizontalScroll from "../../components/frontend/HorizontalScroll"
import FancyHeader from "../../components/shared/FancyHeader"
import Featured from "../../components/frontend/Featured"
const Home = () => {

	return (
		<>
			<Header />
			<div className="w-100 d-flex flex-column gap-2 justify-content-center align-items-center ">
				<CatalogSection />
				<div className="container my-4">
					<HorizontalScroll />
				</div>
				<FancyHeader front="featured" back="sneakers" small="products" />
				<Featured />
				<Trusted />
				<AboutSection />
			</div>
		</>
	)
}

export default Home
