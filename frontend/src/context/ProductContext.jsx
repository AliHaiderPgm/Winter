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
		try {
			setLoading(true)
			const res = await axios.post(API_URL, productData, config)
			if (res.status === 200) {
				message.success("Product added successfully!")
				return res.status
			}
		} catch (error) {
			// console.log(error)
			if (error.response) {
				// Request was made and the server responded with an error status
				const { data, status } = error.response
				if (data && data.errors) {
					data.errors.map((err) => {
						message.error(err)
					})
				} else {
					message.error(`Server responded with status ${status}!`)
				}
			} else if (error.request) {
				// The request was made but no response from server
				message.error("No response from server!")
			} else {
				message.error("An error occurred while sending the request!")
			}
		} finally {
			setLoading(false)
		}
	}

	const GetProducts = async () => {
		try {
			setGetProductLoading(true)
			const res = await axios.get(API_URL, config)
			setProducts(res.data)
		} catch (error) {
			message.error("Oops! Something went wrong.")
		} finally {
			setGetProductLoading(false)
		}
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
