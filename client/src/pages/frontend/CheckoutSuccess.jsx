import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Button, Result } from "antd"

const CheckoutSuccess = () => {
    const { id } = useParams()
    const { confirmOrder } = useCart()
    const [customer, setCustomer] = useState()

    const handleConfirmOrder = async () => {
        try {
            const res = await confirmOrder(id)
            // console.log(res)
            setCustomer(res)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        handleConfirmOrder()
    }, [])
    return (
        <Result
            status="success"
            title="Thank you for ordering!"
            subTitle="Your order has been placed successfully!"
            extra={[
                <>
                    <Button type="primary" className="btn-filled">
                        Continue Shopping
                    </Button>,
                </>
            ]}
        />
    )
}

export default CheckoutSuccess