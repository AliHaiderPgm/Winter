import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Header from "../../components/Header"
import { BsCart, BsClock, BsCreditCard, BsTruck } from "react-icons/bs"
import brand1 from "../../assets/brand1.png"
import brand2 from "../../assets/brand2.png"
import brand3 from "../../assets/brand3.png"
import brand4 from "../../assets/brand4.png"
import brand5 from "../../assets/brand5.png"

const Home = () => {
	const navigate = useNavigate()
	const { user, dispatch } = useAuth()

	return (
		<>
			<Header title="E-Store" />
			{/* Services */}
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
			{/* Trusted Section */}
			<div className="container-fluid bg-white py-5">
				<div className="container">
					<h3 className="fw-bold text-center my-4">Trusted by 1000+ Brands</h3>
					<div className="row gap-0 gap-md-2 brandSection justify-content-between">
						<div className="col-6 col-md-2">
							<img src={brand1} alt="BMW Logo" className="img-fluid" />
						</div>
						<div className="col-6 col-md-2">
							<img src={brand2} alt="Disney Logo" className="img-fluid" />
						</div>
						<div className="col-6 col-md-2">
							<img src={brand3} alt="Nestle" className="img-fluid" />
						</div>
						<div className="col-6 col-md-2">
							<img src={brand4} alt="Fanta" className="img-fluid" />
						</div>
						<div className="col-6 offset-3 offset-md-0 col-md-2">
							<img src={brand5} alt="Land Rover" className="img-fluid" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
