import { Route, Routes } from "react-router-dom"
import Product from "./product"
import Orders from "./Orders"
const Pages = () => {
	return (
		<main style={{ minHeight: "80vh" }}>
			<Routes>
				<Route path="/*" element={<Product />} />
				<Route path="orders" element={<Orders />} />
			</Routes>
		</main>
	)
}

export default Pages
