import { Card } from "antd"
const { Meta } = Card
const CustomCard = ({ data }) => {
	return (
		<Card
			hoverable
			className="w-100"
			cover={<img alt="example" src={data.images[0]} />}
		>
			<Meta title={data.name} description={`$${data.price}`} />
		</Card>
	)
}
export default CustomCard
