import { useState } from "react"
import Dragger from "../../components/upload"
import { Button, Input, InputNumber, Select } from "antd"
import {
	FontSizeOutlined,
	DollarOutlined,
	StockOutlined,
	BgColorsOutlined,
} from "@ant-design/icons"
import Chip from "../../components/dashboard/chip"

const { TextArea } = Input

const initialState = {
	name: "",
	type: "",
	price: null,
	description: "",
	stock: 0,
}
const AddProduct = () => {
	const [state, setState] = useState(initialState)
	const [selectedColors, setSelectedColors] = useState([])
	const [selectedSizes, setSelectedSizes] = useState([])
	const types = [
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
			value: "Small",
			label: "Small",
		},
		{
			value: "Medium",
			label: "Medium",
		},
		{
			value: "Large",
			label: "Large",
		},
		{
			value: "Extra Large",
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

	const handleColor = (e) => {
		setSelectedColors([...selectedColors, e])
	}
	const availableColors = colors.filter(
		(color) => !selectedColors.includes(color.value)
	)
	const handleDeleteColor = (value) => {
		const updatedColors = selectedColors.filter((color) => color !== value)
		setSelectedColors(updatedColors)
	}

	const handleSize = (e) => {
		setSelectedSizes([...selectedSizes, e])
	}
	const availableSizes = sizes.filter(
		(size) => !selectedSizes.includes(size.value)
	)
	const handleDeleteSize = (value) => {
		const updatedSize = selectedSizes.filter((size) => size !== value)
		setSelectedSizes(updatedSize)
	}

	const handleSubmit = () => {
		console.log("colors=>", selectedColors)
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
					{/*/////////////////////////////////// Colors ship */}
					<div className="d-flex gap-2">
						{selectedColors.map((val, e) => {
							return <Chip value={val} onDelete={handleDeleteColor} key={e} />
						})}
					</div>
					<Select
						placeholder="Color"
						size="large"
						options={availableColors}
						suffixIcon={<BgColorsOutlined />}
						onChange={handleColor}
					/>
					{/*/////////////////////////////////// Size ship */}
					<div className="d-flex gap-2">
						{selectedSizes.map((val, e) => {
							return <Chip value={val} onDelete={handleDeleteSize} key={e} />
						})}
					</div>
					<Select
						placeholder="Size"
						size="large"
						onChange={handleSize}
						options={availableSizes}
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
