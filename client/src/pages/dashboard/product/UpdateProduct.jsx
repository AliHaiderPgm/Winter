import { Breadcrumb, Button } from "antd"
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FormProvider from "../../../components/dashboard/FormProvider"
import { useProduct } from "../../../context/ProductContext"

const UpdateProduct = () => {
	const { id } = useParams()
	const { GetDetails, product, detailsLoading } = useProduct()
	const log = useRef(true)
	// Get details
	useEffect(() => {
		GetDetails(id)
		if (log.current) {
			log.current = false
		}
	}, [])

	const initialState = {
		...product,
	}
	const [state, setState] = useState(initialState)
	const imagesArray = product?.images
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
		// const code = await Promise.all(
		// 	product?.images.map(async (image) => {
		// 		const imageCode = await urlToBase64(image)
		// 		return imageCode
		// 	})
		// )
		console.log(images)
	}

	if (detailsLoading) {
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
							state={state}
							initialState={initialState}
							images={images}
							prevImage={imagesArray}
							setImages={setImages}
							handleChange={handleChange}
							handleSelect={handleSelect}
						/>
						<div className="d-flex gap-3 justify-content-center">
							<Button
								type="primary"
								size="large"
								className="w-25"
								style={{ backgroundColor: "#001529" }}
								onClick={handleUpdate}
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
