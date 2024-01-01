import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { Button, Result } from "antd"
import Loader from "../../components/shared/Loader"

const CheckoutSuccess = () => {
    const { id } = useParams()
    const { confirmOrder, getCartProducts } = useCart()
    const [orderConfirmation, setOrderConfirmation] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    const handleConfirmOrder = async () => {
        try {
            setLoading(true)
            setIsError(false)
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

    if (isError) {
        return <div style={{ height: "45dvh" }}>
            <p className="text-center fs-3 my-4">Something went wrong!</p>
        </div>
    }
    return (
        <>
            {
                loading ? <div style={{ height: "45dvh" }}>
                    <Loader />
                </div>
                    : orderConfirmation ? <Result
                        status="success"
                        title="Thank you for purchasing!"
                        subTitle={`Order number: ${id}. Order will be shipped in 7 working days.`}
                        extra={[
                            <>
                                <Button
                                    type="primary"
                                    className="btn-filled"
                                    onClick={() => navigate("/")}>
                                    Continue Shopping
                                </Button>,
                            </>
                        ]}
                    />
                        :
                        <Result
                            status="error"
                            title="Failed to retrieve order details!"
                            extra={[
                                <>
                                    <Button
                                        type="primary"
                                        className="btn-filled"
                                        onClick={() => {
                                            navigate("/")
                                        }}>
                                        Home
                                    </Button>,
                                </>
                            ]}
                        />
            }
        </>
    )
}

export default CheckoutSuccess