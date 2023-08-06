import React from "react"
import { LaptopOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
const getRandomId = () => Math.random().toString(36).slice(2)

export const items = [
	{
		key: getRandomId(),
		icon: <LaptopOutlined />,
		label: (
			<Link to={"/dashboard"} className="text-decoration-none">
				All Products
			</Link>
		),
	},
	{
		key: getRandomId(),
		icon: <UserOutlined />,
		label: (
			<Link to={"/dashboard/orders"} className="text-decoration-none">
				Orders
			</Link>
		),
	},
	{
		key: getRandomId(),
		label: "Manage",
		children: [
			{
				key: getRandomId(),
				label: (
					<Link to={"/dashboard/addProduct"} className="text-decoration-none">
						Add products
					</Link>
				),
			},
		],
	},
]
