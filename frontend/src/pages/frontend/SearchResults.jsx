import { Button, Checkbox, Empty, Form, Input, Modal, Select } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import BnbCard from "../../components/shared/BnbCard"
import { shoeFor, shopByPrice, sortBy } from "../../global/data"
import data from "../../global/data"
import Loader from "../../components/shared/Loader"



const initialLoadingState = {
	firstLoader: false,
	scrollingLoader: false
}
const Search = () => {
	const { search_query } = useParams()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [state, setState] = useState({ name: search_query })
	const [sizeState, setSizeState] = useState([])
	const [form] = Form.useForm()
	const { SearchProduct } = useProduct()
	const [isResEmpty, setIsResEmpty] = useState(false)
	const [loading, setLoading] = useState(initialLoadingState)
	const [page, setPage] = useState(1)
	const [innerWidth, setInnerWidth] = useState(0)
	// infinite scroll
	const handleScroll = () => {
		/////How much is scrolled from top
		const scrollTop = document.documentElement.scrollTop
		//// Max scroll value from top
		const innerHeight = window.innerHeight
		////Height of content even it is not visible
		const contentHeight = document.documentElement.scrollHeight

		if (scrollTop + innerHeight + 300 >= contentHeight) {
			setPage(prev => prev + 1)
		}
	}
	const handleResize = () => {
		setInnerWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		setInnerWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("scroll", handleScroll)
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const getProducts = async ({ scrolling }) => {
		try {
			setLoading((prev) => ({
				...prev,
				firstLoader: !scrolling,
				scrollingLoader: scrolling,
			}));
			const res = await SearchProduct(state, page)
			setProducts(prev => {
				const uniqueIds = new Set(prev.map(item => item._id))
				const newItems = res.filter(item => !uniqueIds.has(item._id))
				return [...prev, ...newItems]
			})

			res.length === 0 && setPage(1)
			res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(initialLoadingState)
		}
	}
	useEffect(() => {
		if (!isResEmpty) {
			products.length === 0 ? getProducts({ scrolling: false }) : getProducts({ scrolling: true })
		}
	}, [state, page])


	useEffect(() => {
		resetSomeStuff()
		setState(prev => ({ ...prev, name: search_query }))
	}, [search_query])

	const resetSomeStuff = () => {
		setPage(1)
		setIsResEmpty(false)
		setProducts([])
	}

	const handleSort = (e) => {
		resetSomeStuff()
		setState(prev => ({ ...prev, sort: e }))
	}
	useEffect(() => {
		getProducts({ scrolling: false })
	}, [state?.sort])

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
				{
					innerWidth <= 576 && <Form.Item label="Sort By" name="sort" className="w-100">
						<Select
							placeholder="Sort"
							allowClear
							options={sortBy}
						/>
					</Form.Item>
				}
				<Form.Item label="Shoe For" name="shoefor" className={`${innerWidth <= 576 ? "w-100" : "w-50"}`}>
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
			resetSomeStuff()
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
			<div className="d-flex gap-2 justify-content-between p-2 search-controller mb-2 px-4">
				<div>
					<p className="m-0">Search results for</p>
					<p className="m-0 fw-bold fs-4">{search_query}</p>
				</div>
				<div className="d-flex align-items-center gap-2">
					{
						innerWidth > 576 && <Select
							placeholder="Sort"
							allowClear
							options={sortBy}
							size="large"
							style={{
								width: 150
							}}
							onChange={handleSort}
						/>
					}
					<Button className="d-flex align-items-center fs-6 btn-filled" size="large" onClick={() => setIsModalOpen(true)}><FilterOutlined />Filters</Button>
				</div>
			</div>
			<div className="row justify-content-center justify-content-md-start align-items-center m-0">
				{
					loading.firstLoader ? <div style={{ minHeight: "65dvh" }}>
						<Loader />
					</div>
						:
						products?.map((product, index) => {
							return <div className="col-10 col-sm-6 col-md-3 d-flex justify-content-center" key={index}>
								<BnbCard data={product} />
							</div>
						})
				}
				{
					isResEmpty && products.length === 0 && !loading.firstLoader
						? <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: "65dvh" }}><Empty description={<p>No Product</p>} /></div> : null
				}
			</div>
			{
				loading.scrollingLoader ? <Loader /> : null
			}
		</div>

		<Modal title="Filter" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={700} footer={<ModalFooter />}>
			<ModalBody />
		</Modal>
	</>
}

export default Search
