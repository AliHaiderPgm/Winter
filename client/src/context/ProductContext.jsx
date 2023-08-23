import { createContext, useContext, useState } from "react"
import { message } from "antd"
import axios from "axios"

const ProductContext = createContext()
const API_URL = "http://localhost:5000/api/products"

const ProductContextProvider = (props) => {
	const [messageApi, contextHolder] = message.useMessage()
	const [loading, setLoading] = useState(false)
	// const [products, setProducts] = useState()
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
	return (
		<>
			{contextHolder}
			<ProductContext.Provider value={{ loading, AddProduct }}>
				{props.children}
			</ProductContext.Provider>
		</>
	)
}

export default ProductContextProvider

export const useProduct = () => {
	return useContext(ProductContext)
}
