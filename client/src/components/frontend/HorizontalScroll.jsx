import {
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
} from "@mui/icons-material"
import BnbCard from "../shared/BnbCard"
import { useRef } from "react"
import BnbCardLoading from "../shared/BnbCardLoading"
const HorizontalScroll = (props) => {
	const loading = props.loading
	const scroll = useRef()
	const scrollRight = () => {
		if (scroll.current) {
			const totalWidth = scroll.current.scrollWidth
			const containerWidth = scroll.current.clientWidth
			const maxScroll = totalWidth - containerWidth

			scroll.current.scrollLeft += 900

			// Check if scroll position is at the end
			if (Math.ceil(scroll.current.scrollLeft) >= maxScroll) {
				scroll.current.scrollLeft = 0
			}
		}
	}
	const scrollLeft = () => {
		if (scroll.current) {
			scroll.current.scrollLeft -= 900

			if (scroll.current.scrollLeft <= 0) {
				const totalWidth = scroll.current.scrollWidth
				scroll.current.scrollLeft = totalWidth
			}
		}
	}
	return (
		<div className="horizontal-scroll position-relative">
			<div className="controller">
				<KeyboardArrowLeftOutlined className="icon" onClick={scrollLeft} />
				<KeyboardArrowRightOutlined className="icon" onClick={scrollRight} />
			</div>
			<div className="cards-container" ref={scroll}>
				{
					loading ? Array.from({ length: 6 }, (_, index) => {
						return <BnbCardLoading key={index} />
					})
						: props.products.map((product, index) => {
							return <BnbCard data={product} key={index} />
						})
				}
			</div>
		</div>
	)
}
export default HorizontalScroll
