import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import React, { useMemo } from "react"

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
	const MemoizedSpin = useMemo(() => React.memo(Spin), [])

	return (
		<div className="w-100 h-100 d-flex justify-content-center align-items-center">
			<MemoizedSpin indicator={antIcon} />
		</div>
	)
}

export default Loader
