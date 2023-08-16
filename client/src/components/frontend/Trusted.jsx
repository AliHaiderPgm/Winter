import brand1 from "../../assets/brand1.jpg"
import brand2 from "../../assets/brand2.jpg"
import brand3 from "../../assets/brand3.jpeg"
import brand4 from "../../assets/brand4.png"
import brand5 from "../../assets/brand5.jpg"
const Trusted = () => {
	return (
		<div className="container-fluid bg-white py-5 trusted">
			<div className="container">
				<h3 className="fw-bold text-center my-4">Trusted by 1000+ Brands</h3>
				<div className="row gap-0 gap-md-2 brandSection justify-content-between">
					<div className="col-6 col-md-2">
						<img src={brand1} alt="Nike" className="img-fluid" />
					</div>
					<div className="col-6 col-md-2">
						<img src={brand2} alt="Adidas" className="img-fluid" />
					</div>
					<div className="col-6 col-md-2">
						<img src={brand3} alt="Bata" className="img-fluid" />
					</div>
					<div className="col-6 col-md-2">
						<img src={brand4} alt="Hush Puppies" className="img-fluid" />
					</div>
					<div className="col-6 offset-3 offset-md-0 col-md-2">
						<img src={brand5} alt="Puma" className="img-fluid" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Trusted
