import Men from "../../assets/men.jpg"
import Women from "../../assets/women.jpg"
import Child from "../../assets/child.png"
import { ArrowUpwardOutlined } from "@mui/icons-material"
const Catalog = () => {
	return (
		<div className="container-fluid catalog">
			<div className="container d-flex flex-column my-5 gap-2">
				<h2 className="text-center fw-bold">Catalog</h2>
				<div className="row justify-content-center">
					<div className="myCard">
						<img
							src={Men}
							alt="Men Catalog winter"
							className="men img-fluid object-fit-cover rounded"
						/>
						<h1>Men</h1>
						<ArrowUpwardOutlined className="arrow" />
					</div>
					<div className="myCard">
						<img
							src={Women}
							alt="Women Catalog winter"
							className="women img-fluid object-fit-cover rounded"
						/>
						<h1>Women</h1>
						<ArrowUpwardOutlined className="arrow" />
					</div>
					<div className="myCard">
						<img
							src={Child}
							alt="Child Catalog winter"
							className="child img-fluid object-fit-cover rounded"
						/>
						<h1>Child</h1>
						<ArrowUpwardOutlined className="arrow" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Catalog