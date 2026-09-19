import { Select } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useCart } from "../../../context/CartContext"
import FavoriteButton from "../../shared/FavoriteButton"

const CartCard = ({ product }) => {
    const data = product.product
    const { removeFromCart, updateCart, totalQuantity } = useCart()

    const quantity = Array.from({ length: 10 }, (_, index) => ({ label: index + 1, value: index + 1 }))
    const sizes = data?.sizes.map(size => ({ value: size, label: size }))
    const [qtyValue, setQtyVal] = useState(product.quantity)
    const [prevQuantity, setPrevQuantity] = useState(product.quantity)

    const handleChange = (key, value) => {
        const updatedData = { ...product, [key]: value }

        if (key === "quantity") {
            const currentTotalQuantity = totalQuantity(updatedData)
            const newTotalQuantity = currentTotalQuantity - prevQuantity + value

            if (newTotalQuantity <= 10) {
                setQtyVal(value)
                setPrevQuantity(value)
                updateCart(updatedData)
            } else {
                setQtyVal(prevQuantity)
                updateCart({ ...product, quantity: prevQuantity })
            }
            return
        }

        updateCart(updatedData)
    }

    return (
        <div className="cart-card row">
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
                            <Select style={{ width: 60 }} value={product?.size} options={sizes} onChange={value => handleChange("size", value)} />
                            <p>Quantity</p>
                            <Select style={{ width: 60 }} value={product?.quantity} options={quantity} onChange={value => handleChange("quantity", value)} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <p className="fw-semibold">Rs.{data?.price * qtyValue}</p>
                    </div>
                </div>
                <div className="d-flex gap-2 my-2">
                    <FavoriteButton product={data} />
                    <DeleteOutlined className="fs-4" onClick={() => removeFromCart(product)} />
                </div>
            </div>
        </div>
    )
}

export default CartCard