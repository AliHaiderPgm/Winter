import { Form, Input, InputNumber, Select } from "antd"
import {
	BgColorsOutlined,
	DollarOutlined,
	FontSizeOutlined,
	StockOutlined,
} from "@ant-design/icons"
import data from "../../global/data"
import ImageUploader from "./ImageUploader"
const FormProvider = ({
	newImages,
	setNewImages,
	formRef,
	initialState,
	handleChange,
	handleSelect,
}) => {
	const [form] = Form.useForm()
	const { TextArea } = Input
	return (
		<Form
			form={form}
			initialValues={initialState}
			className="d-flex flex-column gap-2"
			ref={formRef}
		>
			<Form.Item name="name" noStyle>
				<Input
					placeholder="Name"
					size="large"
					name="name"
					className="gap-1"
					prefix={<FontSizeOutlined />}
					onChange={handleChange}
					title="Name of product"
				/>
			</Form.Item>
			<div className="d-flex gap-2 flex-column flex-md-row">
				<Form.Item name="type" noStyle>
					<Select
						placeholder="Type"
						size="large"
						onChange={(e) => handleSelect("type", e)}
						options={data.types}
						className="w-100"
						title="Shoe type"
					/>
				</Form.Item>

				<Form.Item name="price" noStyle>
					<InputNumber
						placeholder="Price"
						size="large"
						onChange={(e) => handleSelect("price", e)}
						min={1}
						max={10000}
						className="w-100"
						type="number"
						prefix={<DollarOutlined />}
						title="Price of shoe"
					/>
				</Form.Item>
			</div>
			<div className="d-flex gap-2 flex-column flex-md-row">
				<Form.Item name="stock" noStyle>
					<InputNumber
						placeholder="Stock"
						size="large"
						onChange={(e) => handleSelect("stock", e)}
						min={1}
						max={100000}
						type="number"
						prefix={<StockOutlined />}
						className="w-100"
						title="Stock of shoes"
					/>
				</Form.Item>

				<Form.Item name="brand" noStyle>
					<Select
						placeholder="Brand"
						size="large"
						onChange={(e) => handleSelect("brand", e)}
						options={data.brands}
						className="w-100"
						title="Brand of shoe"
					/>
				</Form.Item>

				<Form.Item name="shoefor" noStyle>
					<Select
						placeholder="Shoe for"
						size="large"
						onChange={(e) => handleSelect("shoefor", e)}
						options={data.shoefor}
						className="w-100"
						title="Shoe is for"
					/>
				</Form.Item>
			</div>
			<Form.Item name="description" noStyle>
				<TextArea
					placeholder="Description"
					name="description"
					autoSize={{ minRows: 3, maxRows: 6 }}
					onChange={handleChange}
					title="Describe shoe features"
				/>
			</Form.Item>
			<div className="d-flex flex-column gap-2">
				<Form.Item name="colors" noStyle>
					<Select
						placeholder="Colors"
						size="large"
						mode="multiple"
						options={data.colors}
						suffixIcon={<BgColorsOutlined />}
						onChange={(e) => handleSelect("colors", e)}
						title="Available colors for shoe"
					/>
				</Form.Item>

				<Form.Item name="sizes" noStyle>
					<Select
						placeholder="Sizes"
						mode="multiple"
						size="large"
						onChange={(e) => handleSelect("sizes", e)}
						options={data.sizes}
						title="Available sizes for shoe"
					/>
				</Form.Item>
			</div>
			<ImageUploader newImages={newImages} setNewImages={setNewImages} />
		</Form>
	)
}

export default FormProvider
