import { useState } from "react"
import Dragger from "../../../components/upload"
import { Button, Form, Input, InputNumber, Select } from "antd"
import {
	FontSizeOutlined,
	DollarOutlined,
	StockOutlined,
} from "@ant-design/icons"
import { useProduct } from "../../../context/ProductContext"
import data from "../../../global/data"
import { getBase64 } from "../../../global"

const { TextArea } = Input

const initialState = {
	name: "",
	type: "",
	brand: "",
	shoefor: "",
	price: null,
	description: "",
	stock: null,
	sizes: [],
}
const AddProduct = () => {
	const [form] = Form.useForm()
	const [state, setState] = useState(initialState)
	const [images, setImages] = useState([])
	const { AddProduct, loading } = useProduct()

	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = async () => {
		const code = await Promise.all(
			images.map(async (img) => {
				const imgCode = await getBase64(img)
				return imgCode
			})
		)
		const productData = {
			name: state.name,
			type: state.type,
			brand: state.brand,
			shoefor: state.shoefor,
			description: state.description,
			price: state.price,
			sizes: state.sizes,
			stock: state.stock,
			images: code,
			rating: 0,
			reviews: [],
		}
		// console.log(productData)
		const res = await AddProduct(productData)
		if (res === 200) {
			setState(initialState)
			setImages([])
			form.resetFields()
		}
	}

	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="text-decoration-underline">Add Product</h1>
			<div className="w-100 py-4 px-0 px-md-5">
				<Form
					form={form}
					initialValues={initialState}
					className="d-flex flex-column gap-2"
				>
					<Form.Item name="name" noStyle>
						<Input
							size="large"
							name="name"
							placeholder="Name"
							className="gap-1"
							prefix={<FontSizeOutlined />}
							onChange={handleChange}
							title="Name of product"
						/>
					</Form.Item>

					<div className="d-flex gap-2 flex-column flex-md-row">
						<Form.Item name="type" noStyle>
							<Select
								placeholder="Type"
								size="large"
								onChange={(e) => handleSelect("type", e)}
								options={data.types}
								className="w-100"
								title="Shoe type"
							/>
						</Form.Item>

						<Form.Item name="price" noStyle>
							<InputNumber
								placeholder="Price"
								size="large"
								onChange={(e) => handleSelect("price", e)}
								min={1}
								max={10000}
								className="w-100"
								type="number"
								prefix={<DollarOutlined />}
								title="Price of shoe"
							/>
						</Form.Item>
					</div>
					<div className="d-flex gap-2 flex-column flex-md-row">
						<Form.Item name="stock" noStyle>
							<InputNumber
								placeholder="Stock"
								size="large"
								onChange={(e) => handleSelect("stock", e)}
								min={1}
								max={100000}
								type="number"
								prefix={<StockOutlined />}
								className="w-100"
								title="Stock of shoes"
							/>
						</Form.Item>

						<Form.Item name="brand" noStyle>
							<Select
								placeholder="Brand"
								size="large"
								onChange={(e) => handleSelect("brand", e)}
								options={data.brands}
								className="w-100"
								title="Brand of shoe"
							/>
						</Form.Item>

						<Form.Item name="shoefor" noStyle>
							<Select
								placeholder="Shoe for"
								size="large"
								onChange={(e) => handleSelect("shoefor", e)}
								options={data.shoefor}
								className="w-100"
								title="Shoe is for"
							/>
						</Form.Item>
					</div>
					<Form.Item name="description" noStyle>
						<TextArea
							placeholder="Description"
							name="description"
							autoSize={{ minRows: 3, maxRows: 6 }}
							onChange={handleChange}
							title="Describe shoe features"
						/>
					</Form.Item>
					<Form.Item name="sizes" noStyle>
						<Select
							placeholder="Sizes"
							mode="multiple"
							size="large"
							onChange={(e) => handleSelect("sizes", e)}
							options={data.sizes}
							title="Available sizes for shoe"
						/>
					</Form.Item>
					<Dragger images={images} imagesCode={setImages} />
					{/* <ImageUploader images={images} imagesCode={setImages} /> */}

					<Button
						type="primary"
						className="w-100 p-3 h-auto fs-5 btn-filled"
						onClick={handleSubmit}
						loading={loading}
					>
						Add Product
					</Button>
				</Form>
			</div>
		</div>
	)
}

export default AddProduct
