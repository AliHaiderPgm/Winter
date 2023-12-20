import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Button, Result } from "antd"
import { useAuth } from "../../context/AuthContext"

const CheckoutSuccess = () => {
    const location = useLocation()
    const { id } = useParams()
    const { confirmOrder } = useCart()
    const [customer, setCustomer] = useState()
    const navigate = useNavigate()
    const { user } = useAuth()
    const orderId = location.state



    // const handleConfirmOrder = async () => {
    //     try {
    //         const res = await confirmOrder(id)
    //         // console.log(res)
    //         setCustomer(res)
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }
    // useEffect(() => {
    //     handleConfirmOrder()
    // }, [])
    return (
        <Result
            status="success"
            title="Thank you for ordering!"
            subTitle={`Order number: ${id}`}
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