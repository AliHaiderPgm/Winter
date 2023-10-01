import { useParams } from "react-router-dom"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { Button, Carousel, message } from "antd"
import Loader from "../../../components/shared/Loader"
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material"
import { HeartOutlined } from "@ant-design/icons"

const Details = () => {
    const { id } = useParams()
    const { GetDetails } = useProduct()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const carousel = useRef()
    const log = useRef(true)
    const getDetails = async () => {
        try {
            setLoading(true)
            const res = await GetDetails(id)
            setProduct({ ...res })
        } catch (error) {
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (log.current) {
            getDetails()
            log.current = false
        }
    }, [])
    if (loading) {
        return <div style={{ height: "100vh" }}>
            <Loader />
        </div>
    }
    return (
        <div className="product-details-container row my-5">
            <div className="carousel col-6">
                <div className="card-controller">
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
                <Carousel ref={carousel} dots={false} className="carousel-himself">
                    {
                        product?.images?.map((imageUrl, index) => {
                            return <div key={index} className="img-container">
                                <img src={imageUrl} className="img-fluid" />
                            </div>
                        })
                    }
                </Carousel>
            </div>
            <div className="col-6 p-5 content">
                <h1>{product?.name}</h1>
                <p>{product?.shoefor}'s Shoes</p>
                <p>Rs.{product?.price}</p>
                <p>Select Size</p>
                <div className="d-flex flex-wrap gap-2 pb-3">
                    {
                        product?.sizes?.map((size, index) => {
                            return <div className="size p-3" key={index}>
                                <p>{size}</p>
                            </div>
                        })
                    }
                </div>
                <div className="d-flex flex-column gap-2 w-75 pb-3">
                    <Button type="primary" className="btn-filled p-4" shape="round">Add to Bag</Button>
                    <Button type="text" className="btn-outline p-4" shape="round">Favorite <HeartOutlined /></Button>
                </div>
                <p>{product?.description}</p>
            </div>
        </div>
    )
}

export default Details