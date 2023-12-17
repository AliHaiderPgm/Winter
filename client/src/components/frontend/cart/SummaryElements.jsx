import { Divider, Tooltip } from "antd"
import { useCart } from "../../../context/CartContext"

const SummaryElements = () => {
    const { products, subTotal, tax } = useCart()
    const Summary = [
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
        <div className="d-flex flex-column gap-2 mb-3">
            {Summary.map((elem, index) => {
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
            })}
            <Divider className="m-0" />
            <div className="d-flex justify-content-between ">
                <p className="fw-semibold">Total</p>
                <p>{products.length === 0 ? "_" : `Rs.${subTotal + tax}`}</p>
            </div>
            <Divider className="m-0" />
        </div>
    )
}

export default SummaryElements