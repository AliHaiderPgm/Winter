import { useState } from "react"
import Dragger from "../../components/upload"
import { Button, Input, InputNumber, Select } from "antd"
import {
	FontSizeOutlined,
	DollarOutlined,
	StockOutlined,
	BgColorsOutlined,
} from "@ant-design/icons"

const { TextArea } = Input

const initialState = {
	name: "",
	type: "",
	price: null,
	description: "",
	color: "",
	size: "",
	stock: 0,
}
const AddProduct = () => {
	const [state, setState] = useState(initialState)
	const types = [
		{
			value: "cloth",
			label: "Cloth",
		},
		{
			value: "shoe",
			label: "Shoe",
		},
		{
			value: "accessories",
			label: "Accessories",
		},
		{
			value: "watch",
			label: "Watch",
		},
	]
	const colors = [
		{
			value: "red",
			label: "Red",
		},
		{
			value: "black",
			label: "Black",
		},
		{
			value: "blue",
			label: "Blue",
		},
	]
	const sizes = [
		{
			value: "sm",
			label: "Small",
		},
		{
			value: "md",
			label: "Medium",
		},
		{
			value: "l",
			label: "Large",
		},
		{
			value: "xl",
			label: "Extra Large",
		},
	]
	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = () => {
		console.log("state=>", state)
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
						// value={state.type}
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
				<TextArea
					placeholder="Description"
					autoSize={{ minRows: 3, maxRows: 6 }}
					name="description"
					onChange={handleChange}
					value={state.description}
				/>
				<div className="d-flex flex-column gap-2">
					<Select
						placeholder="Color"
						size="large"
						options={colors}
						suffixIcon={<BgColorsOutlined />}
						onChange={(e) => handleSelect("color", e)}
						// value={state.color}
					/>
					<Select
						placeholder="Size"
						size="large"
						onChange={(e) => handleSelect("size", e)}
						options={sizes}
						// value={state.size}
					/>
				</div>

				<Dragger />

				<InputNumber
					placeholder="Stock"
					size="large"
					onChange={(e) => handleSelect("stock", e)}
					className="w-100"
					min={1}
					max={100000}
					type="number"
					prefix={<StockOutlined />}
				/>
				<Button
					type="primary"
					size="large"
					className="w-100"
					style={{ backgroundColor: "#001529" }}
					onClick={handleSubmit}
				>
					Add Product
				</Button>
			</form>
		</div>
	)
}

export default AddProduct
