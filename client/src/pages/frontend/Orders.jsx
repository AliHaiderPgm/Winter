import { Button, Modal, Table } from "antd";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import BasicDetailsCard from "../../components/shared/BasicDetailsCard";

const Orders = () => {
    const { getOrders } = useCart()
    const [orders, setOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const getAllOrders = async () => {
        try {
            setLoading(true)
            const res = await getOrders()
            setOrders(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllOrders()
    }, [])

    const dataSource = orders.map(order => {
        return {
            key: order._id,
            orderNumber: order.orderNumber,
            orderDate: new Date(order.createdAt).toLocaleString(),
            name: order.receiver.firstName + " " + order.receiver.secondName,
            total: `Rs.${order.total}`,
            orderStatus: order.status,
            orderDetails: order.order
        }
    })
    const columns = [
        {
            title: 'Order No.',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: 'Details',
            dataIndex: 'orderDetails',
            key: 'orderDetails',
            render: (order) => (
                <Button type="link" onClick={() => handleDetails(order)} className="p-0 d-flex align-items-center ">
                    Details<RightOutlined />
                </Button>
            ),
        },
    ]

    const handleDetails = (orders) => {
        setIsModalOpen(true)
        setOrderDetails(orders)
    }

    return <>
        <div className="container d-flex flex-column gap-2 my-3">
            <h3>Orders</h3>
            <Table columns={columns} dataSource={dataSource} loading={loading} pagination={false} scroll={{ x: 900 }} />
            <Modal
                title="Order Details"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={<Footer closeModal={setIsModalOpen} />}
            >
                <div className="d-flex flex-column gap-2">
                    {orderDetails.map((order, index) => {
                        return <BasicDetailsCard data={order} key={index} />
                    })}
                    {
                        orders.map((order, index) => {
                            return <div key={index}>
                                <div className="my-2">
                                    <h5>Delivery Details</h5>
                                    <p className="m-0 fw-semibold">Name: <span className="fw-normal">{order.receiver.firstName + " " + order.receiver.secondName}</span></p>
                                    <p className="m-0 fw-semibold">Address: <span className="fw-normal">{order.receiver.address + ", " + order.receiver.district}</span></p>
                                    <p className="m-0 fw-semibold">Email: <span className="fw-normal">{order.receiver.email}</span></p>
                                </div>
                                <div>
                                    <h5>Order</h5>
                                    <p className="m-0 fw-semibold">SubTotal: <span className="fw-normal ">Rs.{order.subTotal}</span></p>
                                    <p className="m-0 fw-semibold">Tax: <span className="fw-normal ">Rs.{order.tax}</span></p>
                                    <p className="m-0 fw-semibold">Total: <span className="fw-normal ">Rs.{order.total}</span></p>
                                    <p className="m-0 fw-semibold">Expected delivery in 7 working days.</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </Modal>
        </div>
    </>
}

const Footer = ({ closeModal }) => {
    return <>
        <Button className="btn-filled" onClick={() => closeModal(false)}>OK</Button>
    </>
}


export default Orders