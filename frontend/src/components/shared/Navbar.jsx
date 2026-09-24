import React, { Suspense, useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import Logo from "../../assets/logo.png"
import Icon, {
	HeartOutlined,
	MenuOutlined,
	RightOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
} from "@ant-design/icons"
import Badge from "antd/es/badge"
import Button from "antd/es/button"
import Drawer from "antd/es/drawer"
import Input from "antd/es/input"
import Modal from "antd/es/modal"
// Split out, and deep-pathed: import('antd') would pull the whole library into
// the chunk that the navbar triggers on the first paint.
const Dropdown = React.lazy(() => import('antd/es/dropdown'));
import { useAuth } from "../../context/AuthContext"
import AuthServices from "../../context/AuthServices"
import { addToHistory } from "../../global"
import Svg from "../../global/svg"
import { useCart } from "../../context/CartContext"
import { useNotice } from "../../context/NoticeContext"
import { preloadMotion } from "../../utils/motion"
import PillNotice from "./PillNotice"
import { toast } from "../../utils/toast"
import { TextRoll } from "./TextRoll"


const Navbar = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const { isAuthenticated, dispatch, user } = useAuth()
	const { notify, setPillAvailable } = useNotice()
	const pillRef = useRef(null)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchActive, setSearchActive] = useState(false)
	const { products } = useCart()
	const navigate = useNavigate()
	const queryParams = useParams()
	const query = Object.values(queryParams)[0].split('/')
	const [searchText, setSearchText] = useState("")
	useEffect(() => {
		if (query[0] === "find") {
			setSearchText(query[1])
		}
	}, [queryParams])


	const navItems = [
		{
			title: "Home",
			navigateTo: "/"
		},
		{
			title: "Men",
			navigateTo: "/men"
		},
		{
			title: "Women",
			navigateTo: "/women"
		},
		{
			title: "Kids",
			navigateTo: "/kids"
		},
	]

	const UserIcon = (props) => <Icon component={Svg.userSvg} {...props} />
	const UserAvatar = () => {
		if (!user?.profileImage) return <UserIcon className="icon" />

		return (
			<img
				src={user.profileImage}
				alt={`${user.name} profile`}
				className="rounded-circle object-fit-cover"
				style={{ width: 30, height: 30, padding: 2, backgroundColor: "#f1f3f5" }}
			/>
		)
	}

	const unauthorizedItems = [
		{
			key: "login",
			label: <Link to="/auth/login" className="text-decoration-none">Login</Link>,
		},
		{
			key: "register",
			label: <Link to="/auth/register" className="text-decoration-none">Register</Link>,
		},
		{
			type: "divider",
		},
		{
			key: "helpCenter",
			label: <Link to="/help" className="text-decoration-none">Help Center</Link>,
		},
	]
	const authorizedItems = [
		{
			key: "profile",
			label: <Link to="/profile" className="text-decoration-none">Profile</Link>,
		},
		innerWidth <= 1024 && {
			key: "orders",
			label: <Link to="/orders" className="text-decoration-none">Orders</Link>,
		},
		user?.type === "admin" && {
			key: "dashboard",
			label: <Link to="/dashboard/products" className="text-decoration-none">Dashboard</Link>,
		},
		{
			key: "helpCenter",
			label: <Link to="/help" className="text-decoration-none">Help Center</Link>,
		},
		{
			type: "divider",
		},
		{
			key: "logoutButton",
			label: (
				<Button
					type="primary"
					block
					className="bg-black"
					onClick={() => handleLogout()}
				>
					Logout
				</Button>
			),
		},
	]
	const items = isAuthenticated ? authorizedItems : unauthorizedItems

	const DropMenu = () => {
		return <Suspense fallback={<p>Loading...</p>}>
			<Dropdown
				menu={{ items }}
				trigger={["click"]}
				placement="bottomRight"
				className="p-2"
				overlayClassName="dropdown-custom-width"
			>
				<div className="auth">
					<MenuOutlined className="icon" />
					<UserAvatar />
				</div>
			</Dropdown>
		</Suspense>
	}

	const DrawerFooter = () => {
		const currentHour = new Date().getHours();
		const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
		return <>
			{
				user ?
					<Suspense fallback={<p>Loading...</p>}>
						<Dropdown
							menu={{ items }}
							trigger={["click"]}
							className="p-2"
						>
							<div className="d-flex align-items-center justify-content-between">
								<p className="m-0">{greeting}! <span className="fw-bold">{user?.name}</span></p>
								<UserAvatar />
							</div>
						</Dropdown>
					</Suspense>
					: <Button className="btn-filled w-100" onClick={() => navigate("/auth/login")}>Login</Button>
			}
		</>
	}

	const ModalFooter = () => {
		return <>
			<Button className="btn-filled" onClick={handleSearch_mb}>Search</Button>
		</>
	}

	const PreSearch = () => {
		const list = ["Air Force", "Air Jordan", "Air Max"]
		return <>
			<h5 className="text-black-50">Popular Search Terms</h5>
			{
				list.map((item, index) => {
					return <p className="fs-5 m-0" key={index} onClick={() => setSearchText(item)}>{item}</p>
				})
			}
		</>
	}

	const handleLogout = async () => {
		// Read the name before the dispatch clears the session, so the farewell
		// can carry it.
		const firstName = user?.name?.trim()?.split(/\s+/)?.[0]
		try {
			await AuthServices.logoutUser()
			dispatch({ type: "LOGOUT" })
			notify(firstName ? `Goodbye, ${firstName}!` : "Goodbye!", { type: "farewell", emoji: "\u{1F44B}" })
		} catch (error) {
			toast.error("Failed to log out!")
		}
	}

	const handleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
	const handleResize = () => {
		setInnerWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Notices only play where the pill exists, which is the same breakpoint the
	// desktop nav links use. On mobile they come through as a toast instead.
	const hasPill = innerWidth > 768
	useEffect(() => {
		setPillAvailable(hasPill)
		return () => setPillAvailable(false)
	}, [hasPill, setPillAvailable])

	// Fetch framer-motion while the page is quiet, so the first notice does not
	// wait on a network round trip.
	useEffect(() => {
		if (hasPill) preloadMotion()
	}, [hasPill])

	// search
	const handleSearch = () => {
		if (!searchActive) {
			setSearchActive(true)
			document.body.style.overflow = "hidden"
		} else {
			closeCustomDrawer()
			addToHistory(searchText)
			navigate(`find/${searchText}`)
		}
	}
	const closeCustomDrawer = () => {
		setSearchActive(false)
		document.body.removeAttribute("style")
	}
	const handleSearch_mb = () => {
		setIsModalOpen(false)
		navigate(`find/${searchText}`)
	}
	const handleChange = (e) => {
		setSearchText(e.target.value)
	}


	return (
		<>
			<header className="px-3 px-md-5">
				<div className="nav">
					<div className="logo col-1">
						<NavLink to="/">
							<img src={Logo} alt="Winter Store" className="img-fluid" />
						</NavLink>
					</div>
					{/* ////////////////////DESKTOP VIEW ///////////////////////////////// */}
					{
						innerWidth > 768 && <>
							<div className="nav-links" ref={pillRef}>
								{
									navItems.map((item, index) => (
										<div className="d-flex align-items-center pill-nav-item" key={index}>
											<NavLink
												to={item.navigateTo}
												className={({ isActive }) =>
													isActive ? "active link" : "inactive link"
												}
											>
												<TextRoll>{item.title}</TextRoll>
											</NavLink>
											<span className="divider"></span>
										</div>
									))
								}
								<Input placeholder="Search" size="large" className={`search-bar ${searchActive && "active"}`} onChange={e => handleChange(e)} value={searchText} onPressEnter={() => handleSearch()} allowClear />
								<div className="icon" onClick={() => handleSearch()}>
									<div>
										<SearchOutlined className="search" />
									</div>
								</div>
								<PillNotice scopeRef={pillRef} />
							</div>
							<div className="notFrontend d-flex align-items-center gap-1">
								<Button className="py-3 icons-container" onClick={() => navigate("/favorite")}>
									<HeartOutlined className="icon" />
								</Button>
								<Button className="py-3 icons-container" onClick={() => navigate("/cart")}>
									<Badge count={products.length} color="#111">
										<ShoppingCartOutlined className="icon" />
									</Badge>
								</Button>
								{
									innerWidth > 1024 && <Button className="py-3 icons-container" onClick={() => navigate("/orders")}>
										<ShoppingOutlined className="icon" />
									</Button>
								}
								<DropMenu />
							</div>
						</>
					}
					{/* ////////////////////MOBILE VIEW ////////////////////////// */}
					{
						innerWidth <= 768 && <div className="d-flex align-items-center gap-2">
							<Button className="py-3 icons-container" onClick={() => navigate("/cart")}>
								<Badge count={products.length} color="#111">
									<ShoppingCartOutlined className="icon" />
								</Badge>
							</Button>

							<SearchOutlined className="searchIcon" onClick={() => setIsModalOpen(true)} />
							<Modal title="Search" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={<ModalFooter />}>
								<Input placeholder="Search" size="large" className="mb-2" onChange={e => handleChange(e)} value={searchText} allowClear />
								<PreSearch />
							</Modal>

							<MenuOutlined className="hamburger" onClick={handleDrawer} />
							<Drawer placement="right" onClose={handleDrawer} open={isDrawerOpen} footer={<DrawerFooter />} footerStyle={{ boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.05)' }}>
								<>
									<div className="mobileMenu d-flex flex-column mb-5">
										{navItems.map((item, index) => {
											return <NavLink
												onClick={() => setIsDrawerOpen(false)}
												to={item.navigateTo}
												className={({ isActive }) => isActive ? "active link" : "inactive link"}
												key={index}
											>
												<div className="d-flex fw-semibold justify-content-between align-items-center">
													<p className="m-0 fs-3">{item.title}</p>
													<RightOutlined />
												</div>
											</NavLink>
										})}
									</div>
									<div className="d-flex flex-column gap-2 mobileSubMenu">
										<NavLink
											onClick={() => setIsDrawerOpen(false)}
											to={"/favorite"}
											className={({ isActive }) => isActive ? "active link" : "inactive link"}
										>
											<div className="d-flex gap-3 fw-semibold align-items-center">
												<HeartOutlined className="icon" />
												<p className="m-0 fs-5">Favorite</p>
											</div>
										</NavLink>
										<NavLink
											onClick={() => setIsDrawerOpen(false)}
											to={"/orders"}
											className={({ isActive }) => isActive ? "active link" : "inactive link"}
										>
											<div className="d-flex gap-3 fw-semibold align-items-center">
												<ShoppingOutlined className="icon" />
												<p className="m-0 fs-5">Orders</p>
											</div>
										</NavLink>
									</div>
								</>
							</Drawer>
						</div>
					}
				</div>
			</header>
			{/* ////////Part to desktop view //////////// */}
			{
				innerWidth > 768 ? <>
					<div className={`overlay ${searchActive && "active"}`} onClick={() => closeCustomDrawer()}></div>
					<div className={`pre-search d-flex justify-content-center ${searchActive && "active"}`}>
						<div className="py-4 col-6 col-lg-5 col-xl-3">
							<PreSearch />
						</div>
					</div>
				</> : null
			}
		</>
	)
}

export default Navbar
