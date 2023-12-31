import { useEffect, useState } from "react"
import placeHolder from "../../assets/placeholder.png"

const BasicDetailsCard = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = data.product.images[0]
        img.onload = () => {
            setImageLoaded(true)
        }
    }, [data.product.images[0]])
    return (
        <div className="row" key={data.product._id}>
            <div className="col-4">
                {
                    imageLoaded ? <img src={data.product.images[0]} alt={data.product.name} className="img-fluid rounded" />
                        : <img src={placeHolder} alt="Loading..." className="img-fluid rounded" />
                }
            </div>
            <div className="col-8">
                <p className="m-0">{data.product.name}</p>
                <p className="text-black-50 m-0">Size:{data.size}</p>
                <p className="text-black-50 m-0">Qty:{data.quantity} @ Rs.{data.product.price}</p>
                <p className="text-black-50 m-0">Rs.{data.quantity * data.product.price}</p>
            </div>
        </div>
    )
}

export default BasicDetailsCard