import React from "react"
import Card from "../../components/Card"
import { Input, Select } from "antd"
const { Search } = Input

const AllProducts = () => {
	const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const options = []
	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i,
		})
	}
	const onSearch = () => {}
	const handleChange = (value) => {}
	return (
		<>
			<div className="d-flex justify-content-between mt-2 mb-3 flex-column">
				<div className="w-100">
					<Search
						placeholder="Search Product"
						allowClear
						enterButton="Find"
						size="large"
						onSearch={onSearch}
					/>
				</div>

				<Select
					size="large"
					onChange={handleChange}
					placeholder="Sort Products"
					style={{
						width: 200,
					}}
					options={options}
				/>
			</div>
			<div className="d-flex flex-wrap gap-5 justify-content-between">
				{products.map((item, index) => {
					return <Card key={index} />
				})}
			</div>
		</>
	)
}

export default AllProducts
