import { Button, Drawer, Input, Popconfirm, Select, Space, Table } from "antd"
import { message } from "antd"
import {
	CheckOutlined,
	DeleteOutlined,
	RightOutlined,
	SearchOutlined,
} from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import BasicDetailsCard from "../../components/shared/BasicDetailsCard"

const OrderStatus = [
	{
		text: "Pending",
		label: "Pending",
		value: "pending",
	},
	{
		text: "In Progress",
		label: "In Progress",
		value: "inProgress",
	},
	{
		text: "Delivered",
		label: "Delivered",
		value: "delivered",
	},
	{
		text: "Cancelled",
		label: "Cancelled",
		value: "cancelled",
	},
]
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
	const log = useRef(true)
	const [updating, setUpdating] = useState(false)
	const [deleting, setDeleting] = useState(new Array(fetchedData.length).fill(false))
	const { user } = useAuth()
	const { getAllOrders, updateOrder } = useCart()
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [orderDetails, setOrderDetails] = useState()
	// get users
	const getOrders = async () => {
		try {
			setLoading(true)
			setFetchedData([])
			setData([])
			const res = await getAllOrders()
			console.log(res)
			setFetchedData(res)
			setData(res)
		} catch (error) {
			message.error("Something went wrong!")
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
	const updateOrderFn = async (e) => {
		try {
			setUpdating(true)
			await updateOrder(e._id, { status: e.status })
			await getOrders()
			message.success("Order updated!")
		} catch (error) {
			message.error("Something went wrong!")
		} finally {
			setUpdating(false)
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
					color: filtered ? "#1677ff" : undefined,
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
						backgroundColor: "#ffc069",
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
			onFilter: (value, record) => record.paymentMethod.startsWith(value),
		},
		{
			title: "Total Amount",
			dataIndex: "total",
			key: "total",
			sorter: (a, b) => a.total - b.total,
			render: (text, record) => {
				return <p>Rs.{text}</p>
			},
		},
		{
			title: "Order Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text, record) => {
				return new Date(text).toDateString()

			},
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
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: (current, record) => {
				return (
					<Select
						defaultValue={record.status}
						style={{ width: 130 }}
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
						loading={updating}
						disabled={isSame}
						onClick={() => updateOrderFn(orderFromState)}
						className="d-flex align-items-center"
					>
						Update <CheckOutlined style={{ fontSize: 16, color: isSame ? "#00000040" : "#00FF00" }} />
					</Button>
				</div>
			},
		},
	]
	return <>
		<Table columns={columns} dataSource={fetchedData} loading={loading} pagination={false} />
		<Drawer title="Order Details" placement="right" onClose={() => setIsModelOpen(false)} open={isModelOpen}>
			<h5>Orders</h5>
			{
				orderDetails && orderDetails.order.map((e, i) => {
					return <BasicDetailsCard data={e} key={i} />
				})
			}
			{
				orderDetails ? <div>
					<div className="my-2">
						<h5>Delivery Details</h5>
						<p className="m-0 fw-semibold">Name: <span className="fw-normal">{orderDetails.receiver.firstName + " " + orderDetails.receiver.secondName}</span></p>
						<p className="m-0 fw-semibold">Address: <span className="fw-normal">{orderDetails.receiver.address + ", " + orderDetails.receiver.district}</span></p>
						<p className="m-0 fw-semibold">Email: <span className="fw-normal">{orderDetails.receiver.email}</span></p>
						<p className="m-0 fw-semibold">Phone: <span className="fw-normal">{orderDetails.receiver.phoneNumber}</span></p>
					</div>
					<div>
						<h5>Order Details</h5>
						<p className="m-0 fw-semibold">SubTotal: <span className="fw-normal ">Rs.{orderDetails.subTotal}</span></p>
						<p className="m-0 fw-semibold">Tax: <span className="fw-normal ">Rs.{orderDetails.tax}</span></p>
						<p className="m-0 fw-semibold">Total: <span className="fw-normal ">Rs.{orderDetails.total}</span></p>
					</div>
				</div> : null
			}
		</Drawer>
	</>

}

export default Orders
