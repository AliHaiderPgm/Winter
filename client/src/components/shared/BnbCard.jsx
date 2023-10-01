import { Carousel } from "antd"
import Image1 from "../../assets/test-1.jpg"
import Image2 from "../../assets/test-2.jpg"
import Image3 from "../../assets/test-3.jpg"
import {
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
	StarRate,
} from "@mui/icons-material"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { slugify } from "../../global"
const BnbCard = ({ data }) => {
	const carousel = useRef()
	const navigate = useNavigate()
	const handleNavigate = () => {
		const shoefor = slugify(data.shoefor)
		const name = slugify(data.name)
		const id = slugify(data._id)
		navigate(`/${shoefor}/${name}/${id}`)
	}
	return (
		<div className="card-content-wrapper" onClick={() => handleNavigate()}>
			<div className="carousel">
				{
					data?.images.length === 1 ? null : <div className="card-controller">
						<KeyboardArrowLeftOutlined
							className="icon"
							onClick={() => {
								carousel.current.prev()
							}}
						/>
						<KeyboardArrowRightOutlined
							className="icon"
							onClick={() => {
								carousel.current.next()
							}}
						/>
					</div>
				}
				<Carousel ref={carousel} dots={false}>
					{
						data?.images.map((imageUrl, index) => {
							return <div key={index}>
								<img src={imageUrl} className="img-fluid" />
							</div>
						})
					}
				</Carousel>
			</div>
			<div className="content">
				<div>
					<h1>{data?.name}</h1>
					<div>
						<StarRate className="icon" />
						<p>{data?.rating}</p>
					</div>
				</div>
				<p>Category Type</p>
				<p>
					Rs<span>{data?.price}</span>
				</p>
			</div>
		</div>
	)
}

export default BnbCard
