import { Button, Space, Table } from "antd"
import { userData } from "./TableData"
import { DeleteOutlined } from "@ant-design/icons"

const Users = () => {
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			// render: (text) => <a>{text}</a>,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
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
		},
		// {
		// 	title: "Tags",
		// 	key: "tags",
		// 	dataIndex: "tags",
		// 	render: (_, { tags }) => (
		// 		<>
		// 			{tags.map((tag) => {
		// 				let color = tag.length > 5 ? "geekblue" : "green"
		// 				if (tag === "loser") {
		// 					color = "volcano"
		// 				}
		// 				return (
		// 					<Tag color={color} key={tag}>
		// 						{tag.toUpperCase()}
		// 					</Tag>
		// 				)
		// 			})}
		// 		</>
		// 	),
		// },
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button danger type="text">
					<DeleteOutlined style={{ fontSize: 16 }} />
				</Button>
			),
		},
	]
	return <Table columns={columns} dataSource={userData} />
}

export default Users
