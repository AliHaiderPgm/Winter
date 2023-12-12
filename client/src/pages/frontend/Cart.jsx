import { Button, Divider, Select, Tooltip } from "antd";
import Icon, { DeleteOutlined } from "@ant-design/icons"
import Svg from "../../global/svg";
import { useEffect, useState } from "react";
import { handleAddToFavorites } from "../../global";
import { useCart } from "../../context/CartContext";

const HeartIcon = (props) => <Icon component={Svg.heart} {...props} />


const CartCard = ({ product }) => {
    const data = product.product
    const quantity = Array.from({ length: 10 }, (_, index) => ({ label: index + 1, value: index + 1 }))
    const [qtyValue, setQtyVal] = useState(product.quantity)
    const { removeFromCart, updateCart, totalQuantity } = useCart()
    const sizes = data?.sizes.map(size => {
        return {
            value: size,
            label: size
        }
    })
    const handleChange = (key, val) => {
        const newVal = key === 'quantity' && val
        const totalCount = totalQuantity(product)
        console.log(totalCount)
        console.log(totalCount)
        if (totalCount > 10) {
            updateCart(product)
            // setQtyVal(product?.quantity)
        } else {
            const updatedData = {
                ...product,
                [key]: val,
            }
            updateCart(updatedData)
            key === "quantity" && setQtyVal(val)
        }
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days from now
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);

    // Format the date
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const Arrival = futureDate.toLocaleDateString('en-US', options);

    return <div className="cart-card row">
        <div className="col-3">
            <img src={data?.images[0]} alt={data?.name} className="img-fluid image rounded object-fit-cover h-100" />
        </div>
        <div className="col-8">
            <div className="row">
                <div className="col-9">
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
                <div className="col-3">
                    <p className="fw-semibold">Rs.{data?.price * qtyValue}</p>
                </div>
            </div>
            <div className="d-flex gap-2 my-2">
                <HeartIcon onClick={() => handleAddToFavorites(data)} />
                <DeleteOutlined className="fs-4" onClick={() => removeFromCart(product)} />
            </div>
        </div>
        <div className="mt-2">
            <p className="m-0 fw-semibold">Shipping</p>
            <p className="m-0 text-black-50 ">Arrives by {Arrival}</p>
        </div>
    </div>
}

const Cart = () => {
    const { products } = useCart()
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)

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

    return (
        <div className="cart d-flex justify-content-center py-3">
            <div className="wrapper">
                <div className="row w-100 pt-4">
                    <div className="col-7">
                        <h3>Bag</h3>
                        {
                            products.length === 0 ? <p>There are no items in your bag.</p>
                                : <div className="d-flex flex-column gap-3">
                                    {
                                        products.map((product, index) => {
                                            return <CartCard product={product} key={index} />
                                        })
                                    }
                                    <Divider />
                                </div>
                        }
                    </div>
                    <div className="col-4">
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
                        <Button className="btn-filled w-100" size="large" onClick={() => console.log(products)}>Check out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart