import React, { Suspense, useCallback, useRef } from "react"
const Carousel = React.lazy(() => import('antd').then(module => ({ default: module.Carousel })));
import { useNavigate } from "react-router-dom"
import imagePlaceHolder from "../../assets/placeholder.png"
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons"

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
					data?.images.length === 1 ? <img src={data?.images[0]} className="img-fluid rounded" loading="lazy" style={{ background: `url(${imagePlaceHolder}) center / cover` }} />
						: <Suspense fallback={<><img src={imagePlaceHolder} className="img-fluid" /></>}>
							<Carousel ref={carousel} >
								{
									data.images.map((imageUrl, index) => {
										return <div key={index}>
											<img src={imageUrl} className="img-fluid" loading="lazy" style={{ background: `url(${imagePlaceHolder}) center / cover` }} />
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
