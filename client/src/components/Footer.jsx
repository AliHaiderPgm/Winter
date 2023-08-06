import React from "react"
import logo from "../assets/logo.png"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"

export default function Footer() {
	const year = new Date().getFullYear()
	return (
		<div className="container-fluid text-light footer-wrapper">
			<div className="container p-5">
				<div className="row gap-2">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<img
									src={logo}
									alt="E-store logo"
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
									<u>alihaider@gmail.com</u>
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
									<li>About</li>
									<li>Contact</li>
									<li>Graph</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-3">
						<div className="row gap-3">
							<div className="col-12">
								<h3 className="fw-bold">Newletter</h3>
							</div>
							<div className="col-12">
								<input type="text" className="form-control" />
							</div>
							<div className="col-12">
								<ul className="navbar-nav flex-row gap-3">
									<li>
										<BsFacebook className="fs-2" />
									</li>
									<li>
										<BsTwitter className="fs-2" />
									</li>
									<li>
										<BsInstagram className="fs-2" />
									</li>
									<li>
										<BsGithub className="fs-2" />
									</li>
								</ul>
							</div>
						</div>
					</div>
					<hr />
					<p className="text-muted text-center">
						&#169; All Rights Reserved {year}.
					</p>
				</div>
			</div>
		</div>
	)
}
