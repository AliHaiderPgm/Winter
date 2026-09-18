import React, { Suspense, useCallback, useEffect, useRef, useState } from "react"
const Carousel = React.lazy(() => import('antd').then(module => ({ default: module.Carousel })));
import { useNavigate } from "react-router-dom"
import imagePlaceHolder from "../../assets/placeholder.png"
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons"
import { preloadImage, isImageCached } from "../../utils/imageCache"

const LazyProductImage = ({ src, alt, className, style, isSingleImage = false }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const imgRef = useRef(null)

	useEffect(() => {
		if (!src) return
		let isMounted = true
		const node = imgRef.current

		if (!node) return

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return
				Promise.resolve(preloadImage(src))
					.then(() => {
						if (!isMounted) return
						setIsLoaded(isImageCached(src))
					})
					.catch(() => {
						if (!isMounted) return
						setHasError(true)
					})
				observer.unobserve(node)
			})
		}, { rootMargin: '150px' })

		observer.observe(node)
		return () => {
			isMounted = false
			observer.disconnect()
		}
	}, [src])

	const shouldShowPlaceholder = !isLoaded && !hasError
	
	return (
		<img
			ref={imgRef}
			src={shouldShowPlaceholder ? imagePlaceHolder : src}
			alt={alt}
			className={className}
			loading="lazy"
			decoding="async"
			style={{ ...style, background: `url(${imagePlaceHolder}) center / cover` }}
			onLoad={() => setIsLoaded(true)}
			onError={() => setHasError(true)}
		/>
	)
}

const BnbCard = React.forwardRef((props, ref) => {
	const { data, uniqueKey } = props
	const carousel = useRef()
	const navigate = useNavigate()
	const handleNavigate = useCallback(() => {
		navigate(`/${data?.shoefor}/${data._id}`)
	}, [data, navigate])

	return (
		<div className="card-content-wrapper" ref={ref} key={uniqueKey} onClick={() => handleNavigate()}>
			<div className="carousel d-flex flex-column justify-content-center">
				{
					data.images.length === 1 ? null : <div className="card-controller">
						<LeftOutlined
							className="icon"
							onClick={() => {
								carousel.current.prev()
							}} />
						<RightOutlined
							className="icon"
							onClick={() => {
								carousel.current.next()
							}}
						/>
					</div>
				}
					{
				data?.images.length === 1 ? <LazyProductImage src={data?.images[0]} alt={data?.name} className="img-fluid rounded" style={{ objectFit: "cover" }} isSingleImage />
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

			<div className="content" onClick={() => handleNavigate()}>
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
