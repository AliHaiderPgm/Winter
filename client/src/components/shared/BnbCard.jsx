import { Carousel, Skeleton } from "antd"
import {
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
	StarRate,
} from "@mui/icons-material"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import imagePlaceHolder from "../../assets/placeholder.png"

const BnbCard = React.forwardRef((props, ref) => {
	const { data, uniqueKey } = props
	const [imageLoaded, setImageLoaded] = useState(false)
	const carousel = useRef()
	// const [imgSrc, setImgSrc] = useState(imagePlaceHolder)
	const navigate = useNavigate()
	const handleNavigate = useCallback(() => {
		navigate(`/${data?.shoefor}/${data._id}`)
	}, [data, navigate])

	useEffect(() => {
		const img = new Image()
		img.src = data.images[0]
		img.onload = () => {
			setImageLoaded(true)
			// setImgSrc(null)
		}
	}, [data])

	// optimizing
	// const MemoizedSkeletonImage = useMemo(() => React.memo(Skeleton.Image), [])
	// const MemoizedCarousel = useMemo(() => React.memo(Carousel), [])

	return (
		<div className="card-content-wrapper" ref={ref} key={uniqueKey}>
			{/* {
				!imageLoaded ? <MemoizedSkeletonImage style={{ height: "330px", width: "100%" }} active /> : null
			} */}
			{
				// imageLoaded ? 
				<div className="carousel d-flex flex-column justify-content-center">
					{
						data.images.length === 1 ? null : <div className="card-controller">
							<KeyboardArrowLeftOutlined
								className="icon"
								onClick={() => {
									carousel.current.prev()
								}}
							/>
							<KeyboardArrowRightOutlined
								className="icon"
								onClick={() => {
									carousel.current.next()
								}}
							/>
						</div>
					}
					<Carousel ref={carousel} >
						{
							data.images.map((imageUrl, index) => {
								return <div key={index} onClick={() => handleNavigate()}>
									<img src={imageLoaded ? imageUrl : imagePlaceHolder} className="img-fluid" loading="lazy" />
								</div>
							})
						}
					</Carousel>
				</div>
				// : null
			}
			<div className="content" onClick={() => handleNavigate()}>
				<div>
					<h1>{data?.name}</h1>
					<div>
						<StarRate className="icon" />
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
