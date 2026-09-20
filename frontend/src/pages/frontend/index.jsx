/* eslint-disable react-refresh/only-export-components -- the lazy() route
   components below are not something Fast Refresh can preserve anyway; they are
   split points, and this file has no other exports. */
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import PreLoader from "../../components/PreLoader"
import PrivateRoute from "../../router/privateRoute"
import { useAuth } from "../../context/AuthContext"

// Only the landing page has to be there for the first paint. Every other screen
// is a click away, so its code is fetched when it is opened instead of being
// shipped, parsed and compiled alongside the homepage.
const About = lazy(() => import("./About"))
const Help = lazy(() => import("./Help"))
const Contact = lazy(() => import("./Contact"))
const SearchPage = lazy(() => import("./SearchPage"))
const SearchResult = lazy(() => import("./SearchResults"))
const Men = lazy(() => import("./Men"))
const Women = lazy(() => import("./Women"))
const Kids = lazy(() => import("./Kids"))
const Details = lazy(() => import("./product/Details"))
const Cart = lazy(() => import("./Cart"))
const CheckoutSuccess = lazy(() => import("./CheckoutSuccess"))
const Checkout = lazy(() => import("./Checkout"))
const Favorite = lazy(() => import("./Favorite"))
const Orders = lazy(() => import("./Orders"))
const Profile = lazy(() => import("./Profile"))

const index = () => {
	const { isAuthenticated } = useAuth()

	return (
		<div className="frontend-layout">
			<Navbar />
			<main className="frontend-content d-flex justify-content-center">
				<div style={{ maxWidth: 1920, width: "100%" }}>
					<Suspense fallback={<PreLoader />}>
						<Routes>
							<Route path="/" index element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/help" element={<Help />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/men" element={<Men />} />
							<Route path="/women" element={<Women />} />
							<Route path="/kids" element={<Kids />} />
							<Route path="/:type/:id" element={<Details />} />
							<Route path="/find" element={<SearchPage />} />
							<Route path="/find/:search_query?" element={<SearchResult />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/favorite" element={<Favorite />} />
							<Route path="/profile" element={<PrivateRoute Component={Profile} valid={isAuthenticated} />} />
							<Route path="/checkout" element={<PrivateRoute Component={Checkout} valid={isAuthenticated} />} />
							<Route path="/checkout/:id" element={<PrivateRoute Component={CheckoutSuccess} />} />
							<Route path="/orders" element={<PrivateRoute Component={Orders} />} />
							<Route path="*" element={<>Page Not Found</>} />
						</Routes>
					</Suspense>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default index
