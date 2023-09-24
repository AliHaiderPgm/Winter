import { Button, Input, Select, Space, Table } from "antd"
// import { userData } from "./TableData"
import { message } from "antd"
import {
	CheckOutlined,
	DeleteOutlined,
	SearchOutlined,
} from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import AuthServices from "../../../context/AuthServices"
import Loader from "../../../components/shared/Loader"

const Users = () => {
	const [fetchedData, setFetchedData] = useState([])
	const [data, setData] = useState([])
	const [searchText, setSearchText] = useState("")
	const [searchedColumn, setSearchedColumn] = useState("")
	const searchInput = useRef(null)
	const [loading, setLoading] = useState(false)
	const log = useRef(true)
	// get users
	const getUsers = async () => {
		try {
			setLoading(true)
			const res = await AuthServices.getAllUsers()
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
			getUsers()
			log.current = false
		}
	}, [])

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
				style={{
					padding: 8,
				}}
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
					style={{
						marginBottom: 8,
						display: "block",
					}}
				/>
				<Space>
					<Button
						type="text"
						size="middle"
						onClick={() => {
							setSearchText(selectedKeys[0])
							setSearchedColumn(dataIndex)
							confirm({
								closeDropdown: true,
							})
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
	// how to display data
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			...getColumnSearchProps("email"),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			filters: [
				{
					text: "Admin",
					value: "admin",
				},
				{
					text: "User",
					value: "user",
				},
			],
			onFilter: (value, record) => record.role.indexOf(value) === 0,
			render: (text, record) => {
				return (
					<Select
						defaultValue={record.type}
						style={{
							width: 120,
						}}
						onChange={e => {
							const updatedData = data.map(user => {
								if (user._id === record._id) {
									return { ...user, type: e }
								}
								return user
							})
							setData(updatedData)
						}}
						options={[
							{
								value: "admin",
								label: "Admin",
							},
							{
								value: "user",
								label: "User",
							},
						]}
					/>
				)
			},
		},
		{
			title: "Action",
			key: "action",
			width: 300,
			render: (_, record) => {
				let userFromState = {}
				data.map(user => {
					if (user._id === record._id) {
						userFromState = user
					}
				})
				return (
					<>
						<Button danger type="text">
							<DeleteOutlined style={{ fontSize: 16 }} />
						</Button>
						{record.type === userFromState.type ? null :
							<Button type="text">
								<CheckOutlined style={{ fontSize: 16, color: "#00FF00" }} />
							</Button>
						}
					</>
				)
			},
		},
	]
	if (loading) {
		return <Loader />
	}
	return <Table columns={columns} dataSource={fetchedData} />
}

export default Users
