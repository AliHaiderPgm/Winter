import { Button, Divider, Select, Tooltip } from "antd";
import Icon, { DeleteOutlined } from "@ant-design/icons"
import Svg from "../../global/svg";
import { useEffect, useState } from "react";
import { handleAddToFavorites } from "../../global";
import { useCart } from "../../context/CartContext";
import axios from "axios";

const HeartIcon = (props) => <Icon component={Svg.heart} {...props} />


const CartCard = ({ product }) => {
    const data = product.product
    const quantity = Array.from({ length: 10 }, (_, index) => ({ label: index + 1, value: index + 1 }))
    const { removeFromCart, updateCart, totalQuantity } = useCart()
    const sizes = data?.sizes.map(size => {
        return {
            value: size,
            label: size
        }
    })

    const [qtyValue, setQtyVal] = useState(product.quantity);
    const [prevQuantity, setPrevQuantity] = useState(product.quantity);

    const handleChange = (key, val) => {
        const updatedData = {
            ...product,
            [key]: val,
        };

        if (key === "quantity") {
            const currentTotalQuantity = totalQuantity(updatedData);
            const newTotalQuantity = currentTotalQuantity - prevQuantity + val;

            if (newTotalQuantity <= 10) {
                // Update state with new quantity
                setQtyVal(val);
                setPrevQuantity(val);
                updateCart(updatedData);
            } else {
                // Revert to the previous quantity
                setQtyVal(prevQuantity);
                // Update state with previous quantity
                updateCart({ ...product, quantity: prevQuantity });
            }
        } else {
            updateCart(updatedData);
        }
    };

    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days from now
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);

    // Format the date
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const Arrival = futureDate.toLocaleDateString('en-US', options);

    return <div className="cart-card row">
        <div className="col-4 col-sm-3">
            <img src={data?.images[0]} alt={data?.name} className="img-fluid image rounded object-fit-cover h-100" />
        </div>
        <div className="col-8">
            <div className="row flex-column-reverse flex-sm-row">
                <div className="col-12 col-sm-9">
                    <p className="fw-semibold">{data?.name}</p>
                    <p className="text-black-50">{data?.type}</p>
                    <div className="d-flex gap-2">
                        <p>Size</p>
                        <Select
                            style={{
                                width: 60,
                            }}
                            value={product?.size}
                            options={sizes}
                            onChange={e => handleChange("size", e)}
                        />

                        <p>Quantity</p>
                        <Select
                            defaultValue={qtyValue}
                            style={{
                                width: 60,
                            }}
                            value={product?.quantity}
                            options={quantity}
                            onChange={e => handleChange("quantity", e)}
                        />
                    </div>
                </div>
                <div className="col-12 col-sm-3">
                    <p className="fw-semibold">Rs.{data?.price * qtyValue}</p>
                </div>
            </div>
            <div className="d-flex gap-2 my-2">
                <HeartIcon onClick={() => handleAddToFavorites(data)} />
                <DeleteOutlined className="fs-4" onClick={() => removeFromCart(product)} />
            </div>
        </div>
        <div className="col-12 col-md-11 mt-2">
            <p className="m-0 fw-semibold">Shipping</p>
            <p className="m-0 text-black-50 ">Arrives by {Arrival}</p>
        </div>
    </div>
}

const Cart = () => {
    const { products } = useCart()
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const { checkout } = useCart()

    useEffect(() => {
        window.addEventListener("resize", () => { setInnerWidth(window.innerWidth) })
        return () => {
            window.removeEventListener("resize", () => { setInnerWidth(window.innerWidth) })
        }
    }, [])

    useEffect(() => {
        const val = products.map(i => {
            const quantity = i.quantity
            const price = i.product.price
            return quantity * price

        }).reduce((acc, val) => acc + val, 0)
        setSubTotal(val)
        const totalTax = Math.round(0.18 * val)
        setTax(totalTax)
    }, [products])
    const SummaryElements = [
        {
            title: "Subtotal",
            value: products.length === 0 ? "_" : `Rs.${subTotal}`,
            toolTip: "The subtotal reflects the total price of your order before any applicable discounts. It does not include shipping costs and taxes."
        },
        {
            title: "Estimated Shipping & Handling",
            value: products.length === 0 ? "_" : "Free",
        },
        {
            title: "Estimated Tax",
            value: products.length === 0 ? "_" : `Rs.${tax}`,
            toolTip: "The government has established a GST rate of 18% to be applied to applicable goods and services."
        },
    ]

    const handleCheckOut = () => {
        try {
            checkout()
            console.log("clicked")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart d-flex justify-content-center py-3">
            <div className="wrapper">
                <div className="row w-100 pt-4">
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
                                : <div className="d-flex flex-column align-items-center  gap-3">
                                    {
                                        products.map((product, index) => {
                                            return <CartCard product={product} key={index} />
                                        })
                                    }
                                    <Divider />
                                </div>
                        }
                    </div>
                    <div className="col-12 col-md-4">
                        <h3>Summary</h3>
                        <div className="d-flex flex-column gap-2 mb-3">
                            {
                                SummaryElements.map((elem, index) => {
                                    return <div className="d-flex justify-content-between" key={index}>
                                        <p className="fw-semibold">{elem.title}{" "}
                                            {
                                                elem.toolTip ?
                                                    <Tooltip title={elem.toolTip} placement="bottom" trigger={"click"}>
                                                        <span className="question-mark">?</span>
                                                    </Tooltip>
                                                    : null
                                            }
                                        </p>
                                        <p>{elem.value}</p>
                                    </div>
                                })
                            }
                            <Divider className="m-0" />
                            <div className="d-flex justify-content-between ">
                                <p className="fw-semibold">Total</p>
                                <p>{products.length === 0 ? "_" : `Rs.${subTotal + tax}`}</p>
                            </div>
                            <Divider className="m-0" />
                        </div>
                        <Button className="btn-filled w-100" size="large" onClick={handleCheckOut}>Check out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart