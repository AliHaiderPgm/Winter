import { Card, Skeleton } from "antd"
import { useState } from "react"
const { Meta } = Card
const CustomCard = ({ data }) => {
	// const [loading, setLoading] = useState(true)
	// const imageLoaded = () => {
	// 	setLoading(false)
	// }
	// if (loading) {
	// 	return (
	// 		<div className="d-flex flex-column gap-2">
	// 			<Skeleton.Image active className="w-100" />
	// 			<Skeleton.Input active block />
	// 			<Skeleton.Input active block />
	// 		</div>
	// 	)
	// }
	return (
		<Card
			hoverable
			className="w-100"
			cover={<img alt="Product Image" src={data.images[0]} />}
		>
			<Meta title={data.name} description={`$${data.price}`} />
		</Card>
	)
}
export default CustomCard
