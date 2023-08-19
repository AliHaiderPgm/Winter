import { DeleteOutlined } from "@ant-design/icons"

const Chip = (props) => {
	const { value, onDelete } = props
	const handleDelete = () => {
		onDelete(value)
	}
	return (
		<div
			className="d-flex align-items-center gap-2 p-1 rounded"
			style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
		>
			<p className="m-0 fw-bold">{value}</p>
			<DeleteOutlined style={{ cursor: "pointer" }} onClick={handleDelete} />
		</div>
	)
}

export default Chip
