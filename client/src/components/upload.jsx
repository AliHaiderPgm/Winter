import { useState } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Modal, Upload } from "antd"

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
const Dragger = ({ imagesCode }) => {
	// const [files, setFiles] = useState([])
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState("")
	const [previewTitle, setPreviewTitle] = useState("")
	const handleCancel = () => setPreviewOpen(false)
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		)
	}
	const handleSetFiles = async (file) => {
		try {
			const code = await getBase64(file)
			// setFiles((prevFiles) => [...prevFiles, code])
			imagesCode((prevFiles) => [...prevFiles, code])
		} catch (err) {
			console.log("Error Converting image to base 64:", err)
		}
	}
	return (
		<>
			<Upload.Dragger
				listType="picture-card"
				multiple
				accept=".png,.jpg,.jpeg"
				beforeUpload={(file) => {
					handleSetFiles(file)
					return false
				}}
				onRemove={(file) => {
					console.log(file)
				}}
				onPreview={handlePreview}
				className="d-flex flex-column gap-2"
			>
				Drag files or <br />
				<Button icon={<UploadOutlined />}>Select Files</Button>
			</Upload.Dragger>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="example"
					style={{
						width: "100%",
					}}
					src={previewImage}
				/>
			</Modal>
			{/* <Button onClick={() => console.log(files)}>Show</Button> */}
		</>
	)
}
export default Dragger
