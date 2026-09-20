import { AppstoreOutlined, PlusSquareOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const link = (to, label) => (
	<Link to={to} className="text-decoration-none">
		{label}
	</Link>
)

export const items = [
	{
		key: "products",
		icon: <AppstoreOutlined />,
		label: link("/dashboard/products", "Products"),
	},
	{
		key: "orders",
		icon: <ShoppingOutlined />,
		label: link("/dashboard/orders", "Orders"),
	},
	{
		key: "users",
		icon: <UserOutlined />,
		label: link("/dashboard/users", "Users"),
	},
	{
		key: "manage",
		label: "Manage",
		children: [
			{
				key: "addProduct",
				icon: <PlusSquareOutlined />,
				label: link("/dashboard/addProduct", "Add product"),
			},
		],
	},
]

// The menu follows the route rather than remembering a click. The previous
// build keyed every item with a random id and pinned the highlight to whatever
// key "1" happened to be, so the active item was wrong everywhere.
const routes = [
	{ match: "/dashboard/orders", selected: "orders", open: [] },
	{ match: "/dashboard/users", selected: "users", open: [] },
	{ match: "/dashboard/addProduct", selected: "addProduct", open: ["manage"] },
	{ match: "/dashboard/update", selected: "products", open: [] },
	{ match: "/dashboard/products", selected: "products", open: [] },
]

export const menuStateFor = (pathname) => {
	const route = routes.find((entry) => pathname.startsWith(entry.match))
	return route ? { selectedKeys: [route.selected], openKeys: route.open } : { selectedKeys: ["products"], openKeys: [] }
}
