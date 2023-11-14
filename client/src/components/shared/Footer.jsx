import { Button } from "antd"
import logo from "../../assets/logo.png"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"

export default function Footer() {
	const year = new Date().getFullYear()
	return (
		<div className="container-fluid text-light footer-wrapper">
			<div className="container p-5">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<img
									src={logo}
									alt="Winter logo"
									className="img-fluid"
									loading="lazy"
								/>
							</div>
							<div className="col-12">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
									culpa impedit fugit vel autem veritatis commodi esse qui.
									Iure, corporis.
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<h3 className="fw-bold">Office</h3>
							</div>
							<div className="col-12">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Beatae, facilis! Quo quisquam
								</p>
							</div>
							<div className="col-12">
								<p>
									<u>admin@winter.com</u>
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<h3 className="fw-bold">Links</h3>
							</div>
							<div className="col-12">
								<ul className="navbar-nav">
									<li>Home</li>
									<li>Men</li>
									<li>Women</li>
									<li>Kids</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<h3 className="fw-bold p-0">Newsletter</h3>
						<input type="text" className="form-control" />
						<Button className="mt-2">Subscribe</Button>
					</div>
					<hr className="my-3" />
					<div className="d-flex flex-column gap-2 justify-content-between align-items-center mt-1">
						<p className="text-center m-0">
							&#169; All Rights Reserved {year}.
						</p>
						<ul className="navbar-nav flex-row gap-3 text-light-emphasis ">
							<li>
								<BsFacebook className="fs-4" />
							</li>
							<li>
								<BsTwitter className="fs-4" />
							</li>
							<li>
								<BsInstagram className="fs-4" />
							</li>
							<li>
								<BsGithub className="fs-4" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
