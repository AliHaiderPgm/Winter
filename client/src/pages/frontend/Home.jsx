import Header from "../../components/shared/Header"
import Trusted from "../../components/frontend/Trusted"
import Services from "../../components/frontend/Services"
import AboutSection from "../../components/frontend/AboutSection"
import CatalogSection from "../../components/frontend/CatalogSection"
import HorizontalScroll from "../../components/frontend/HorizontalScroll"
import FancyHeader from "../../components/shared/FancyHeader"
import Featured from "../../components/frontend/Featured"
const Home = () => {

	return (
		<>
			<Header />
			<div className="wrapper">
				<CatalogSection />
				<div className="container my-4">
					<HorizontalScroll />
				</div>
				<FancyHeader front="featured" back="sneakers" small="products" />
				<Featured />
				<Trusted />
				<AboutSection />
				{/* <Services /> */}
			</div>
		</>
	)
}

export default Home
