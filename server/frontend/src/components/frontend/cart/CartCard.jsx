import { Select } from "antd"
import { useCart } from "../../../context/CartContext"
import Icon, { DeleteOutlined } from "@ant-design/icons"
import { formatDate, handleAddToFavorites } from "../../../global"
import { useState } from "react"
import Svg from "../../../global/svg"

const HeartIcon = (props) => <Icon component={Svg.heart} {...props} />

const CartCard = ({ product }) => {
    const data = product.product
    const { removeFromCart, updateCart, totalQuantity } = useCart()

    const quantity = Array.from({ length: 10 }, (_, index) => ({ label: index + 1, value: index + 1 }))
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

    // const Arrival = formatDate(7)

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
        {/* <div className="col-12 col-md-11 mt-2">
            <p className="m-0 fw-semibold">Shipping</p>
            <p className="m-0 text-black-50 ">Arrives by {Arrival}</p>
        </div> */}
    </div>
}

export default CartCard