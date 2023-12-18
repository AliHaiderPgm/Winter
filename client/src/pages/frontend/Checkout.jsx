import { Divider, Form, Input, Radio, Segmented, Select } from "antd"
import SummaryElements from "../../components/frontend/cart/SummaryElements"
import { useCart } from "../../context/CartContext"
import { formatDate } from "../../global"

const Checkout = () => {
    const { products } = useCart()
    const ArrivalDate = formatDate(7)
    return (
        <div className="row vh-100 w-100">
            <div className="col-6">
                <h3 className="pb-4">Checkout</h3>
                <Form layout="vertical">
                    <div className="d-flex gap-4">
                        <Form.Item
                            name="firstName"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name.',
                                },
                            ]}>
                            <Input placeholder="First Name" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="secondName"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your second name.',
                                },
                            ]}>
                            <Input placeholder="Second Name" size="large" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a valid address.',
                            },
                        ]}>
                        <Input placeholder="Address" size="large" />
                    </Form.Item>
                    <div className="d-flex gap-3">
                        <Form.Item
                            name="district"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a valid district.',
                                },
                            ]}>
                            <Input placeholder="District" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Select a state.',
                                },
                            ]}>
                            <Select
                                placeholder="State"
                                size="large"
                                // style={{
                                //     width: 120,
                                // }}
                                // onChange={handleChange}
                                options={[
                                    {
                                        value: 'Punjab',
                                        label: 'Punjab',
                                    },
                                    {
                                        value: 'Sindh',
                                        label: 'Sindh',
                                    },
                                    {
                                        value: 'Balochistan',
                                        label: 'Balochistan',
                                    },
                                    {
                                        value: 'KPK',
                                        label: 'KPK',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="postalCode"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your postal code.',
                                },
                            ]}>
                            <Input placeholder="Postal Code" size="large" />
                        </Form.Item>
                    </div>
                    <div className="d-flex gap-3">
                        <Form.Item
                            name="email"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a valid email address.',
                                },
                            ]}>
                            <Input placeholder="Email" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            className="w-100"
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required.',
                                },
                            ]}>
                            <Input placeholder="Phone Number" size="large" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Payment Method"
                        name="paymentMethod">
                        <Radio.Group size="large">
                            <Radio value="onlinePayment">Online Payment</Radio>
                            <Radio value="cashOnDelivery">Cash on Delivery</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>

            <div className="col-3 p-3">
                <h3 className="pb-4">In Your Bag</h3>
                <SummaryElements />
                <p>Arrival {ArrivalDate}</p>
                <div className="d-flex flex-column gap-2">
                    {
                        products.map((item, index) => {
                            return <div className="row" key={item.product._id}>
                                <div className="col-4">
                                    <img src={item.product.images[0]} alt={item.product.name} className="img-fluid rounded-2" />
                                </div>
                                <div className="col-8">
                                    <p className="m-0">{item.product.name}</p>
                                    <p className="text-black-50 m-0">Size:{item.size}</p>
                                    <p className="text-black-50 m-0">Qty:{item.quantity} @ Rs.{item.product.price}</p>
                                    <p className="text-black-50 m-0">Rs.{item.quantity * item.product.price}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Checkout