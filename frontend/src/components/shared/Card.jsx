import { Card } from "antd"
import PlaceHolder from "../../assets/placeholder.png"
import { buildImageSrcSet, buildImageUrl } from "../../utils/imageUrl"

const { Meta } = Card

// The real URL goes straight into the tag so the browser can start it while
// React is still mounting; the placeholder is only a background behind it. This
// replaces the old "render placeholder, preload with new Image(), then swap"
// dance, which added a state update and a second request per card.
const CustomCard = ({ data }) => {
	const source = data?.images?.[0]

	return (
		<Card
			hoverable
			cover={
				<img
					alt={data?.name || "Product image"}
					src={buildImageUrl(source, 480) || PlaceHolder}
					srcSet={buildImageSrcSet(source)}
					sizes="(max-width: 767px) 45vw, (max-width: 1199px) 30vw, 240px"
					loading="lazy"
					decoding="async"
					onError={(event) => {
						event.currentTarget.removeAttribute("srcset")
						event.currentTarget.src = PlaceHolder
					}}
					style={{ height: 200, objectFit: "cover", background: `url(${PlaceHolder}) center / cover` }}
				/>
			}
		>
			<Meta title={data?.name} description={`Rs.${data?.price}`} />
		</Card>
	)
}

export default CustomCard
