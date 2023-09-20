import { createContext, useContext, useState } from "react"
import { message } from "antd"
import axios from "axios"

const ProductContext = createContext()
const API_URL = "http://localhost:5000/api/products"
const config = {
	withCredentials: true,
}
const ProductContextProvider = (props) => {
	const [messageApi, contextHolder] = message.useMessage()
	const [loading, setLoading] = useState(false)
	const [getProductLoading, setGetProductLoading] = useState(false)
	const [detailsLoading, setDetailLoading] = useState(false)
	const [products, setProducts] = useState()
	// Add Product
	const AddProduct = async (productData) => {
		try {
			setLoading(true)
			const res = await axios.post(API_URL, productData, config)
			if (res.status === 200) {
				messageApi.success("Product added successfully!")
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
	// Get Products
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
		try {
			setDetailLoading(true)
			const res = await axios.get(`${API_URL}/${id}`, config)
			return res.data
		} catch (error) {
			message.error("Oops! Something went wrong.")
		} finally {
			setDetailLoading(false)
		}
	}
	// Update Product
	const UpdateProduct = async (id, productData) => {
		const res = await axios.put(`${API_URL}/${id}`, productData, config)
		return res.data
	}
	// Upload Image
	const uploadImage = async (image) => {
		const res = await axios.post(`${API_URL}/uploadImage`, image, config)
		return res.data
	}
	// Delete product
	const DeleteProduct = async (id) => {
		const res = await axios.delete(`${API_URL}/${id}`, config)
		return res.data
	}
	return (
		<>
			{contextHolder}
			<ProductContext.Provider
				value={{
					loading,
					getProductLoading,
					detailsLoading,
					AddProduct,
					GetProducts,
					GetDetails,
					UpdateProduct,
					uploadImage,
					DeleteProduct,
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