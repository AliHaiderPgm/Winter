import React from "react"
import { Card } from "antd"
const { Meta } = Card
const CustomCard = () => (
	<Card
		hoverable
		style={{
			width: 250,
		}}
		cover={
			<img
				alt="example"
				src="https://static.doofinder.com/main-files/uploads/2018/01/Top6Sales.png"
			/>
		}
	>
		<Meta title="Europe Street beat" description="$58" />
	</Card>
)
export default CustomCard
