import { BsCart, BsClock, BsCreditCard, BsTruck } from "react-icons/bs"

const Services = () => {
	return (
		<div className="container-fluid">
			<h4 className="fw-bold text-center py-3 m-0">Our Services</h4>
			<div className="container py-3">
				<div className="row gap-2 gap-md-5 justify-content-center">
					<div className="col-12 col-md-3 bg-primaryColorLight rounded d-flex align-items-center gap-3 px-4 py-4 py-md-0">
						<BsTruck className="fs-2" />
						<h6 className="p-0 m-0">Fast and Free Delivery</h6>
					</div>

					<div className="col-12 col-md-3">
						<div className="row py-4 px-3 bg-primaryColorLight rounded mb-2 mb-md-4">
							<div className="col-12 d-flex align-items-center gap-3">
								<BsClock className="fs-2" />
								<h6 className="p-0 m-0">24/7 Customer Service</h6>
							</div>
						</div>
						<div className="row py-4 px-3 bg-primaryColorLight rounded">
							<div className="col-12 d-flex align-items-center gap-3">
								<BsCreditCard className="fs-2" />
								<h6 className="p-0 m-0">Pay online</h6>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-3 px-4 bg-primaryColorLight rounded d-flex align-items-center gap-3 py-4 py-md-0">
						<BsCart className="fs-2" />
						<h6 className="p-0 m-0">Variety of Products</h6>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Services
