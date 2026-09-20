import { Button, Drawer, Input, Select, Space, Table } from "antd"
import {
	CheckOutlined,
	RightOutlined,
	SearchOutlined,
} from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import { useCart } from "../../context/CartContext"
import BasicDetailsCard from "../../components/shared/BasicDetailsCard"
import { OrderStatus } from "../../global/data"
import { toast } from "../../utils/toast"
import PageShell from "../../components/dashboard/PageShell"
import Panel from "../../components/dashboard/Panel"

const paymentMethods = [
	{
		text: "Cash on delivery",
		label: "Cash on delivery",
		value: "Cash",
	},
	{
		text: "Online Payment",
		label: "Online Payment",
		value: "Online",
	},
]

const Orders = () => {
	const [fetchedData, setFetchedData] = useState([])
	const [data, setData] = useState([])
	const [searchText, setSearchText] = useState("")
	const [searchedColumn, setSearchedColumn] = useState("")
	const searchInput = useRef(null)
	const [loading, setLoading] = useState(true)
	const [updating, setUpdating] = useState(new Array(fetchedData.length).fill(false))
	const log = useRef(true)
	const { getAllOrders, updateOrder } = useCart()
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [orderDetails, setOrderDetails] = useState()
	// get users
	const getOrders = async () => {
		setLoading(true)
		try {
			const res = await getAllOrders()
			setFetchedData(res)
			setData(res)
		} catch (error) {
			toast.error("Something went wrong!")
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if (log.current) {
			getOrders()
			log.current = false
		}
	}, [])

	// update user
	const updateOrderFn = async (e, index) => {
		try {
			const newUpdating = [...updating]
			newUpdating[index] = true
			setUpdating(newUpdating)
			await updateOrder(e._id, { status: e.status })
			const res = await getAllOrders()
			setFetchedData(res)
			setData(res)
			toast.success("Order updated!")
		} catch (error) {
			toast.error("Failed to update order!")
		} finally {
			const newUpdating = [...updating]
			newUpdating[index] = false
			setUpdating(newUpdating)
		}
	}
	// search functions
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}
	// How searched data will look like
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{ padding: 8, }}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search by ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block", }}
				/>
				<Space>
					<Button
						type="text"
						size="middle"
						onClick={() => {
							setSearchText(selectedKeys[0])
							setSearchedColumn(dataIndex)
							confirm({ closeDropdown: true, })
						}}
					>
						Filter
					</Button>
					<Button
						size="middle"
						type="primary"
						onClick={() => {
							clearFilters()
							confirm({
								closeDropdown: true,
							})
							setSearchText("")
							setSearchedColumn(dataIndex)
						}}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? "#111" : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "rgba(17, 17, 17, 0.12)",
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	})

	// Order detail model
	const handelModel = (id) => {
		const order = fetchedData.filter(i => i._id === id)[0]
		setOrderDetails(order)
		setIsModelOpen(true)
	}
	// how to display data
	const columns = [
		{
			title: "#",
			key: "count",
			render: (current, record, index) => <p className="fw-bold">{index + 1}</p>,
			responsive: ['md']
		},
		{
			title: "Order Id",
			dataIndex: "orderNumber",
			key: "orderNumber",
			...getColumnSearchProps("orderNumber"),
		},
		{
			title: "Name",
			dataIndex: "receiver.firstName",
			key: "receiver",
			render: (text, record) => {
				const fullName = record.receiver.firstName + " " + record.receiver.secondName
				return fullName
			},
		},
		{
			title: "Payment Method",
			dataIndex: "paymentMethod",
			key: "paymentMethod",
			filters: paymentMethods,
			responsive: ['md'],
			onFilter: (value, record) => record.paymentMethod.startsWith(value),
		},
		{
			title: "Total Amount",
			dataIndex: "total",
			key: "total",
			responsive: ['md'],
			sorter: (a, b) => a.total - b.total,
			render: (text, record) => {
				return <p>Rs.{text}</p>
			},
		},
		{
			title: "Order Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text, record) => new Date(text).toDateString(),
		},
		{
			title: "Options",
			dataIndex: "_id",
			key: "options",
			render: (current, record) => {
				return <Button
					type="link"
					className="d-flex align-items-center"
					onClick={() => handelModel(current)}
				>
					Details <RightOutlined />
				</Button>
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			filters: OrderStatus,
			width: 150,
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: (current, record) => {
				return (
					<Select
						defaultValue={record.status}
						// style={{ width: 130 }}
						onChange={e => {
							const updatedData = data.map(order => {
								if (order._id === record._id) {
									return { ...order, status: e }
								}
								return order
							})
							setData(updatedData)
						}}
						options={OrderStatus}
					/>
				)
			},
		},
		{
			title: "Action",
			dataIndex: "status",
			key: "status",
			width: 150,
			render: (current, record, index) => {
				let orderFromState = {}
				data.map(order => {
					if (order._id === record._id) {
						orderFromState = order
					}
				})
				const isSame = record.status === orderFromState.status
				return <div key={index}>
					<Button
						type="text"
						loading={updating[index]}
						disabled={isSame}
						onClick={() => updateOrderFn(orderFromState, index)}
						className="d-flex align-items-center dashboard__action--confirm"
						title={isSame ? "No change to save" : "Save this status"}
					>
						Save <CheckOutlined style={{ fontSize: 16 }} />
					</Button>
				</div>
			},
		},
	]
	return (
		<PageShell
			eyebrow="Operations"
			title="Orders"
			subtitle="Review every order placed in the store and move it along as it ships."
			breadcrumb={[{ title: "Orders" }]}
		>
			<Panel
				title="All orders"
				note={loading ? "Loading orders..." : `${fetchedData.length} order${fetchedData.length === 1 ? "" : "s"}`}
				flush
			>
				<Table
					columns={columns}
					dataSource={fetchedData}
					loading={loading}
					pagination={{ pageSize: 10, hideOnSinglePage: true, showSizeChanger: false }}
					scroll={{ x: 900 }}
					rowKey={i => i._id}
				/>
			</Panel>

			<Drawer className="dashboard__drawer" title="Order details" placement="right" width={420} onClose={() => setIsModelOpen(false)} open={isModelOpen}>
				<section className="dashboard__drawer__section">
					<h3>Products</h3>
					{
						orderDetails && orderDetails.order.map((e, i) => {
							return <BasicDetailsCard data={e} key={i} />
						})
					}
				</section>
			{
				orderDetails ? <>
					<section className="dashboard__drawer__section">
						<h3>Delivery</h3>
						<dl>
							<dt>Name</dt>
							<dd>{orderDetails.receiver.firstName + " " + orderDetails.receiver.secondName}</dd>
							<dt>Address</dt>
							<dd>{orderDetails.receiver.address + ", " + orderDetails.receiver.district}</dd>
							<dt>Email</dt>
							<dd>{orderDetails.receiver.email}</dd>
							<dt>Phone</dt>
							<dd>{orderDetails.receiver.phoneNumber}</dd>
						</dl>
					</section>
					<section className="dashboard__drawer__section">
						<h3>Summary</h3>
						<dl>
							<dt>Subtotal</dt>
							<dd>Rs.{orderDetails.subTotal}</dd>
							<dt>Tax</dt>
							<dd>Rs.{orderDetails.tax}</dd>
							<dt>Total</dt>
							<dd className="fw-bold">Rs.{orderDetails.total}</dd>
							<dt>Payment</dt>
							<dd>{orderDetails.paymentMethod}</dd>
							<dt>Placed</dt>
							<dd>{new Date(orderDetails.createdAt).toLocaleString()}</dd>
						</dl>
					</section>
				</> : null
			}
			</Drawer>
		</PageShell>
	)
}

export default Orders
