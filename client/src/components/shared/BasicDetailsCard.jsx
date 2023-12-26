import ProgressiveImage from "./ProgressiveImage"

const BasicDetailsCard = ({ data }) => {
    return (
        <div className="row" key={data.product._id}>
            <div className="col-4">
                <ProgressiveImage src={data.product.images[0]} alt={data.product.name} />
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