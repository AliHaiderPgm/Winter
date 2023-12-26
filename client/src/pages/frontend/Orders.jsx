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

    const getAllOrders = async () => {
        try {
            const res = await getOrders()
            setOrders(res)
        } catch (error) {
            console.log(error)
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
            total: "Rs.320",
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
                <Button type="link" onClick={() => handleDetails(order)} className="p-0 d-flex align-items-center">
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
        <div className="container d-flex flex-column gap-2 my-2">
            <h3>Orders</h3>
            <Table columns={columns} dataSource={dataSource} />
            <Modal title="Order Details" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div className="d-flex flex-column gap-2">
                    {orderDetails.map((order, index) => {
                        return <BasicDetailsCard data={order} key={index} />
                    })}
                </div>
            </Modal>
        </div>
    </>
}


export default Orders