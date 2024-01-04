import { createContext, useContext, useState } from "react"
import { message } from "antd"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { ServerURL } from "."

const ProductContext = createContext()
const API_URL = `${ServerURL()}/products`
const config = {
	withCredentials: true,
}
const ProductContextProvider = (props) => {
	const [loading, setLoading] = useState(false)
	const [getProductLoading, setGetProductLoading] = useState(false)
	const [products, setProducts] = useState()
	const { isAuthenticated, user } = useAuth()

	const AddProduct = async (productData) => {
		const res = await axios.post(API_URL, productData, config)
		return res
	}

	const GetProducts = async () => {
		const res = await axios.get(API_URL, config)
		return res.data
	}
	// Get single product details
	const GetDetails = async (id) => {
		const res = await axios.get(`${API_URL}/${id}`, config)
		return res.data
	}

	const UpdateProduct = async (id, productData) => {
		const res = await axios.put(`${API_URL}/${id}`, productData, config)
		return res.data
	}

	const uploadImage = async (image) => {
		const res = await axios.post(`${API_URL}/uploadImage`, image, config)
		return res.data
	}

	const DeleteProduct = async (id) => {
		const res = await axios.delete(`${API_URL}/${id}`, config)
		return res.data
	}

	const RecentAndTopRated = async (query) => {
		const res = await axios.post(`${API_URL}/recentAndTopRated`, query)
		return res.data
	}

	// get products for scroll
	const GetCustomizedProducts = async (field, value, page, filter, limit) => {
		// console.log(filter)
		const res = await axios.post(`${API_URL}/filter`, {
			params: {
				field,
				value,
				page,
				limit,
				prices: filter[0],
				types: filter[1],
				brands: filter[2],
				sizes: filter[3],
				order: filter[4]?.[0],
			}
		})
		return res.data
	}
	const SearchProduct = async (e, page) => {
		// console.log(e)
		const res = await axios.post(`${API_URL}/filter`, {
			params: {
				name: e.name,
				field: "shoefor",
				value: e.shoefor,
				prices: e.prices,
				types: e.types,
				brands: e.brands,
				sizes: e.sizes,
				order: e.sort,
				page,
			}
		})
		return res.data
	}

	const userContext = {
		loading,
		GetDetails,
		RecentAndTopRated,
		GetCustomizedProducts,
		SearchProduct,
	}
	const contextValues = isAuthenticated && user.type === "user" ? userContext : {
		...userContext,
		products,
		getProductLoading,
		GetProducts,
		AddProduct,
		DeleteProduct,
		uploadImage,
		UpdateProduct,
	}
	return (
		<>
			<ProductContext.Provider value={contextValues}>
				{props.children}
			</ProductContext.Provider>
		</>
	)
}

export default ProductContextProvider

export const useProduct = () => {
	return useContext(ProductContext)
}
