import { Card } from "antd"
import { useState } from "react";
const { Meta } = Card
const CustomCard = ({ data }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const handleLoad = () => {
		setIsLoading(false);
		setIsError(false);
	};

	const handleError = () => {
		setIsLoading(false);
		setIsError(true);
	};
	return (
		<Card
			hoverable
			loading={isLoading}
			cover={<img alt="Product Image" src={data.images[0]} style={{ height: "200px", objectFit: "cover" }} onLoad={handleLoad} onError={handleError} />}
		>
			<Meta title={data.name} description={`$${data.price}`} />
		</Card>
	)
}
export default CustomCard
