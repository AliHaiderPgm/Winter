import { AppstoreOutlined, ShoppingOutlined, TagOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
const getRandomId = () => Math.random().toString(36).slice(2)

export const items = [
	{
		key: getRandomId(),
		icon: <AppstoreOutlined />,
		label: (
			<NavLink to={"/dashboard/products"} className="text-decoration-none">
				Products
			</NavLink>
		),
	},
	{
		key: getRandomId(),
		icon: <ShoppingOutlined />,
		label: (
			<NavLink to={"/dashboard/orders"} className="text-decoration-none">
				Orders
			</NavLink>
		),
	},
	{
		key: getRandomId(),
		icon: <UserOutlined />,
		label: (
			<NavLink to={"/dashboard/users"} className="text-decoration-none">
				Users
			</NavLink>
		),
	},
	{
		key: getRandomId(),
		label: "Manage",
		children: [
			{
				key: getRandomId(),
				icon: <TagOutlined />,
				label: (
					<NavLink
						to={"/dashboard/addProduct"}
						className="text-decoration-none"
					>
						Products
					</NavLink>
				),
			},
		],
	},
]
