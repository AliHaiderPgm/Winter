import { Route, Routes } from "react-router-dom"
import Product from "./product"
import Orders from "./Orders"
import Users from "./user/Users"
const Pages = () => {
	return (
		<main style={{ minHeight: "80vh" }}>
			<Routes>
				<Route path="/*" element={<Product />} />
				<Route path="orders" element={<Orders />} />
				<Route path="users" element={<Users />} />
			</Routes>
		</main>
	)
}

export default Pages
