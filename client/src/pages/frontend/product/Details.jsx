import { useParams } from "react-router-dom"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { Button, Carousel, message, Divider, Collapse } from "antd"
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
            <div className="carousel col-6 h-100">
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
                <Carousel ref={carousel} dots={false}>
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
                <div className="row gap-2 pb-3">
                    {
                        product?.sizes?.map((size, index) => {
                            return <div className="size p-3 col-5" key={index}>
                                <p>{size}</p>
                            </div>
                        })
                    }
                </div>
                <div className="row gap-2 pb-3">
                    <div className="col-10 p-0">
                        <Button type="primary" className="btn-filled p-4 w-100" shape="round">Add to Bag</Button>
                    </div>
                    <div className="col-10 p-0">
                        <Button type="text" className="btn-outline p-4 w-100" shape="round">Favorite <HeartOutlined /></Button>
                    </div>
                </div>
                <p className="w-75">{product?.description}</p>
                <Divider />
                <div className="row">
                    <div className="col-10">
                        <Collapse
                            items={[
                                {
                                    key: "1",
                                    label: "Reviews",
                                    children: <p>Hello world!</p>
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details