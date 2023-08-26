import { createContext, useContext, useState } from "react"
import { message } from "antd"
import axios from "axios"

const ProductContext = createContext()
const API_URL = "http://localhost:5000/api/products"

const ProductContextProvider = (props) => {
	const [messageApi] = message.useMessage()
	const [loading, setLoading] = useState(false)
	const [getProductLoading, setGetProductLoading] = useState(false)
	const [products, setProducts] = useState()
	// Add Product
	const AddProduct = async (productData) => {
		try {
			setLoading(true)
			const res = await axios.post(API_URL, productData)
			if (res.status === 200) {
				messageApi.success("Product added successfully!")
				return res.status
			}
		} catch (error) {
			if (error.response) {
				// Request was made and the server responded with an error status
				const { data, status } = error.response
				if (data && data.errors) {
					data.errors.map((err) => {
						message.error(err)
					})
				} else {
					message.error(`Server responded with status ${status}`)
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
	// Get Products
	const GetProducts = async () => {
		try {
			setGetProductLoading(true)
			const res = await axios.get(API_URL)
			setProducts(res.data)
		} catch (error) {
			if (error.request) {
				message.error(error.request)
			} else {
				message.error("Oops! Something went wrong.")
			}
		} finally {
			setGetProductLoading(false)
		}
	}
	return (
		<>
			<ProductContext.Provider
				value={{
					loading,
					getProductLoading,
					AddProduct,
					GetProducts,
					setProducts,
					products,
				}}
			>
				{props.children}
			</ProductContext.Provider>
		</>
	)
}

export default ProductContextProvider

export const useProduct = () => {
	return useContext(ProductContext)
}
