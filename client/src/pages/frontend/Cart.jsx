import { Button, Select } from "antd";
import Icon, { DeleteOutlined } from "@ant-design/icons"
import Svg from "../../global/svg";
import { useEffect, useRef, useState } from "react";
import { handleAddToFavorites } from "../../global";

const HeartIcon = (props) => <Icon component={Svg.heart} {...props} />


const CartCard = ({ product, updateProduct }) => {
    const data = product.product
    const quantity = Array.from({ length: 10 }, (_, index) => ({ label: index + 1, value: index + 1 }))
    const [qtyValue, setQtyVal] = useState(product.quantity)
    const sizes = data?.sizes.map(size => {
        return {
            value: size,
            label: size
        }
    })
    const defaultSize = product?.size
    const handleChange = (key, val) => {
        const updatedData = {
            ...product,
            [key]: val,
        }
        key === "quantity" && setQtyVal(val)
        updateProduct(updatedData)
    }

    return <div className="cart-card row">
        <div className="col-4">
            <img src={data?.images[0]} alt={data?.name} className="img-fluid image rounded object-fit-cover h-100" />
        </div>
        <div className="col-8">
            <div className="row">
                <div className="col-9">
                    <p className="fw-semibold">{data?.name}</p>
                    <p className="text-black-50">{data?.type}</p>
                    <div className="d-flex gap-3">
                        <p>Size</p>
                        <Select
                            style={{
                                width: 120,
                            }}
                            defaultValue={defaultSize}
                            options={sizes}
                            onChange={e => handleChange("size", e)}
                        />

                        <p>Quantity</p>
                        <Select
                            defaultValue={qtyValue}
                            style={{
                                width: 120,
                            }}
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
                <DeleteOutlined className="fs-4" />
            </div>
        </div>
    </div>
}

const Cart = () => {
    const [products, setProducts] = useState([])
    const log = useRef(true)
    const getProducts = () => {
        const dataObj = JSON.parse(localStorage.getItem("cartItems"))
        setProducts(dataObj ? dataObj : [])
    }
    useEffect(() => {
        if (log) {
            getProducts()
            log.current = false
        }
    }, [])

    const handleUpdate = (e) => {
        setProducts(prev => prev.map(product =>
            product.product._id === e.product._id ? e : product
        ))
    }
    return (
        <div className="cart d-flex justify-content-center py-3">
            <div className="wrapper">
                <div className="row w-100">
                    <div className="col-6">
                        <h3>Bag</h3>
                        <div className="d-flex flex-column gap-2">
                            {
                                products.map((product, index) => {
                                    return <CartCard product={product} updateProduct={handleUpdate} key={index} />
                                })
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <h3>Summary</h3>
                        <Button className="btn-filled" size="large" onClick={() => console.log(products)}>Check out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart