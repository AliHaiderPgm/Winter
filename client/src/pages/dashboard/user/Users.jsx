import { Button, Dropdown, Input, Select, Space, Table } from "antd"
import { userData } from "./TableData"
import {
	CheckOutlined,
	DeleteOutlined,
	DownOutlined,
	SearchOutlined,
} from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"

const Users = () => {
	const [searchText, setSearchText] = useState("")
	const [searchedColumn, setSearchedColumn] = useState("")
	const searchInput = useRef(null)
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}
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
						defaultValue={record.role}
						style={{
							width: 120,
						}}
						// onChange={handleChange}
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
			render: (_, record) => {
				let currentUser = {}
				userData.map(user => {
					if (user === record) {
						currentUser = user
					}
				})
				return (
					<>
						<Button danger type="text">
							<DeleteOutlined style={{ fontSize: 16 }} />
						</Button>
						{record.role === currentUser.role ? null :
							<Button type="text">
								<CheckOutlined style={{ fontSize: 16, color: "#00FF00" }} />
							</Button>
						}
					</>
				)
			},
		},
	]
	return <Table columns={columns} dataSource={userData} />
}

export default Users
