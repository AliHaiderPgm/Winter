import { Carousel } from "antd"
import Nike1 from "../../assets/nike-1.jpg"
import Nike2 from "../../assets/nike-2.jpg"
import Puma from "../../assets/puma-1.jpg"
import Martin from "../../assets/martin.jpg"
const AboutSection = () => {
	return (
		<div className="about-section my-1 my-md-3">
			<div className="content">
				<p>About</p>
				<h1>
					We create <span>incredible</span> products
				</h1>
				<p>
					Our passion for quality craftsmanship and cutting-edge design drives
					us to curate a diverse range of sneakers that effortlessly blend style
					and performance.{" "}
				</p>
				<button>About us</button>
			</div>
			<div className="carousal-container">
				<Carousel
					effect="fade"
					autoplay
					autoplaySpeed={8000}
					dots={false}
					className="w-25"
				>
					<div className="carousel-card">
						<img src={Nike1} alt="Nike" className="img-fluid" />
						<div className="carousel-content">
							<h3>Nike</h3>
							<p>
								Nike, Inc. is an American athletic footwear and apparel
								corporation headquartered near Beaverton, Oregon, United States.
							</p>
						</div>
					</div>
					<div className="carousel-card">
						<img src={Nike2} alt="Nike" className="img-fluid" />
						<div className="carousel-content">
							<h3>Nike</h3>
							<p>
								It is the world largest supplier of athletic shoes and apparel
								and a major manufacturer of sports equipment, with revenue in
								excess of US$46 billion in its fiscal year 2022.
							</p>
						</div>
					</div>
					<div className="carousel-card">
						<img src={Puma} alt="Puma" className="img-fluid" />
						<div className="carousel-content">
							<h3>Puma</h3>
							<p>
								Run The Streets. Do You. Research and shop all the latest gear
								from the world of Fashion, Sport, and everywhere in between.
							</p>
						</div>
					</div>
					<div className="carousel-card">
						<img src={Martin} alt="Martin" className="img-fluid" />
						<div className="carousel-content">
							<h3>Adidas</h3>
							<p>
								Adidas AG is a German athletic apparel and footwear corporation
								headquartered in Herzogenaurach, Bavaria, Germany.
							</p>
						</div>
					</div>
				</Carousel>
			</div>
		</div>
	)
}

export default AboutSection
