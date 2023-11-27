import React, { Suspense, useEffect, useMemo, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import Icon, {
	MenuOutlined,
	SearchOutlined,
} from "@ant-design/icons"
import { Button, Drawer, Input, Modal, message } from "antd"
const Dropdown = React.lazy(() => import('antd').then(module => ({ default: module.Dropdown })));
import { useAuth } from "../../context/AuthContext"
import AuthServices from "../../context/AuthServices"

const Navbar = () => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const { isAuthenticated, dispatch, user, loading } = useAuth()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchActive, setSearchActive] = useState(false)
	const [searchText, setSearchText] = useState("")
	const navigate = useNavigate()

	const navItems = [
		{
			title: "Home",
			navigateTo: "/"
		},
		{
			title: "Men",
			navigateTo: "/Male"
		},
		{
			title: "Women",
			navigateTo: "/Female"
		},
		{
			title: "Kids",
			navigateTo: "/Children"
		},
	]
	const userSvg = () => (
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="20.000000pt"
			height="20.000000pt"
			viewBox="0 0 512.000000 512.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
				fill="#000000"
				stroke="none"
			>
				<path
					d="M2330 5114 c-92 -9 -298 -45 -395 -70 -447 -112 -853 -344 -1184
-675 -331 -331 -563 -737 -675 -1184 -57 -227 -70 -340 -70 -620 -1 -278 8
-365 59 -582 219 -933 938 -1669 1860 -1903 248 -63 353 -75 645 -74 286 0
398 14 647 79 839 220 1507 856 1782 1695 38 118 76 277 98 418 28 169 25 584
-5 757 -81 471 -256 861 -547 1223 -289 358 -716 656 -1155 805 -273 93 -479
128 -785 132 -126 1 -250 1 -275 -1z m370 -949 c385 -58 696 -351 775 -731 21
-100 21 -285 1 -382 -67 -314 -303 -584 -602 -687 -208 -72 -420 -72 -628 0
-306 106 -550 391 -603 705 -19 113 -18 267 2 364 78 375 389 672 765 731 114
18 176 18 290 0z m-637 -1915 c142 -71 343 -120 497 -120 154 0 355 49 499
121 l81 40 53 -17 c143 -46 348 -158 496 -270 297 -223 537 -556 650 -903 l31
-93 -56 -64 c-97 -110 -261 -251 -414 -356 -314 -215 -679 -351 -1065 -399
-128 -15 -420 -15 -550 0 -383 47 -753 185 -1065 399 -153 105 -317 246 -414
357 l-56 63 36 104 c167 483 511 870 970 1090 92 44 196 85 218 87 5 1 45 -17
89 -39z"
				/>
			</g>
		</svg>
	)
	const UserIcon = (props) => <Icon component={userSvg} {...props} />

	const unauthorizedItems = [
		{
			key: "0",
			label: <Link to="/auth/login" className="text-decoration-none">Login</Link>,
		},
		{
			key: "1",
			label: <Link to="/auth/register" className="text-decoration-none">Register</Link>,
		},
		{
			type: "divider",
		},
		{
			key: "3",
			label: "Help Center",
		},
	]
	const authorizedItems = [
		{
			key: "0",
			label: <Link to="/" className="text-decoration-none">Profile</Link>,
		},
		user?.type === "admin" && {
			key: "1",
			label: <Link to="/dashboard/products" className="text-decoration-none">Dashboard</Link>,
		},
		{
			key: "2",
			label: "Help Center",
		},
		{
			type: "divider",
		},
		{
			key: "3",
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
					<UserIcon className="icon" />
				</div>
			</Dropdown>
		</Suspense>
	}

	const DrawerFooter = () => {
		const currentHour = new Date().getHours();
		const greeting =
			currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
		return <Suspense fallback={<p>Loading...</p>}>
			{
				user ? <Dropdown
					menu={{ items }}
					trigger={["click"]}
					className="p-2"
					arrow
					placement="topRight"
				>
					<div className="d-flex align-items-center justify-content-between">
						<p className="m-0">{greeting}! <span className="fw-bold">{user?.name}</span></p>
						<UserIcon className="icon" />
					</div>
				</Dropdown>
					: <Button className="btn-filled w-100" onClick={() => navigate("/auth/login")}>Login</Button>
			}
		</Suspense>
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
		try {
			await AuthServices.logoutUser()
			dispatch({ type: "LOGOUT" })
			message.success("Logged out!")
		} catch (error) {
			console.log(error)
			message.error("Failed to log out!")
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

	// search
	const handleSearch = () => {
		if (!searchActive) {
			setSearchActive(true)
		} else {
			setSearchActive(false)
			navigate(`find/${searchText}`)
		}
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
			<header className="px-3 px-md-5 position-relative z-3">
				<div className="nav">
					<div className="logo">
						<NavLink to="/">
							<img src={Logo} alt="Winter Store" className="img-fluid" />
						</NavLink>
					</div>
					{
						innerWidth > 768 && <>
							<div className="nav-links">
								{
									navItems.map((item, index) => {
										return <div className="d-flex align-items-center" key={index}>
											<NavLink
												to={item.navigateTo}
												className={({ isActive }) =>
													isActive ? "active link" : "inactive link"
												}
											>
												{item.title}
											</NavLink>
											<span className="divider"></span>
										</div>
									})
								}
								<Input placeholder="Search" size="large" className={`search-bar ${searchActive && "active"}`} onChange={e => handleChange(e)} value={searchText} onPressEnter={() => handleSearch()} />
								<div className="icon" onClick={() => handleSearch()}>
									<div>
										<SearchOutlined className="search" />
									</div>
								</div>
							</div>
							<div className="notFrontend">
								<DropMenu />
							</div>
						</>
					}
					{
						innerWidth <= 768 && <div className="d-flex align-items-center gap-2">
							<SearchOutlined className="searchIcon" onClick={() => setIsModalOpen(true)} />
							<Modal title="Search" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={<ModalFooter />}>
								<Input placeholder="Search" size="large" className="mb-2" onChange={e => handleChange(e)} value={searchText} allowClear />
								<PreSearch />
							</Modal>

							<MenuOutlined className="hamburger" onClick={handleDrawer} />
							<Drawer placement="right" onClose={handleDrawer} open={isDrawerOpen} footer={<DrawerFooter />} footerStyle={{ boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.05)' }}>
								<div className="mobileMenu d-flex flex-column">
									{navItems.map((item, index) => {
										return <NavLink
											onClick={() => setIsDrawerOpen(false)}
											to={item.navigateTo}
											className={({ isActive }) => isActive ? "active link" : "inactive link"}
											key={index}
										>
											{item.title}
										</NavLink>
									})}
								</div>
							</Drawer>
						</div>
					}
				</div>
			</header>
			{
				innerWidth > 768 ? <>
					<div className={`overlay ${searchActive && "active"}`} onClick={() => setSearchActive(false)}></div>
					<div className={`pre-search d-flex justify-content-center ${searchActive && "active"}`}>
						<div className="py-4">
							<PreSearch />
						</div>
					</div>
				</> : null
			}
		</>
	)
}

export default Navbar
