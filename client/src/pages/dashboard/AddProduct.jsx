import { useState } from "react"
import Dragger from "../../components/upload"
import { Button, Input, InputNumber, Select } from "antd"
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
	stock: 1,
	colors: [],
	sizes: [],
}
const AddProduct = () => {
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
			images: images,
			rating: 0,
			reviews: [],
		}
		const res = await AddProduct(productData)
		if (res === 200) {
			setState(initialState)
			setImages([])
		}
	}

	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="text-decoration-underline">Add Product</h1>
			<form className="w-50 py-4 d-flex flex-column gap-2">
				<Input
					size="large"
					placeholder="Name"
					className="gap-1"
					prefix={<FontSizeOutlined />}
					name="name"
					value={state.name}
					onChange={handleChange}
				/>
				<div className="d-flex justify-content-between gap-2">
					<Select
						placeholder="Type"
						size="large"
						onChange={(e) => handleSelect("type", e)}
						value={state.type}
						options={types}
						style={{
							width: 400,
						}}
					/>
					<InputNumber
						placeholder="Price"
						size="large"
						onChange={(e) => handleSelect("price", e)}
						value={state.price}
						min={1}
						max={10000}
						className="w-50"
						type="number"
						prefix={<DollarOutlined />}
					/>
				</div>
				<div className="d-flex justify-content-between gap-2">
					<InputNumber
						placeholder="Stock"
						size="large"
						value={state.stock}
						onChange={(e) => handleSelect("stock", e)}
						className="w-100"
						min={1}
						max={100000}
						type="number"
						prefix={<StockOutlined />}
					/>
					<Select
						placeholder="Brand"
						size="large"
						onChange={(e) => handleSelect("brand", e)}
						value={state.brand}
						options={brands}
						style={{
							width: 400,
						}}
					/>
					<Select
						placeholder="Shoe for"
						size="large"
						onChange={(e) => handleSelect("shoefor", e)}
						value={state.shoefor}
						options={shoefor}
						style={{
							width: 400,
						}}
					/>
				</div>
				<TextArea
					placeholder="Description"
					autoSize={{ minRows: 3, maxRows: 6 }}
					name="description"
					onChange={handleChange}
					value={state.description}
				/>
				<div className="d-flex flex-column gap-2">
					<Select
						placeholder="Colors"
						size="large"
						mode="multiple"
						options={colors}
						value={state.colors}
						suffixIcon={<BgColorsOutlined />}
						onChange={(e) => handleSelect("colors", e)}
					/>
					<Select
						placeholder="Sizes"
						mode="multiple"
						value={state.sizes}
						size="large"
						onChange={(e) => handleSelect("sizes", e)}
						options={sizes}
					/>
				</div>

				<Dragger imagesCode={setImages} />

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
			</form>
		</div>
	)
}

export default AddProduct
