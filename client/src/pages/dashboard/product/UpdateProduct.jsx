import { Breadcrumb, Button } from "antd"
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FormProvider from "../../../components/dashboard/FormProvider"
import { useProduct } from "../../../context/ProductContext"
import { urlToBase64 } from "../../../global"

const UpdateProduct = () => {
	const { id } = useParams()
	const { GetDetails, detailsLoading, UpdateProduct } = useProduct()
	const [loading, setLoading] = useState(false)
	const [updateLoading, setUpdateLoading] = useState(false)
	const log = useRef(true)
	const formRef = useRef()
	const [state, setState] = useState({})
	// Get details
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

	const imagesArray = state?.images
	const [images, setImages] = useState([])
	const breadCrumbItems = [
		{
			title: (
				<Link to="/dashboard/products" className="text-decoration-none">
					Products
				</Link>
			),
		},
		{
			title: "Nike Air",
		},
	]

	const handleSelect = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleUpdate = async () => {
		setUpdateLoading(true)
		const code = await Promise.all(
			images.map(async (img) => {
				const imgCode = await urlToBase64(img)
				return imgCode
			})
		)
		const productData = {
			...state,
			images: code,
		}
		try {
			const res = await UpdateProduct(id, productData)
			console.log(res)
		} catch (error) {
			console.log(error)
		} finally {
			setUpdateLoading(false)
		}
	}

	if (detailsLoading && loading) {
		return <h1>Loading...</h1>
	}
	return (
		<>
			<div className="container">
				<div className="container-fluid">
					<Breadcrumb items={breadCrumbItems} />
					<div className="container-fluid">
						<h1 className="text-center mb-3">Update Product</h1>
						<FormProvider
							initialState={state}
							images={images}
							prevImage={imagesArray}
							setImages={setImages}
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
