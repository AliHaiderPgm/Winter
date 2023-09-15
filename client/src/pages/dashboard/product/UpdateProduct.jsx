import { Breadcrumb, Button } from "antd"
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FormProvider from "../../../components/dashboard/FormProvider"
import { useProduct } from "../../../context/ProductContext"
import { getBase64, getRandomId, urlToBase64 } from "../../../global"

const UpdateProduct = () => {
	const { id } = useParams()
	const { GetDetails, detailsLoading, UpdateProduct, uploadImage } =
		useProduct()
	const [loading, setLoading] = useState(false)
	const [updateLoading, setUpdateLoading] = useState(false)
	const log = useRef(true)
	const formRef = useRef()
	const [state, setState] = useState({})
	const [newImages, setNewImages] = useState([])
	// call get product function
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
	useEffect(() => {
		const imagesArray = state?.images
		imagesArray?.map((imageUrl) => {
			const file = {
				uid: getRandomId(),
				name: getRandomId(),
				status: "done",
				url: imageUrl,
				newFile: false,
			}
			setNewImages((prevImage) => [...prevImage, file])
		})
	}, [state.images])

	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleUpdate = async () => {
		setUpdateLoading(true)
		try {
			const imagesBase64 = await Promise.all(
				newImages.map(async (img) => {
					if (img.newFile) {
						const imgCode = await getBase64(img.file)
						return imgCode
					}
				})
			)
			for (const image of imagesBase64) {
				const url = await uploadImage({ base64: image })
				console.log(url)
			}
			// const productData = {
			// 	...state,
			// 	images: imagesUrl,
			// }
			// console.log(productData)
		} catch (error) {
			console.log("Failed to upload new images")
		} finally {
			setUpdateLoading(false)
		}
		// try {
		// 	const res = await UpdateProduct(id, productData)
		// 	console.log(res)
		// } catch (error) {
		// 	console.log(error)
		// } finally {
		// 	setUpdateLoading(false)
		// }
	}

	if (detailsLoading && loading) {
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
							<Button type="default" size="large" className="w-25">
								Delete
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdateProduct
