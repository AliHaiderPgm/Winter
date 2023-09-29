import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import About from "./About"
import Contact from "./Contact"
import Search from "./Search"
import Catalog from "./Catalog"

const index = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/search" element={<Search />} />
				<Route path="/catalog/:type" element={<Catalog />} />
				<Route path="*" element={<>Page Not Found</>} />
			</Routes>
			<Footer />
		</>
	)
}

export default index
