import { useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import { Modal, Upload, Form, message } from "antd"

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
const Dragger = ({ images, imagesCode }) => {
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
			imagesCode((prevFiles) => [...prevFiles, code])
		} catch (err) {
			message.error("Error while converting image to base64!")
		}
	}
	const handleRemove = async (e) => {
		try {
			const code = await getBase64(e)
			console.log(code)
			const filterImg = images.filter((image) => image !== code)
			imagesCode(filterImg)
		} catch (err) {
			message.error("Error while converting image to base64!", err)
		}
	}
	const normFile = (e) => {
		// console.log("Upload event:", e)
		if (Array.isArray(e)) {
			return e
		}
		return e?.fileList
	}
	return (
		<>
			<Form.Item
				name="dragger"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				noStyle
			>
				<Upload.Dragger
					name="files"
					listType="picture-card"
					multiple
					onRemove={(e) => handleRemove(e)}
					maxCount={5}
					accept=".png,.jpg,.jpeg"
					beforeUpload={(file) => {
						handleSetFiles(file)
						return false
					}}
					onPreview={handlePreview}
					className="d-flex flex-column gap-2"
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
export default Dragger
