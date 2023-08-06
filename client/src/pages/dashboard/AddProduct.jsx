import { Button, Input, Select, Upload } from "antd"
import {
	FontSizeOutlined,
	DollarOutlined,
	InboxOutlined,
	StockOutlined,
	BgColorsOutlined,
} from "@ant-design/icons"
import { useState } from "react"

const { TextArea } = Input
const { Dragger } = Upload

const AddProduct = () => {
	const [files, selectedFiles] = useState()
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
	const handleChange = (value) => {}
	const handleColor = (value) => {}

	const props = {
		name: "file",
		multiple: true,
		// action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', //axios url
		// onChange(info) {
		// 	const { status } = info.file
		// 	if (status !== "uploading") {
		// 		console.log(info.file, info.fileList)
		// 	}
		// 	if (status === "done") {
		// 		message.success(`${info.file.name} file uploaded successfully.`)
		// 	} else if (status === "error") {
		// 		message.error(`${info.file.name} file upload failed.`)
		// 	}
		// },
		beforeUpload: (file) => {
			selectedFiles(file)
			return false // Prevent automatic upload when selecting the file
		},
		onDrop(e) {
			selectedFiles(e.dataTransfer.files)
			console.log("Dropped files", e.dataTransfer.files)
		},
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
				/>
				<div className="d-flex justify-content-between gap-2">
					<Select
						placeholder="Type"
						size="large"
						onChange={handleChange}
						options={types}
						style={{
							width: 400,
						}}
					/>
					<Input
						placeholder="Price"
						size="large"
						className="gap-1"
						type="number"
						prefix={<DollarOutlined />}
					/>
				</div>
				<TextArea
					placeholder="Description"
					autoSize={{ minRows: 3, maxRows: 6 }}
				/>
				<div className="d-flex flex-column gap-2">
					<Select
						placeholder="Color"
						size="large"
						onChange={handleColor}
						options={colors}
						suffixIcon={<BgColorsOutlined />}
					/>
					<Select
						placeholder="Size"
						size="large"
						onChange={handleColor}
						options={sizes}
					/>
				</div>
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibited from
						uploading company data or other banned files.
					</p>
				</Dragger>
				<Input
					placeholder="Stock"
					size="large"
					className="gap-1"
					type="number"
					prefix={<StockOutlined />}
				/>
				<Button
					type="primary"
					size="large"
					className="w-100"
					style={{ backgroundColor: "#001529" }}
				>
					Add Product
				</Button>
			</form>
		</div>
	)
}

export default AddProduct
