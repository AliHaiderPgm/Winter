import placeHolder from "../../assets/placeholder.png"
import { buildImageSrcSet, buildImageUrl } from "../../utils/imageUrl"

// Line-item thumbnail used by the cart, checkout and order history. It used to
// wait for a JS preloader and then swap the real image in, so every row visibly
// flickered; the thumbnail now loads natively behind the placeholder.
const BasicDetailsCard = ({ data }) => {
	const source = data?.product?.images?.[0]

	return (
		<div className="row" key={data.product._id}>
			<div className="col-4">
				<img
					src={buildImageUrl(source, 320) || placeHolder}
					srcSet={buildImageSrcSet(source, [160, 320, 480])}
					sizes="(max-width: 767px) 30vw, 160px"
					alt={data.product.name}
					className="img-fluid rounded"
					loading="lazy"
					decoding="async"
					onError={(event) => {
						event.currentTarget.removeAttribute("srcset")
						event.currentTarget.src = placeHolder
					}}
					style={{ background: `url(${placeHolder}) center / cover` }}
				/>
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
