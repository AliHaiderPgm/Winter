import Card from "../../../components/shared/Card"
import { Button, Input, Select } from "antd"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "../../../utils/toast"
import Loader from "../../../components/shared/Loader"
import PageShell from "../../../components/dashboard/PageShell"
import Panel from "../../../components/dashboard/Panel"
const { Search } = Input

const AllProducts = () => {
	const [state, setState] = useState("")
	const shouldLog = useRef(true)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const { GetProducts, SearchProduct } = useProduct()
	const navigate = useNavigate()

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
			toast.error("Something went wrong!")
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
			toast.error("Something went wrong!")
		} finally {
			setLoading(false)
		}
	}
	const handleChange = (e) => {
		setState(e.target.value)
	}


	const handleNavigate = (id) => {
		navigate(`/dashboard/update/${id}`, { state: { id } })
	}
	return (
		<PageShell
			eyebrow="Catalog"
			title="Products"
			subtitle="Search the catalog, then open a product to edit its details, stock or images."
			breadcrumb={[{ title: "Products" }]}
			actions={<Button className="btn-filled" onClick={() => navigate("/dashboard/addProduct")}>Add product</Button>}
		>
			<Panel
				title="Find a product"
				note={loading ? "Loading the catalog..." : `${products.length} product${products.length === 1 ? "" : "s"} in the catalog`}
			>
				<div className="d-flex flex-column flex-md-row gap-2 align-items-stretch">
					<div className="col-12 col-md-5 col-lg-4 p-0">
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
			</Panel>

			<div className="mt-3">
				{
					loading
						? <Panel><div className="dashboard__loading"><Loader /></div></Panel>
						: products.length === 0
							? <Panel><p className="m-0 muted">No product matches that search. Try another name.</p></Panel>
							: <div className="row g-3">
								{
									products.map((item) => (
										<div className="col-12 col-sm-6 col-lg-4 col-xxl-3" key={item._id}>
											<button
												type="button"
												className="dashboard__product"
												onClick={() => handleNavigate(item._id)}
												aria-label={`Edit ${item.name}`}
											>
												<Card data={item} />
											</button>
										</div>
									))
								}
							</div>
				}
			</div>
		</PageShell>
	)
}

export default AllProducts
