import { Button, Form, Input, Modal, Radio, Select, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import BnbCard from "../../components/shared/BnbCard"
import { shoeFor, sortBy } from "../../global"

const Search = () => {
	const { search_query } = useParams()
	const { RecentAndTopRated } = useProduct()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [state, setState] = useState()
	const [form] = Form.useForm()
	const getRecentProducts = async () => {
		// setLoading(true)
		try {
			const res = await RecentAndTopRated({ limit: 6, sort: -1 })
			setProducts(res)
		} catch (error) {
			console.log(error)
		} finally {
			// setLoading(false)
		}
	}
	useEffect(() => {
		getRecentProducts()
	}, [])
	const ModalBody = () => {
		return <Form layout="vertical" form={form} >
			<div className="d-flex gap-3">
				<Form.Item label="Sort By" name="sort" className="w-100">
					<Select
						placeholder="Sort"
						allowClear
						options={sortBy}
					/>
				</Form.Item>
				<Form.Item label="Shoe For" name="shoefor" className="w-100">
					<Select
						placeholder="Shoe For"
						allowClear
						options={shoeFor}
					/>
				</Form.Item>
			</div>
		</Form>
	}
	return <>
		<div className="container-fluid search-page">
			<div className="d-flex justify-content-between p-2 search-controller mb-2">
				<div>
					<p className="m-0">Search results for</p>
					<p className="m-0 fw-bold fs-4">{search_query}</p>
				</div>
				<div className="d-flex align-items-center gap-2">
					<Input.Search size="large" placeholder="Search" />
					<Button className="d-flex align-items-center fs-6 h-75 btn-filled" onClick={() => setIsModalOpen(true)}><FilterOutlined />Filter</Button>
				</div>
			</div>
			<div className="row">
				{
					products?.map((product, index) => {
						return <div className="col-3" key={index}>
							<BnbCard data={product} />
						</div>
					})
				}
			</div>
		</div>

		<Modal title="Filter" open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
			<ModalBody />
		</Modal>
	</>
}

export default Search
