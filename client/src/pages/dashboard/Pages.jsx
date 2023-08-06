import React from "react"
import { Route, Routes } from "react-router-dom"
import AllProducts from "./AllProducts"
import AddProduct from "./AddProduct"
import Orders from "./Orders"
const Pages = () => {
	return (
		<main style={{ minHeight: "80vh" }}>
			<Routes>
				<Route path="/" element={<AllProducts />} />
				<Route path="addProduct" element={<AddProduct />} />
				<Route path="orders" element={<Orders />} />
			</Routes>
		</main>
	)
}

export default Pages
