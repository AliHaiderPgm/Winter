import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Button, Result } from "antd"
import Loader from "../../components/shared/Loader"

const CheckoutSuccess = () => {
    const { id } = useParams()
    const { confirmOrder, getCartProducts } = useCart()
    const [orderConfirmation, setOrderConfirmation] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleConfirmOrder = async () => {
        setLoading(true)
        setIsError(false)
        try {
            const res = await confirmOrder(id)
            if (res.data === "Order confirmed.") {
                setOrderConfirmation(true)
                localStorage.removeItem("cartItems")
                getCartProducts()
            } else {
                setOrderConfirmation(false)
            }
        } catch (error) {
            setIsError(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleConfirmOrder()
    }, [])

    if (loading) {
        return <div style={{ height: "45dvh" }}>
            <Loader />
        </div>
    }

    if (isError) {
        return <div style={{ height: "45dvh" }}>
            <p className="text-center fs-3">Something went wrong!</p>
        </div>
    }

    if (!orderConfirmation) {
        return <Result
            status="error"
            title="Failed to retrieve order details!"
            extra={[
                <>
                    <Button type="primary" className="btn-filled">
                        Home
                    </Button>,
                </>
            ]}
        />
    }
    return (
        <Result
            status="success"
            title="Thank you for purchasing!"
            subTitle={`Order number: ${id}. Order will be shipped in 7 working days.`}
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