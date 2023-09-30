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
const BnbCard = ({ data }) => {
	const carousel = useRef()
	return (
		<div className="card-content-wrapper">
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
