import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const Loader = () => {
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 42,
				textAlign: "center",
			}}
			spin
		/>
	)
	return (
		<div className="w-100 h-100 d-flex justify-content-center align-items-center">
			<Spin indicator={antIcon} />
		</div>
	)
}

export default Loader
