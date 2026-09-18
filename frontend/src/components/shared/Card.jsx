import { Card } from "antd"
import { useEffect, useState } from "react";
import PlaceHolder from "../../assets/placeholder.png"
import { preloadImage, isImageCached } from "../../utils/imageCache"

const { Meta } = Card
const CustomCard = ({ data }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		let isMounted = true
		if (!data?.images?.[0]) return
		preloadImage(data.images[0])
			.then(() => {
				if (!isMounted) return
				setImageLoaded(isImageCached(data.images[0]))
				setIsLoading(false)
			})
			.catch(() => {
				if (!isMounted) return
				setIsLoading(false)
			})
		return () => { isMounted = false }
	}, [data])

	return (
		<Card
			hoverable
			loading={isLoading}
			cover={
				imageLoaded ?
					<img alt="Product Image" src={data.images[0]} loading="lazy" decoding="async" style={{ height: "200px", objectFit: "cover" }} />
					:
					<img alt="Product Image" src={PlaceHolder} style={{ height: "200px", objectFit: "cover" }} />
			}
		>
			<Meta title={data.name} description={`Rs.${data.price}`} />
		</Card>
	)
}
export default CustomCard
