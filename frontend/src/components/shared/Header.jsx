import HeroImage from "../../assets/hero-section.jpg"
const Header = () => {
	return (
		<div className="header">
			<img src={HeroImage} alt="Winter Store" className="img-fluid" />
			<div className="content">
				<div className="wrapper">
					<h1>Winter2.0</h1>
					<h2>Find Your Perfect Shoes</h2>
					<button>Shop Now</button>
				</div>
			</div>
		</div>
	)
}

export default Header
