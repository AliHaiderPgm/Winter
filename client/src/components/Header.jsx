import { Button } from "@mui/material"
import React from "react"
import bg from "../assets/bg.png"
import airPods from "../assets/pods.png"
import headPhone from "../assets/headphone.png"
import headSet from "../assets/headSet.png"
import buds from "../assets/buds.png"
export default function Header(props) {
	return (
		<div className="container my-4">
			<div className="row flex-column-reverse flex-sm-row">
				<div className="col-12 col-sm-5 pt-0 pt-sm-5">
					<div className="content pt-0 pt-sm-3 pt-lg-5">
						<p className="fs-5 m-0 text-muted">Welcome to</p>
						<h1 className="fs-1 fw-bold m-0">{props.title}</h1>
						<p className="text-muted">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
							quis modi, necessitatibus unde voluptatibus dicta!
						</p>
						<Button className="text-light px-3 py-2" variant="contained">
							Explore
						</Button>
					</div>
				</div>
				<div className="col-12 col-sm-7">
					<div className="cardContainer position-relative">
						<img src={bg} alt="bg" className="img-fluid coverImg" />
						<div className="smallCard">
							<img src={airPods} alt="Airpods" className="img-fluid" />
							<div className="contentWrapper">
								<p className="fw-bold m-0 p-0">Air Pods</p>
								<p className="text-muted m-0 p-0">Apple air pods</p>
								<p className="m-0 p-0">$50</p>
							</div>
						</div>
						<div className="smallCard">
							<img src={headPhone} alt="headPhone" className="img-fluid" />
							<div className="contentWrapper">
								<p className="fw-bold m-0 p-0">Head Set</p>
								<p className="text-muted m-0 p-0">Audionic M543</p>
								<p className="m-0 p-0">$35</p>
							</div>
						</div>
						<div className="smallCard">
							<img src={headSet} alt="headSet" className="img-fluid" />
							<div className="contentWrapper">
								<p className="fw-bold m-0 p-0">Head Set</p>
								<p className="text-muted m-0 p-0">Apple Head Set</p>
								<p className="m-0 p-0">$100</p>
							</div>
						</div>
						<div className="smallCard">
							<img src={buds} alt="buds" className="img-fluid" />
							<div className="contentWrapper">
								<p className="fw-bold m-0 p-0">Buds</p>
								<p className="text-muted m-0 p-0">Apple buds</p>
								<p className="m-0 p-0">$40</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
