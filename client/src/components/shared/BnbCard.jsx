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
const BnbCard = () => {
	const carousel = useRef()
	return (
		<div className="card-content-wrapper">
			<div className="carousel">
				<div className="card-controller">
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
				<Carousel ref={carousel} dots={false}>
					<div>
						<img src={Image1} className="img-fluid" />
					</div>
					<div>
						<img src={Image2} className="img-fluid" />
					</div>
					<div>
						<img src={Image3} className="img-fluid" />
					</div>
				</Carousel>
			</div>
			<div className="content">
				<div>
					<h1>Nike Air</h1>
					<div>
						<StarRate className="icon" />
						<p>4.5</p>
					</div>
				</div>
				<p>Category Type</p>
				<p>
					Rs<span>288</span>
				</p>
			</div>
		</div>
	)
}

export default BnbCard
