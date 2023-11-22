import { Button, Checkbox, Form, Input, Modal, Radio, Select, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import BnbCard from "../../components/shared/BnbCard"
import { shoeFor, shopByPrice, sortBy } from "../../global/data"
import data from "../../global/data"

const Search = () => {
	const { search_query } = useParams()
	const { RecentAndTopRated } = useProduct()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [state, setState] = useState()
	const [sizeState, setSizeState] = useState([])
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
	const handleFormSubmit = () => {
		form.validateFields().then((values) => {
			console.log(values)
		})
	}
	const ModalBody = () => {
		const sortOptions = [
			{
				index: "0",
				label: `Shop by Price`,
				name: "prices",
				options: shopByPrice
			},
			{
				index: "1",
				label: `Type`,
				name: "types",
				options: [...data.types].splice(1)
			},
			{
				index: "2",
				label: `Brand`,
				name: "brands",
				options: [...data.brands].splice(1)
			},
		]

		const Size = () => {
			const handleSize = (value) => {
				setSizeState(prev => {
					if (prev.includes(value)) {
						return prev.filter(size => size !== value)
					} else {
						return [...prev, value]
					}
				})
			}
			return <div className="d-flex flex-wrap gap-2">
				{data.sizes?.map((size, index) => {
					return <div className={`custom-checkBox flex-fill ${sizeState.includes(size.value) && "active"}`} key={index} onClick={() => handleSize(size.value)}>
						<p>{size.label}</p>
					</div>
				})}
			</div>
		}
		return <Form layout="vertical" form={form}>
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
			{
				sortOptions.map((option, index) => {
					return <Form.Item key={index} className="mb-3" label={option.label} name={option.name}>
						<Checkbox.Group options={option.options} />
					</Form.Item>
				})
			}
			<Form.Item label="Size" name="sizes">
				<Size />
			</Form.Item>
		</Form>
	}
	const ModalFooter = () => {
		return <div className="d-flex gap-3">
			<Button className="btn-outline w-100" onClick={() => { form.resetFields(); setSizeState([]) }}>Clear</Button>
			<Button className="btn-filled w-100" onClick={() => { getProducts(); setIsDrawerOpen(false) }}>Apply</Button>
		</div>
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

		<Modal title="Filter" open={isModalOpen} onOk={handleFormSubmit} onCancel={() => setIsModalOpen(false)} width={700} footer={<ModalFooter />}>
			<ModalBody />
		</Modal>
	</>
}

export default Search
