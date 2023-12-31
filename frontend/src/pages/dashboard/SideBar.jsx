import { LaptopOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
const getRandomId = () => Math.random().toString(36).slice(2)

export const items = [
	{
		key: getRandomId(),
		icon: <LaptopOutlined />,
		label: (
			<NavLink to={"/dashboard/products"} className="text-decoration-none">
				All Products
			</NavLink>
		),
	},
	{
		key: getRandomId(),
		icon: <UserOutlined />,
		label: (
			<NavLink to={"/dashboard/orders"} className="text-decoration-none">
				Orders
			</NavLink>
		),
	},
	{
		key: getRandomId(),
		label: "Manage",
		children: [
			{
				key: getRandomId(),
				label: (
					<NavLink
						to={"/dashboard/addProduct"}
						className="text-decoration-none"
					>
						Add products
					</NavLink>
				),
			},
			{
				key: getRandomId(),
				label: (
					<NavLink to={"/dashboard/users"} className="text-decoration-none">
						Users
					</NavLink>
				),
			},
		],
	},
]
