import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import About from "./About"
import Contact from "./Contact"

const index = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<>Page Not Found</>} />
			</Routes>
			<Footer />
		</>
	)
}

export default index
