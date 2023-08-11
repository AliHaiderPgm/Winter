import { Link, NavLink, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import {
	CloseOutlined,
	MenuOutlined,
	SearchOutlined,
} from "@mui/icons-material"
import { Icon } from "@mui/material"
import { Dropdown } from "antd"
import { useEffect, useState } from "react"
const Navbar = () => {
	const [isActive, setIsActive] = useState(false)
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const navigate = useNavigate()
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

	const items = [
		{
			key: "0",
			label: <Link to="/auth/login">Login</Link>,
		},
		{
			key: "1",
			label: <Link to="/auth/register">Register</Link>,
		},
		{
			type: "divider",
		},
		{
			key: "3",
			label: "Help Center",
		},
	]

	const handleSideBar = () => {
		setIsActive(!isActive)
	}
	// check window inner width
	const handleResize = () => {
		setInnerWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])
	return (
		<>
			<header>
				<div className="nav">
					<div className="logo">
						<NavLink to="/">
							<img src={Logo} alt="Winter Store" className="img-fluid" />
						</NavLink>
					</div>
					<div className={isActive ? "nav-links active" : "nav-links"}>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "active link" : "inactive link"
							}
						>
							Home
						</NavLink>
						<span className="divider"></span>
						<NavLink
							to="/about"
							className={({ isActive }) =>
								isActive ? "active link" : "inactive link"
							}
						>
							About
						</NavLink>
						<span className="divider"></span>
						<NavLink
							to="/contact"
							className={({ isActive }) =>
								isActive ? "active link" : "inactive link"
							}
						>
							Contact
						</NavLink>
						<div className="icon" onClick={() => navigate("/search")}>
							<div>
								<SearchOutlined className="search" />
							</div>
						</div>
					</div>
					<div className={isActive ? "notFrontend active" : "notFrontend"}>
						<Link to="/dashboard" className="link">
							Dashboard
						</Link>

						<Dropdown
							menu={{
								items,
							}}
							trigger={["click"]}
							placement={innerWidth <= 768 ? "bottom" : "bottomRight"}
						>
							<div className={isActive ? "auth active" : "auth"}>
								<MenuOutlined className="icon" />
								<UserIcon className="icon" />
							</div>
						</Dropdown>
					</div>
					<div className="hamburger" onClick={handleSideBar}>
						{isActive ? (
							<CloseOutlined className="icon" />
						) : (
							<MenuOutlined className="icon" />
						)}
					</div>
				</div>
			</header>
			<div className={isActive ? "mb-res active" : "mb-res"}></div>
		</>
	)
}

export default Navbar
