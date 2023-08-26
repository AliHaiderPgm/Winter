import { useState } from "react"
import Dragger from "../../components/upload"
import { Button, Form, Input, InputNumber, Select } from "antd"
import {
	FontSizeOutlined,
	DollarOutlined,
	StockOutlined,
	BgColorsOutlined,
} from "@ant-design/icons"
import { useProduct } from "../../context/ProductContext"

const { TextArea } = Input

const initialState = {
	name: "",
	type: "",
	brand: "",
	shoefor: "",
	price: null,
	description: "",
	stock: null,
	colors: [],
	sizes: [],
}
const AddProduct = () => {
	const [form] = Form.useForm()
	const [state, setState] = useState(initialState)
	const [images, setImages] = useState([])
	const { AddProduct, loading } = useProduct()
	const brands = [
		{
			value: "",
			label: "Brand",
			disabled: true,
		},
		{
			value: "Nike",
			label: "Nike",
		},
		{
			value: "Adidas",
			label: "Adidas",
		},
		{
			value: "Amiri",
			label: "Amiri",
		},
		{
			value: "Puma",
			label: "Puma",
		},
		{
			value: "Reebok",
			label: "Reebok",
		},
		{
			value: "Fila",
			label: "Fila",
		},
		{
			value: "Hush Puppies",
			label: "Hush Puppies",
		},
		{
			value: "Bata",
			label: "Bata",
		},
	]
	const types = [
		{
			value: "",
			label: "Type",
			disabled: true,
		},
		{
			value: "Sneakers",
			label: "Sneakers",
		},
		{
			value: "Sportswear",
			label: "Sportswear",
		},
		{
			value: "Running",
			label: "Running",
		},
		{
			value: "Golf",
			label: "Golf",
		},
		{
			value: "Workout & Gym",
			label: "Workout & Gym",
		},
		{
			value: "Football",
			label: "Football",
		},
		{
			value: "Basketball",
			label: "Basketball",
		},
		{
			value: "LifeStyle",
			label: "LifeStyle",
		},
	]
	const shoefor = [
		{
			value: "",
			label: "For",
			disabled: true,
		},
		{
			value: "Male",
			label: "Male",
		},
		{
			value: "Female",
			label: "Female",
		},
		{
			value: "Children",
			label: "Children",
		},
	]
	const colors = [
		{
			value: "White",
			label: "White",
		},
		{
			value: "Red",
			label: "Red",
		},
		{
			value: "Black",
			label: "Black",
		},
		{
			value: "Blue",
			label: "Blue",
		},
		{
			value: "Green",
			label: "Green",
		},
	]
	const sizes = [
		{
			value: "6",
			label: "6",
		},
		{
			value: "6.5",
			label: "6.5",
		},
		{
			value: "7",
			label: "7",
		},
		{
			value: "7.5",
			label: "7.5",
		},
		{
			value: "8",
			label: "8",
		},
		{
			value: "8.5",
			label: "8.5",
		},
		{
			value: "9",
			label: "9",
		},
		{
			value: "9.5",
			label: "9.5",
		},
		{
			value: "10",
			label: "10",
		},
		{
			value: "10.5",
			label: "10.5",
		},
		{
			value: "11",
			label: "11",
		},
		{
			value: "11.5",
			label: "11.5",
		},
		{
			value: "12",
			label: "12",
		},
		{
			value: "12.5",
			label: "12.5",
		},
		{
			value: "13",
			label: "13",
		},
		{
			value: "14",
			label: "14",
		},
		{
			value: "15",
			label: "15",
		},
		{
			value: "16",
			label: "16",
		},
		{
			value: "17",
			label: "17",
		},
		{
			value: "18",
			label: "18",
		},
	]
	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = async () => {
		const getBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result)
				reader.onerror = (error) => reject(error)
			})
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
			colors: state.colors,
			sizes: state.sizes,
			stock: state.stock,
			images: code,
			rating: 0,
			reviews: [],
		}
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
								options={types}
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
								options={brands}
								className="w-100"
								title="Brand of shoe"
							/>
						</Form.Item>

						<Form.Item name="shoefor" noStyle>
							<Select
								placeholder="Shoe for"
								size="large"
								onChange={(e) => handleSelect("shoefor", e)}
								options={shoefor}
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
					<div className="d-flex flex-column gap-2">
						<Form.Item name="colors" noStyle>
							<Select
								placeholder="Colors"
								size="large"
								mode="multiple"
								options={colors}
								suffixIcon={<BgColorsOutlined />}
								onChange={(e) => handleSelect("colors", e)}
								title="Available colors for shoe"
							/>
						</Form.Item>

						<Form.Item name="sizes" noStyle>
							<Select
								placeholder="Sizes"
								mode="multiple"
								size="large"
								onChange={(e) => handleSelect("sizes", e)}
								options={sizes}
								title="Available sizes for shoe"
							/>
						</Form.Item>
					</div>

					<Dragger images={images} imagesCode={setImages} />

					<Button
						type="primary"
						size="large"
						className="w-100"
						style={{ backgroundColor: "#001529" }}
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
