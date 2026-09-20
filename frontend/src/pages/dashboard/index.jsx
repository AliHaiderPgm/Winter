// Imported here rather than from App.scss on purpose: the storefront never
// renders this area, so its stylesheet travels in the dashboard's own lazy
// chunk instead of riding along in the global CSS on every page load.
import "../../sass/dashboard.scss"
import { useEffect, useMemo, useState } from "react"
import { Avatar, Dropdown, Layout, Menu } from "antd"
import { DownOutlined, LogoutOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ConfigProvider from "antd/es/config-provider"
import { items, menuStateFor } from "./SideBar"
import Pages from "./Pages"
import logo from "../../assets/logo.png"
import { dashboardTheme } from "../../components/antdTheme"
import { useAuth } from "../../context/AuthContext"
import AuthServices from "../../context/AuthServices"
import { useNotice } from "../../context/NoticeContext"
import { toast } from "../../utils/toast"

const { Header, Sider } = Layout

export default function Index() {
	const [collapsed, setCollapsed] = useState(false)
	const [openKeys, setOpenKeys] = useState(() => menuStateFor(window.location.pathname).openKeys)
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { user, dispatch } = useAuth()
	const { notify } = useNotice()
	const year = new Date().getFullYear()

	const menuState = useMemo(() => menuStateFor(pathname), [pathname])

	// Open the submenu a deep link needs, without closing one the user opened
	// themselves.
	useEffect(() => {
		const needed = menuStateFor(pathname).openKeys
		if (!needed.length) return
		setOpenKeys((prev) => (needed.every((key) => prev.includes(key)) ? prev : [...new Set([...prev, ...needed])]))
	}, [pathname])

	const handleLogout = async () => {
		// Read the name before the dispatch clears the session.
		const firstName = user?.name?.trim()?.split(/\s+/)?.[0]
		try {
			await AuthServices.logoutUser()
			dispatch({ type: "LOGOUT" })
			// There is no navbar pill on this side of the app, so the goodbye
			// arrives as a toast.
			notify(firstName ? `Goodbye, ${firstName}!` : "Goodbye!", { type: "farewell", emoji: "\u{1F44B}" })
			navigate("/")
		} catch (error) {
			toast.error("Failed to log out!")
		}
	}

	const accountItems = [
		{
			key: "profile",
			icon: <UserOutlined />,
			label: "Your profile",
			onClick: () => navigate("/profile"),
		},
		{
			key: "store",
			icon: <ShopOutlined />,
			label: "View store",
			onClick: () => navigate("/"),
		},
		{ type: "divider" },
		{
			key: "logout",
			icon: <LogoutOutlined />,
			label: "Logout",
			danger: true,
			onClick: handleLogout,
		},
	]

	const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "A"

	return (
		<ConfigProvider theme={dashboardTheme}>
			<Layout className="dashboard" data-collapsed={collapsed}>
				<Header className="dashboard__header">
					<Link to="/dashboard/products" className="brand">
						<img src={logo} alt="Winter" />
						<span className="brand-label">Dashboard</span>
					</Link>

					<div className="header-actions">
						<Link to="/" className="dashboard__store-link">
							<ShopOutlined />
							<span className="d-none d-sm-inline">View store</span>
						</Link>

						<Dropdown menu={{ items: accountItems }} trigger={["click"]} placement="bottomRight">
							<button type="button" className="dashboard__account">
								{user?.profileImage
									? <Avatar size={28} src={user.profileImage} alt="" />
									: <Avatar size={28}>{initial}</Avatar>
								}
								<span className="d-none d-md-flex flex-column text-start lh-1">
									<span className="account-name">{user?.name || "Admin"}</span>
									<span className="account-role">{user?.type || "admin"}</span>
								</span>
								<DownOutlined style={{ fontSize: 10 }} />
							</button>
						</Dropdown>
					</div>
				</Header>

				<Sider
					className="dashboard__sider"
					breakpoint="lg"
					width={220}
					collapsedWidth={80}
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
				>
					<Menu
						mode="inline"
						theme="dark"
						items={items}
						selectedKeys={menuState.selectedKeys}
						openKeys={openKeys}
						onOpenChange={setOpenKeys}
					/>
				</Sider>

				<main className="dashboard__main">
					<Pages />

					<footer className="dashboard__footer">
						<span>&copy; {year} Winter. All rights reserved.</span>
						<span className="d-flex flex-wrap gap-3">
							<Link to="/help">Help Center</Link>
							<Link to="/contact">Contact</Link>
						</span>
					</footer>
				</main>
			</Layout>
		</ConfigProvider>
	)
}
