import Men from "../../assets/men.jpg"
import Women from "../../assets/women.jpg"
import Kids from "../../assets/child.jpg"
import { useNavigate } from "react-router-dom"
import { ArrowUpOutlined } from "@ant-design/icons"
const CatalogSection = () => {
	const navigate = useNavigate()
	const handleNavigate = (type) => {
		let val;
		type === "Men" ? val = "Male" : type === "Women" ? val = "Female" : val = "Children"
		navigate(`/${val}`)
	}
	const Types = ["Men", "Women", "Kids"]
	const Card = (props) => {
		const type = props.type
		let img;
		type === "Men" ? img = Men : type === "Women" ? img = Women : img = Kids
		return <>
			<div className="myCard" onClick={() => handleNavigate(type)} >
				<img
					src={img}
					alt={`${type} Catalog winter`}
					className="img-fluid object-fit-cover rounded"
				/>
				<h1>{type}</h1>
				<ArrowUpOutlined className="arrow" />
			</div>
		</>
	}
	return (
		<div className="catalog d-flex flex-column my-5 gap-2 mx-5">
			<h2 className="text-center fw-bold">Catalog</h2>
			<div className="row gap-3 gap-md-1 justify-content-center">
				{
					Types.map((type, index) => {
						return <div className="col-12 col-sm-4 col-md-3 flex-fill" key={index}>
							<Card type={type} />
						</div>
					})
				}
			</div>
		</div>
	)
}
export default CatalogSection