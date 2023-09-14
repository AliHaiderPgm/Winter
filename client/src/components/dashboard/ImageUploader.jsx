import { InboxOutlined } from "@ant-design/icons"
import { Form, Modal, Upload } from "antd"
import { useEffect, useState } from "react"
import { getBase64, getRandomId } from "../../global"

const ImageUploader = ({ newImages, setNewImages }) => {
	// Handle Images Preview
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

	// Handle previous images and adding new images to new state.

	// const [files, setFiles] = useState([])
	const handleSetFiles = (file) => {
		const dataToStore = {
			uid: file.uid,
			name: file.name,
			status: "done",
			url: URL.createObjectURL(file),
			file: file,
			newFile: true,
		}
		// setFiles([...files, dataToStore])
		setNewImages([...newImages, dataToStore])
	}
	const handleRemove = (e) => {
		const filteredImages = newImages.filter((image) => image.uid !== e.uid)
		// setFiles(filteredImages)
		setNewImages(filteredImages)
	}

	// console.log("data in files=>", files)
	return (
		<>
			<Form.Item name="Dragger">
				<Upload.Dragger
					listType="picture-card"
					multiple={true}
					beforeUpload={(file) => {
						handleSetFiles(file)
						return false
					}}
					onRemove={(e) => handleRemove(e)}
					onPreview={handlePreview}
					fileList={newImages}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload.
					</p>
				</Upload.Dragger>
			</Form.Item>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="Image"
					style={{
						width: "100%",
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	)
}

export default ImageUploader
