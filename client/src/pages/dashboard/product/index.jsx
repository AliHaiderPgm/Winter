import { Route, Routes } from "react-router-dom"
import UpdateProduct from "./UpdateProduct"
import AllProducts from "./AllProducts"
import AddProduct from "./AddProduct"

const index = () => {
	return (
		<Routes>
			<Route path="/products" element={<AllProducts />} />
			<Route path="/update/:id" element={<UpdateProduct />} />
			<Route path="/addProduct" element={<AddProduct />} />
		</Routes>
	)
}

export default index
