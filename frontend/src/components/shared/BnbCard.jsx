import React, { Suspense, useCallback, useEffect, useRef, useState } from "react"
const Carousel = React.lazy(() => import('antd').then(module => ({ default: module.Carousel })));
import { useNavigate } from "react-router-dom"
import imagePlaceHolder from "../../assets/placeholder.png"
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons"
import { buildImageSrcSet, buildImageUrl } from "../../utils/imageUrl"

// Matches the card grid in Catalog/HorizontalScroll/Featured so the browser can
// pick a small variant on phones and a sharp one on wide, high-DPI screens.
const IMAGE_SIZES = "(max-width: 575px) 92vw, (max-width: 767px) 50vw, (max-width: 991px) 40vw, (max-width: 1399px) 26vw, 22vw"

const LazyProductImage = ({ src, alt, className, style }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const imgRef = useRef(null)

	const imageSrc = hasError ? imagePlaceHolder : buildImageUrl(src)
	const imageSrcSet = hasError ? undefined : buildImageSrcSet(src)

	// A cached image can finish before onLoad is attached, which would leave an
	// already-loaded card invisible.
	useEffect(() => {
		const node = imgRef.current
		if (node?.complete && node.naturalWidth > 0) setIsLoaded(true)
	}, [imageSrc])

	return (
		<img
			ref={imgRef}
			src={imageSrc}
			srcSet={imageSrcSet}
			sizes={imageSrcSet ? IMAGE_SIZES : undefined}
			alt={alt}
			width={900}
			height={900}
			className={`${className} product-image ${isLoaded ? "product-image--loaded" : ""}`}
			loading="lazy"
			decoding="async"
			style={{ ...style, background: `url(${imagePlaceHolder}) center / cover` }}
			onLoad={() => setIsLoaded(true)}
			onError={() => setHasError(true)}
		/>
	)
}

const DRAG_THRESHOLD = 8

const BnbCard = React.forwardRef((props, ref) => {
	const { data, uniqueKey } = props
	const carousel = useRef()
	const navigate = useNavigate()
	const pressStart = useRef(null)

	const handlePressStart = (event) => {
		pressStart.current = { x: event.clientX, y: event.clientY }
	}

	// Only a tap opens the product page: a swipe across the carousel (or any drag
	// while scrolling) must not navigate away.
	const handleNavigate = useCallback((event) => {
		const start = pressStart.current
		pressStart.current = null
		if (start && (Math.abs(event.clientX - start.x) > DRAG_THRESHOLD || Math.abs(event.clientY - start.y) > DRAG_THRESHOLD)) return

		const genderSlug = data?.shoefor === 'Male' ? 'men' : data?.shoefor === 'Female' ? 'women' : 'kids'
		navigate(`/${genderSlug}/${data._id}`)
	}, [data, navigate])

	const handleCarouselStep = (step) => (event) => {
		event.stopPropagation()
		carousel.current?.[step]()
	}

	return (
		<div
			className="card-content-wrapper"
			ref={ref}
			key={uniqueKey}
			onClick={handleNavigate}
			onPointerDown={handlePressStart}
		>
			<div
				className="carousel d-flex flex-column justify-content-center"
				style={{ background: `url(${imagePlaceHolder}) center / cover` }}
			>
				{
					data.images.length === 1 ? null : <div className="card-controller">
						<LeftOutlined
							className="icon"
							onClick={handleCarouselStep('prev')} />
						<RightOutlined
							className="icon"
							onClick={handleCarouselStep('next')}
						/>
					</div>
				}
					{
				data?.images.length === 1 ? <LazyProductImage src={data?.images[0]} alt={data?.name} className="img-fluid rounded" style={{ objectFit: "cover" }} />
						: <Suspense fallback={<><img src={imagePlaceHolder} className="img-fluid" alt="Loading product" /></>}>
							<Carousel ref={carousel} >
								{
									data.images.map((imageUrl, index) => {
										return <div key={index}>
											<LazyProductImage src={imageUrl} alt={`${data?.name} ${index + 1}`} className="img-fluid" style={{ objectFit: "cover" }} />
										</div>
									})
								}
							</Carousel>
						</Suspense>
				}
			</div>

			<div className="content">
				<div>
					<h1>{data?.name}</h1>
					<div>
						<StarFilled className="icon" />
						<p>{data?.rating}</p>
					</div>
				</div>
				<p>{data?.type}</p>
				<p>
					Rs<span>{data?.price}</span>
				</p>
			</div>
		</div>
	)
})

export default BnbCard
