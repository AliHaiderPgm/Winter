import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import About from "./About"
import SearchPage from "./SearchPage"
import SearchResult from "./SearchResults"
import Catalog from "./Catalog"
import Details from "./product/Details"
import Cart from "./Cart"
import CheckoutSuccess from "./CheckoutSuccess"
import Checkout from "./Checkout"
import Favorite from "./Favorite"
import Orders from "./Orders"
import PrivateRoute from "../../router/privateRoute"
import { useAuth } from "../../context/AuthContext"
import { message } from "antd"

const index = () => {
	const { isAuthenticated } = useAuth()
	const [messageApi, contextHolder] = message.useMessage()

	return (
		<>
			{contextHolder}
			<Navbar />
			<div className="d-flex justify-content-center">
				<div style={{ maxWidth: 1920, width: "100%" }}>
					<Routes>
						<Route path="/" index element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/:type" element={<Catalog />} />
						<Route path="/:type/:id" element={<Details />} />
						<Route path="/find" element={<SearchPage />} />
						<Route path="/find/:search_query?" element={<SearchResult />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/favorite" element={<Favorite />} />
						<Route path="/checkout" element={<PrivateRoute Component={Checkout} valid={isAuthenticated} />} />
						<Route path="/checkout/:id" element={<PrivateRoute Component={CheckoutSuccess} />} />
						<Route path="/orders" element={<PrivateRoute Component={Orders} />} />
						<Route path="*" element={<>Page Not Found</>} />
					</Routes>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default index
