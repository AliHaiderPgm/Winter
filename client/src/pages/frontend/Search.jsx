import { Button, Checkbox, Empty, Form, Input, Modal, Radio, Select, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import BnbCard from "../../components/shared/BnbCard"
import { shoeFor, shopByPrice, sortBy } from "../../global/data"
import data from "../../global/data"
import Loader from "../../components/shared/Loader"

const Search = () => {
	const { search_query } = useParams()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [state, setState] = useState({})
	const [searchedFor, setSearchedFor] = useState(search_query)
	const [sizeState, setSizeState] = useState([])
	const [form] = Form.useForm()
	const { SearchProduct } = useProduct()
	const navigate = useNavigate()
	const [isResEmpty, setIsResEmpty] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const getProducts = async () => {
		setIsResEmpty(false)
		setProducts([])
		setIsLoading(true)
		try {
			const res = await SearchProduct(state)
			setProducts(res)
			res.length === 0 && setIsResEmpty(true)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		setState(prev => ({ ...prev, name: search_query }))
		setSearchedFor(search_query)
	}, [search_query])
	useEffect(() => {
		getProducts()
	}, [state])

	const handleSearch = (e) => {
		navigate(`/find/${e}`)
	}
	const handleChange = (e) => {
		setSearchedFor(e.target.value)
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
		const handleClear = () => {
			form.resetFields()
			setSizeState([])
		}
		const handleApply = () => {
			form.validateFields().then(async (e) => {
				setIsModalOpen(false)
				const values = e
				values.sizes = sizeState
				setState(prev => ({ ...prev, ...values }))
			})
		}
		return <div className="d-flex gap-3">
			<Button className="btn-outline w-100" onClick={handleClear}>Clear</Button>
			<Button className="btn-filled w-100" onClick={handleApply}>Apply</Button>
		</div>
	}

	return <>
		<div className="search-page mb-3">
			<div className="d-flex flex-column flex-sm-row gap-2 justify-content-between p-2 search-controller mb-2 px-4">
				<div>
					<p className="m-0">Search results for</p>
					<p className="m-0 fw-bold fs-4">{search_query}</p>
				</div>
				<div className="d-flex align-items-center gap-2">
					<Input.Search size="large" placeholder="Search" allowClear onSearch={handleSearch} value={searchedFor} onChange={handleChange} />
					<Button className="d-flex align-items-center fs-6 btn-filled" size="large" onClick={() => setIsModalOpen(true)}><FilterOutlined />Filters</Button>
				</div>
			</div>
			<div className="row justify-content-center justify-content-md-start align-items-center m-0" style={{ minHeight: "65dvh" }}>
				{
					isLoading ? <Loader /> : null
				}
				{

					products?.map((product, index) => {
						return <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center" key={index}>
							<BnbCard data={product} />
						</div>
					})
				}
				{
					isResEmpty ? <Empty description={<p>No Product</p>} /> : null
				}
			</div>
		</div>

		<Modal title="Filter" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={700} footer={<ModalFooter />}>
			<ModalBody />
		</Modal>
	</>
}

export default Search
