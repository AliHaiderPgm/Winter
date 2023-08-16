import Header from "../../components/Header"
import Trusted from "../../components/frontend/Trusted"
import Services from "../../components/frontend/Services"
import AboutSection from "../../components/frontend/AboutSection"
import Catalog from "../../components/frontend/Catalog"

const Home = () => {
	return (
		<>
			<Header title="E-Store" />
			<div className="wrapper">
				<Catalog />
				<Trusted />
				<AboutSection />
				<Services />
			</div>
		</>
	)
}

export default Home
