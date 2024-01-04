import { Card } from "antd"
import { useEffect, useState } from "react";
import PlaceHolder from "../../assets/placeholder.png"

const { Meta } = Card
const CustomCard = ({ data }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = data.images[0]
		img.onload = () => {
			setImageLoaded(true)
			setIsLoading(false)
		}
	}, [data])

	return (
		<Card
			hoverable
			loading={isLoading}
			cover={
				imageLoaded ?
					<img alt="Product Image" src={data.images[0]} style={{ height: "200px", objectFit: "cover" }} />
					:
					<img alt="Product Image" src={PlaceHolder} style={{ height: "200px", objectFit: "cover" }} />
			}
		>
			<Meta title={data.name} description={`Rs.${data.price}`} />
		</Card>
	)
}
export default CustomCard
