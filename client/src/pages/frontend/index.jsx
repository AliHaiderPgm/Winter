import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import About from "./About"
import Contact from "./Contact"
import SearchPage from "./SearchPage"
import SearchResult from "./SearchResults"
import Catalog from "./Catalog"
import Details from "./product/Details"
import Cart from "./Cart"
import CheckoutSuccess from "./CheckoutSuccess"

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
						<Route path="/find" element={<SearchPage />} />
						<Route path="/find/:search_query?" element={<SearchResult />} />
						<Route path="/:type" element={<Catalog />} />
						<Route path="/:type/:id" element={<Details />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/success/:id" element={<CheckoutSuccess />} />
						<Route path="*" element={<>Page Not Found</>} />
					</Routes>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default index
