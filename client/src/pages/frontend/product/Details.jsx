import { useParams } from "react-router-dom"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { Button, Carousel, message, Divider, Collapse, Rate, Image, Drawer, Modal, Input, Form } from "antd"
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
    const [open, setOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        // window.scrollTo(0, 0)
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

    const Review = ({ more, write }) => {
        return <div className="review">
            {write ? <Button type="text" className="p-0 text-black mb-3" onClick={() => setIsModalOpen(true)}>Write a review</Button> : null}
            <div>
                <p className="title">Great Class</p>
            </div>
            <div className="d-flex gap-3">
                <Rate disabled defaultValue={2} style={{ color: "#111", fontSize: "16px" }} />
                <p className="user">UserName-<span className="date">10-08-1023</span> </p>
            </div>
            <div>
                <p className="description">Lorem ipsum dolor sit amet onsectetur adipisicing elit. Quis nobis doloremque asperiores quas aut? Ullam? Lorem ipsum dolor sit amet.</p>
            </div>
            {more ? <Button type="text" className="p-0 text-black" onClick={() => setOpen(true)}>More reviews</Button> : null}
        </div>
    }

    const AddReviewModal = () => {
        return <div className="p-2">
            <h1 className="text-center">Write a Review</h1>
            <p className="text-center mb-4">Share your thoughts with the community.</p>
            <div className="d-flex gap-2 mb-3">
                <img src={product?.images[0]} width={60} alt={product?.name} className="img-fluid rounded" />
                <p className="fs-5">{product?.name}</p>
            </div>
            <Form layout="vertical">
                <Form.Item label="Overall rating" rules={[
                    {
                        required: true,
                        message: 'Please select some stars!',
                    },
                ]}>
                    <Rate style={{ color: "#111", fontSize: "26px" }} />
                </Form.Item>
                <Divider className="my-3" />
                <Form.Item label="Your Review" rules={[
                    {
                        required: true,
                        message: "Please describe what you likes, what you didn't like!",
                    },
                ]}>
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 7 }} showCount maxLength={200} style={{ resize: "none" }} />
                </Form.Item>
                <Form.Item label="Review Title" rules={[
                    {
                        required: true,
                        message: 'Summarize your review!',
                    },
                ]}>
                    <Input title="Review Title" />
                </Form.Item>
                <Form.Item >
                    <Button className="btn-filled p-4 w-100" htmlType="submit" shape="round">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    }

    return (
        <>
            <div className="product-details-container row my-5">
                <div className="carousel col-6 h-100">
                    <div className="card-controller">
                        {product?.images?.length === 1 ? null : <>
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
                        </>}
                    </div>
                    <Carousel ref={carousel} dots={false}>
                        {
                            product?.images?.map((imageUrl, index) => {
                                return <div key={index} className="img-container">
                                    <Image className="img-fluid image" src={imageUrl} />
                                    {/* <img src={imageUrl} className="img-fluid image" /> */}
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
                    <div className="row">
                        <div className="col-10">
                            <Divider className="mb-0" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
                            <Collapse
                                items={[
                                    {
                                        key: "1",
                                        label: "Reviews",
                                        children: <Review more="true" write="true" />
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <Drawer open={open} placement="bottom" key="bottom" title="Reviews" onClose={() => setOpen(false)} height={500}>
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </Drawer>
                    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)} footer={(_, { OkBtn, CancelBtn }) => (<></>)} width={700}>
                        <AddReviewModal />
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Details