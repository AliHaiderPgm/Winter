import { Breadcrumb, Button, Form, Input, InputNumber, Popconfirm, Select, notification } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { getBase64, getRandomId } from "../../../global"
import { useProduct } from "../../../context/ProductContext"
import data from "../../../global/data"
import TextArea from "antd/es/input/TextArea"
import { DollarOutlined, FontSizeOutlined, StockOutlined } from "@ant-design/icons"
import ImageUploader from "../../../components/dashboard/ImageUploader"

const UpdateProduct = () => {
	const params = useParams()
	const {
		GetDetails,
		UpdateProduct,
		uploadImage,
		DeleteProduct,
	} = useProduct()
	const [loading, setLoading] = useState(false)
	const [updateLoading, setUpdateLoading] = useState(false)
	const [deleteLoading, setDeleteLoading] = useState(false)
	const log = useRef(true)
	const formRef = useRef()
	const [state, setState] = useState({})
	const [newImages, setNewImages] = useState([])
	const navigate = useNavigate()
	const [api, contextHolder] = notification.useNotification({
		placement: "top"
	});
	const [form] = Form.useForm()
	// call get current product data function
	const getData = async () => {
		try {
			setLoading(true)
			const data = await GetDetails(params.id)
			setState({ ...data })
		} catch (error) {
			api.error({ message: "Something went wrong!" })
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (log.current) {
			getData()
			log.current = false
		}
	}, [])

	// setting old images in state so, they can be previewed
	const setOldImages = async () => {
		try {
			const imagesArray = state?.images
			await imagesArray?.map((imageUrl) => {
				const file = {
					uid: getRandomId(),
					name: getRandomId(),
					status: "done",
					url: imageUrl,
					newFile: false,
				}
				setNewImages((prevImage) => [...prevImage, file])
			})
		} catch (error) {
			api.error({ message: "Failed to set images!" })
		}
	}
	useEffect(() => {
		setOldImages()
	}, [state.images])

	// handle product update
	const handleUpdate = async (e) => {
		setUpdateLoading(true)
		try {
			const imagesBase64 = await Promise.all(
				newImages.map(async (img) => {
					if (img.newFile) {
						const imgCode = await getBase64(img.file)
						return { code: imgCode }
					}
					return img
				})
			)
			const newImagesUrl = []
			for (const image of imagesBase64) {
				if (image.code) {
					const url = await uploadImage({ base64: image.code })
					newImagesUrl.push(url.url)
				} else {
					newImagesUrl.push(image.url)
				}
			}
			const productData = {
				...e,
				images: newImagesUrl,
			}
			await UpdateProduct(params.id, productData)
			api.success({ message: "Product Updated!" })
		} catch (error) {
			console.log(error)
			api.error({ message: "Something went wrong!" })
		} finally {
			setUpdateLoading(false)
		}
	}

	// handle delete product
	const handleDelete = async () => {
		try {
			setDeleteLoading(true)
			await DeleteProduct(params.id)
			api.success({ message: "Product Deleted!" })
			navigate("/dashboard/products")
		} catch (error) {
			api.error({ message: "Something went wrong!" })
		} finally {
			setDeleteLoading(false)
		}
	}

	if (loading) {
		return <h1>Loading...</h1>
	}
	const breadCrumbItems = [
		{
			title: (
				<Link to="/dashboard/products" className="text-decoration-none">
					Products
				</Link>
			),
		},
		{
			title: state.name,
		},
	]
	return (
		<>
			{contextHolder}
			<div className="container">
				<div className="container-fluid">
					<Breadcrumb items={breadCrumbItems} />
					<div>
						<h1 className="text-center mb-3">Update Product</h1>
						<Form
							form={form}
							className="d-flex flex-column gap-2"
							ref={formRef}
							onFinish={handleUpdate}
							initialValues={state}
						>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: 'Product Name is required.',
									},
								]}
							>
								<Input
									placeholder="Name"
									size="large"
									name="name"
									className="gap-1 w-100"
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
									]}
								>
									<Select
										className="w-100"
										placeholder="Type"
										size="large"
										options={data.types}
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
									]}
								>
									<InputNumber
										placeholder="Price"
										className="w-100"
										size="large"
										min={1}
										max={10000}
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
									]}
								>
									<InputNumber
										placeholder="Stock"
										size="large"
										min={1}
										max={100000}
										type="number"
										className="w-100"
										prefix={<StockOutlined />}
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
									]}
								>
									<Select
										placeholder="Brand"
										size="large"
										options={data.brands}
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
									]}
								>
									<Select
										placeholder="Shoe for"
										size="large"
										options={data.shoefor}
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
								]}
							>
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
							<ImageUploader newImages={newImages} setNewImages={setNewImages} />
							<Form.Item>
								<div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
									<Button
										type="primary"
										size="large"
										htmlType="submit"
										className="col-12 col-md-6 col-lg-3 btn-filled"
										loading={updateLoading}
									>
										Update
									</Button>
									<Popconfirm
										title="Are you sure?"
										description="Delete this product."
										onConfirm={handleDelete}
									>
										<Button
											type="default"
											size="large"
											className="col-12 col-md-6 col-lg-3"
											loading={deleteLoading}
										>
											Delete
										</Button>
									</Popconfirm>
								</div>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdateProduct
