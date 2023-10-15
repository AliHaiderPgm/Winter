import { Card } from "antd"
const { Meta } = Card
const CustomCard = ({ data }) => {
	return (
		<Card
			hoverable
			cover={<img alt="Product Image" src={data.images[0]} />}
		>
			<Meta title={data.name} description={`$${data.price}`} />
		</Card>
	)
}
export default CustomCard
