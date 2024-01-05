import React, { Suspense, useCallback, useEffect, useRef, useState } from "react"
const Carousel = React.lazy(() => import('antd').then(module => ({ default: module.Carousel })));
import { useNavigate } from "react-router-dom"
import imagePlaceHolder from "../../assets/placeholder.png"
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons"

const BnbCard = React.forwardRef((props, ref) => {
	const { data, uniqueKey } = props
	const [imageLoaded, setImageLoaded] = useState(false)
	const carousel = useRef()
	const navigate = useNavigate()
	const handleNavigate = useCallback(() => {
		navigate(`/${data?.shoefor}/${data._id}`)
	}, [data, navigate])

	useEffect(() => {
		const img = new Image()
		img.src = data.images[0]
		img.onload = () => {
			setImageLoaded(true)
		}
	}, [data])

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
					data?.images.length === 1 ? <img src={imageLoaded ? data?.images[0] : imagePlaceHolder} className="img-fluid rounded" loading="lazy" />
						: <Suspense fallback={<><img src={imagePlaceHolder} className="img-fluid" /></>}>
							<Carousel ref={carousel} >
								{
									data.images.map((imageUrl, index) => {
										return <div key={index}>
											<img src={imageLoaded ? imageUrl : imagePlaceHolder} className="img-fluid" loading="lazy" />
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
