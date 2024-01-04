import Card from "../../../components/shared/Card"
import { Input, Select, message, notification } from "antd"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../../../components/shared/Loader"
const { Search } = Input

const AllProducts = () => {
	const [state, setState] = useState("")
	const shouldLog = useRef(true)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const { GetProducts, SearchProduct } = useProduct()
	const navigate = useNavigate()
	const [api, contextHolder] = notification.useNotification({
		placement: "bottom"
	});

	const options = []
	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i,
		})
	}

	const handleGetProducts = async () => {
		try {
			setLoading(true)
			const res = await GetProducts()
			setProducts(res)
		} catch (error) {
			api.error({ message: "Something went wrong!" })
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (shouldLog.current) {
			shouldLog.current = false
			handleGetProducts()
		}
	}, [])
	const onSearch = async (e) => {
		try {
			setLoading(true)
			if (e === "") {
				const res = await GetProducts()
				setProducts(res)
				return
			}
			const query = { name: e }
			const res = await SearchProduct(query)
			setProducts(res)
		} catch (error) {
			api.error({ message: "Something went wrong!" })
		} finally {
			setLoading(false)
		}
	}
	const handleChange = (e) => {
		setState(e.target.value)
	}


	const handleNavigate = (id) => {
		navigate(`/dashboard/update/${id}`)
	}
	return (
		<>
			{contextHolder}
			<div className="d-flex flex-column flex-md-row gap-2 justify-content-between mt-2 mb-3">
				<div className="col-12 col-md-3">
					<Search
						placeholder="Enter product name"
						allowClear
						enterButton="Find"
						size="large"
						onSearch={onSearch}
						onChange={handleChange}
						value={state}
					/>
				</div>
				<Select
					placeholder="coming soon"
					size="large"
					onChange={handleChange}
					options={options}
					disabled
				/>
			</div>
			<div className="row">
				{loading ? <Loader /> :
					products.map((item, index) => {
						return (
							<div
								className="col-12 col-md-6 col-lg-3 mb-3"
								key={index}
								onClick={() => handleNavigate(item._id)}
							>
								<Card d data={item} />
							</div>
						)
					})}
				{
					!loading && products.length === 0 ? <p className="text-center fw-bold py-2">No product found</p> : null
				}
			</div>
		</>
	)
}

export default AllProducts
