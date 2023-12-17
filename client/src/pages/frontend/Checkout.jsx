import { Divider, Segmented } from "antd"
import SummaryElements from "../../components/frontend/cart/SummaryElements"
import { useCart } from "../../context/CartContext"
import { formatDate } from "../../global"

const Checkout = () => {
    const { products } = useCart()
    const ArrivalDate = formatDate(7)
    return (
        <div className="row vh-100 w-100">
            <div className="col-6">
                <Segmented options={['Cash on Delivery', 'Pay online']} />
            </div>
            <div className="col-3">
                <h2>In Your Bag</h2>
                <SummaryElements />
                <p>Arrival {ArrivalDate}</p>
                <div className="d-flex flex-column gap-2">
                    {
                        products.map((item, index) => {
                            return <div className="row" key={item.product._id}>
                                <div className="col-4">
                                    <img src={item.product.images[0]} alt={item.product.name} className="img-fluid rounded-2" />
                                </div>
                                <div className="col-8">
                                    <p className="m-0">{item.product.name}</p>
                                    <p className="text-black-50 m-0">Size:{item.size}</p>
                                    <p className="text-black-50 m-0">Qty:{item.quantity} @ Rs.{item.product.price}</p>
                                    <p className="text-black-50 m-0">Rs.{item.quantity * item.product.price}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Checkout