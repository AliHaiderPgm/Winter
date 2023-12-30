import { Button, Divider } from "antd";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryElements from "../../components/frontend/cart/SummaryElements";
import CartCard from "../../components/frontend/cart/CartCard";
import { formatDate } from "../../global";

const Cart = () => {
    const { products } = useCart()
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const navigate = useNavigate()
    const [isDisable, setIsDisable] = useState(false)
    const Arrival = formatDate(7)

    useEffect(() => {
        window.addEventListener("resize", () => { setInnerWidth(window.innerWidth) })
        return () => {
            window.removeEventListener("resize", () => { setInnerWidth(window.innerWidth) })
        }
    }, [])
    useEffect(() => {
        products && products?.length === 0 ? setIsDisable(true) : setIsDisable(false)
    }, [products])

    const handleCheckOut = () => {
        navigate('/checkout')
    }

    return (
        <div className="cart d-flex justify-content-center py-3">
            <div className="wrapper w-100">
                <div className="row pt-4">
                    <div className="col-12 col-md-7">
                        <h3 className="text-center text-md-start">Bag</h3>
                        {
                            innerWidth < 768 &&
                            <>
                                <p className="text-center mb-3">
                                    {products.length > 0 ? products.length : 0} items | {products.length > 0 ? `Rs.${subTotal + tax}` : "—"}
                                </p>
                                <Divider />
                            </>
                        }
                        {
                            products.length === 0 ? <p className="mb-3">There are no items in your bag.</p>
                                : <div className="d-flex flex-column gap-3">
                                    {
                                        products.map((product, index) => {
                                            return <CartCard product={product} key={index} />
                                        })
                                    }
                                    <div className="col-12 col-md-11 mt-2">
                                        <p className="m-0 fw-semibold">Shipping</p>
                                        <p className="m-0 text-black-50 ">Arrives by {Arrival}</p>
                                    </div>
                                    <Divider className="m-2" />
                                </div>
                        }
                    </div>
                    <div className="col-12 col-md-4">
                        <h3>Summary</h3>
                        <SummaryElements />
                        <Button className="btn-filled w-100" size="large" onClick={handleCheckOut} disabled={isDisable}>Check out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart