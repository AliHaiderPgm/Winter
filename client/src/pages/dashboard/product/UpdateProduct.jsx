import { Breadcrumb, Button, Popconfirm } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { message } from "antd"
import { getBase64, getRandomId } from "../../../global"
import { useProduct } from "../../../context/ProductContext"
import FormProvider from "../../../components/dashboard/FormProvider"

const UpdateProduct = () => {
	const { id } = useParams()
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
	// call get current product data function
	const getData = async () => {
		try {
			setLoading(true)
			const data = await GetDetails(id)
			setState({ ...data })
		} catch (error) {
			console.log(error)
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
			message.error("Failed to set images!")
		}
	}
	useEffect(() => {
		setOldImages()
	}, [state.images])

	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	// handle product update
	const handleUpdate = async () => {
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
			console.log(imagesBase64)
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
				...state,
				images: newImagesUrl,
			}
			await UpdateProduct(id, productData)
			message.success("Product Updated!")
		} catch (error) {
			console.log(error)
			message.error("Something went wrong!")
		} finally {
			setUpdateLoading(false)
		}
	}

	// handle delete product
	const handleDelete = async () => {
		try {
			setDeleteLoading(true)
			await DeleteProduct(id)
			message.success("Product Deleted!")
			navigate("/dashboard/products")
		} catch (error) {
			message.error("Something went wrong!")
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
			<div className="container">
				<div className="container-fluid">
					<Breadcrumb items={breadCrumbItems} />
					<div className="container-fluid">
						<h1 className="text-center mb-3">Update Product</h1>
						<FormProvider
							newImages={newImages}
							setNewImages={setNewImages}
							initialState={state}
							handleChange={handleChange}
							handleSelect={handleSelect}
							formRef={formRef}
						/>
						<div className="d-flex gap-3 justify-content-center">
							<Button
								type="primary"
								size="large"
								className="w-25"
								style={{ backgroundColor: "#001529" }}
								onClick={handleUpdate}
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
									className="w-25"
									loading={deleteLoading}
								>
									Delete
								</Button>
							</Popconfirm>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdateProduct
