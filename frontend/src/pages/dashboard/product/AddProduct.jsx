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
import { toast } from "../../../utils/toast"
import { Link } from "react-router-dom"
import PageShell from "../../../components/dashboard/PageShell"
import Panel from "../../../components/dashboard/Panel"

const { TextArea } = Input

const AddProduct = () => {
	const [form] = Form.useForm()
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(false)
	const { AddProduct } = useProduct()

	const handleSubmit = async (e) => {
		try {
			setLoading(true)
			const code = await Promise.all(
				images.map(async (img) => {
					const imgCode = await getBase64(img)
					return imgCode
				})
			)
			const productData = {
				...e,
				images: code,
				rating: 0,
				reviews: [],
			}
			const res = await AddProduct(productData)
			if (res.status === 200) {
				setImages([])
				form.resetFields()
				toast.success("Product added successfully!")
			}
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong!")
		} finally {
			setLoading(false)
		}
	}

	return (
		<PageShell
			eyebrow="Catalog"
			title="Add product"
			subtitle="Create a listing: the name buyers see, its price and stock, the sizes it comes in and its photos."
			breadcrumb={[{ title: <Link to="/dashboard/products">Products</Link> }, { title: "Add product" }]}
		>
			<Panel title="Product details" note="Every field is required.">
					<Form
						form={form}
						onFinish={handleSubmit}
						className="dashboard__form d-flex flex-column gap-2"
					>
						<Form.Item
							name="name"
							rules={[
								{
									required: true,
									message: 'Product Name is required.',
								},
							]}>
							<Input
								size="large"
								name="name"
								placeholder="Name"
								className="gap-1"
								prefix={<FontSizeOutlined />}
								title="Name of product"
							/>
						</Form.Item>

						<div className="d-flex gap-2 flex-column flex-md-row">
							<Form.Item
								name="type"
								className="w-100"
								rules={[
									{
										required: true,
										message: 'Please select product type.',
									},
								]}>
								<Select
									placeholder="Type"
									size="large"
									options={data.types}
									className="w-100"
									title="Shoe type"
								/>
							</Form.Item>

							<Form.Item
								name="price"
								className="w-100"
								rules={[
									{
										required: true,
										message: 'Please enter product price.',
									},
								]}>
								<InputNumber
									placeholder="Price"
									size="large"
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
							<Form.Item
								name="stock"
								className="w-100"
								rules={[
									{
										required: true,
										message: 'Please enter product stock.',
									},
								]}>
								<InputNumber
									placeholder="Stock"
									size="large"
									min={1}
									max={100000}
									type="number"
									prefix={<StockOutlined />}
									className="w-100"
									title="Stock of shoes"
								/>
							</Form.Item>

							<Form.Item
								name="brand"
								className="w-100"
								rules={[
									{
										required: true,
										message: 'Please select product brand.',
									},
								]}>
								<Select
									placeholder="Brand"
									size="large"
									options={data.brands}
									className="w-100"
									title="Brand of shoe"
								/>
							</Form.Item>

							<Form.Item
								name="shoefor"
								className="w-100"
								rules={[
									{
										required: true,
										message: 'Please select product type.',
									},
								]}>
								<Select
									placeholder="Shoe for"
									size="large"
									options={data.shoefor}
									className="w-100"
									title="Shoe is for"
								/>
							</Form.Item>
						</div>
						<Form.Item
							name="description"
							rules={[
								{
									required: true,
									message: 'Some description is required.',
								},
							]}>
							<TextArea
								placeholder="Description"
								name="description"
								autoSize={{ minRows: 3, maxRows: 6 }}
								title="Describe shoe features"
							/>
						</Form.Item>
						<Form.Item
							name="sizes"
							rules={[
								{
									required: true,
									message: 'Shoe size are required.',
								},
							]}>
							<Select
								placeholder="Sizes"
								mode="multiple"
								size="large"
								options={data.sizes}
								title="Available sizes for shoe"
							/>
						</Form.Item>
						<Form.Item rules={[
							{
								required: true,
								message: 'At least one image is required.',
							},
						]}>
							<Dragger images={images} imagesCode={setImages} />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								className="w-100 p-3 h-auto fs-5 btn-filled"
								loading={loading}
								htmlType="submit"
							>
								Add product
							</Button>
						</Form.Item>
					</Form>
			</Panel>
		</PageShell>
	)
}

export default AddProduct
