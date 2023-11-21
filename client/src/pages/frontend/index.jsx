import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import About from "./About"
import Contact from "./Contact"
import Search from "./Search"
import Catalog from "./Catalog"
import Details from "./product/Details"

const index = () => {
	return (
		<>
			<Navbar />
			<div className="d-flex justify-content-center">
				<div style={{ maxWidth: 1920, width: "100%" }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/result/:search_query?" element={<Search />} />
						<Route path="/:type" element={<Catalog />} />
						<Route path="/:type/:id" element={<Details />} />
						<Route path="*" element={<>Page Not Found</>} />
					</Routes>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default index
