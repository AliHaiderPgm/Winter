import { Link, useNavigate, useParams } from "react-router-dom"
import { useProduct } from "../../../context/ProductContext"
import { useEffect, useRef, useState } from "react"
import { Button, Carousel, message, Divider, Collapse, Rate, Image, Drawer, Modal, Input, Form, Breadcrumb, Result } from "antd"
import Loader from "../../../components/shared/Loader"
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material"
import { HeartOutlined } from "@ant-design/icons"
import { useAuth } from "../../../context/AuthContext"
import { handleAddToFavorites } from "../../../global"
import { useCart } from "../../../context/CartContext"

const Details = () => {
    const { id } = useParams()
    const { GetDetails, UpdateProduct } = useProduct()
    const [loading, setLoading] = useState({ product: false, addingReview: false })
    const [product, setProduct] = useState({})
    const carousel = useRef()
    const log = useRef(true)
    const { user, isAuthenticated } = useAuth()
    const [open, setOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSized, setSelectedSized] = useState(null)
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const { addToCart } = useCart()

    const getDetails = async () => {
        setLoading(prev => ({ ...prev, product: true }))
        try {
            const res = await GetDetails(id)
            setProduct({ ...res })
        } catch (error) {
            setError(true)
        } finally {
            setLoading(prev => ({ ...prev, product: false }))
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (log.current) {
            getDetails()
            log.current = false
        }
    }, [])
    if (loading.product) {
        return <div style={{ height: "100vh" }}>
            <Loader />
        </div>
    }

    const handleAddToCart = () => {
        if (!selectedSized) {
            message.error("Select a size!")
            return
        }
        const productData = {
            product: { ...product },
            size: selectedSized,
            quantity: 1
        }
        // const dataObj = JSON.parse(localStorage.getItem("cartItems"))
        // // const isSizeAdded = dataObj?.some(item => item.size === selectedSized)
        // // if (isSizeAdded) {
        // //     message.error("Already added to cart!")
        // //     return
        // // }
        addToCart(productData)
        // const dataArray = dataObj ? dataObj : []
        // dataArray.push(productData)
        // localStorage.setItem("cartItems", JSON.stringify(dataArray))
        // message.success("Added to cart!")
    }

    // const handleAddToFavorites = () => {
    //     const dataObj = JSON.parse(localStorage.getItem("favProducts"))
    //     const isAlreadyAdded = dataObj?.some(item => item._id === product._id)
    //     if (isAlreadyAdded) {
    //         message.error("Already added to Favorites!")
    //         return
    //     }
    //     const dataArray = dataObj ? dataObj : []
    //     dataArray.push(product)
    //     localStorage.setItem("favProducts", JSON.stringify(dataArray))
    //     message.success("Added to Favorites!")
    // }

    const handleAddReview = async (values) => {
        const rating = Math.ceil((values.rating + product.rating) / 2)
        const reviews = [...product.reviews, { user, review: values, time: Date.now() }]
        const productData = {
            rating,
            reviews,
        }
        try {
            setLoading(prev => ({ ...prev, addingReview: true }))
            await UpdateProduct(id, productData)
            message.success("Your review has been added successfully!")
            setIsModalOpen(false)
        } catch (error) {
            message.error("Failed to add your review!")
        } finally {
            setLoading(prev => ({ ...prev, addingReview: false }))
        }
    }

    const openReviewModal = () => {
        if (!isAuthenticated) {
            navigate("/auth/login");
            return;
        }

        if (product.reviews.some(review => user._id === review.user._id)) {
            message.error("You have already submitted a review!");
            return;
        }

        setIsModalOpen(true);
    }

    const Review = ({ data }) => {
        const date = new Date(data?.time)
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return <div className="review">
            <div>
                <p className="title">{data?.review.title}</p>
            </div>
            <div className="d-flex flex-column flex-md-row gap-3">
                <Rate disabled defaultValue={data?.review.rating} style={{ color: "#111", fontSize: "16px" }} />
                <p className="user">{data?.user.name} -<span className="date"> {date.toLocaleDateString('en-US', options)}</span> </p>
            </div>
            <div>
                <p className="description">{data?.review.review}</p>
            </div>
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
            <Form layout="vertical" onFinish={handleAddReview}>
                <Form.Item label="Overall rating" name="rating" rules={[
                    {
                        required: true,
                        message: 'Please select some stars!',
                    },
                ]}>
                    <Rate style={{ color: "#111", fontSize: "26px" }} />
                </Form.Item>
                <Divider className="my-3" />
                <Form.Item label="Your Review" name="review" rules={[
                    {
                        required: true,
                        message: "Please describe what you likes, what you didn't like!",
                    },
                ]}>
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 7 }} showCount maxLength={200} style={{ resize: "none" }} />
                </Form.Item>
                <Form.Item label="Review Title" name="title" rules={[
                    {
                        required: true,
                        message: 'Summarize your review!',
                    },
                ]}>
                    <Input title="Review Title" />
                </Form.Item>
                <Form.Item >
                    <Button className="btn-filled p-4 w-100" htmlType="submit" shape="round" loading={loading.addingReview}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    }

    const breadCrumbItems = [
        {
            title: <Link to="/">Home</Link>,
        },
        {
            title: <Link to={`/${product?.shoefor}`}>{product?.shoefor}</Link>,
        },
        {
            title: `${product?.name}`,
        },
    ]
    const underlineBtn = { borderBottom: "1px solid #111", borderRadius: "0px" }
    if (error) {
        return <Result
            status="404"
            title="404"
            subTitle="Sorry, no product found!"
            extra={<Button type="primary" className="btn-filled" onClick={() => navigate('/')}>Back Home</Button>}
        />
    }
    return (
        <>
            <div className="px-5 py-3">
                <Breadcrumb items={breadCrumbItems} />
            </div>
            <div className="product-details-container row me-0 my-5 ">
                <div className="carousel col-12 col-md-6">
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
                                </div>
                            })
                        }
                    </Carousel>
                </div>
                <div className="content col-12 col-md-6 pt-5 d-flex justify-content-center">
                    <div className="w-75">
                        <h1>{product?.name}</h1>
                        <p>{product?.shoefor}'s Shoes</p>
                        <p>Rs.{product?.price}</p>
                        <p>Select Size</p>

                        <div className="row gap-2 pb-3 m-0">
                            {
                                product?.sizes?.map((size, index) => {
                                    return <div className={`size p-3 col-5 flex-fill ${selectedSized === size ? "active" : ""}`} key={index} onClick={() => setSelectedSized(size)}>
                                        <p>{size}</p>
                                    </div>
                                })
                            }
                        </div>

                        <div className="row gap-2 pb-3 m-0">
                            <div className="col-12 p-0">
                                <Button type="primary" className="btn-filled p-4 w-100" shape="round" onClick={handleAddToCart}>Add to Bag</Button>
                            </div>
                            <div className="col-12 p-0">
                                <Button type="text" className="btn-outline p-4 w-100" shape="round" onClick={() => handleAddToFavorites(product)}>Favorite <HeartOutlined /></Button>
                            </div>
                        </div>
                        <p className="w-100">{product?.description}</p>

                        <div className="row">
                            <div className="col-12">
                                <Divider className="mb-0" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
                                <Collapse
                                    items={[
                                        {
                                            key: "1",
                                            label: `Reviews (${product?.reviews?.length})`,
                                            children: <>
                                                <Button type="text" className="p-0 text-black mb-3" style={underlineBtn} onClick={openReviewModal}>Write a review</Button>
                                                {
                                                    product?.reviews?.length === 0 ? <>
                                                        <div>
                                                            <p>No reviews</p>
                                                        </div>
                                                    </> : <>
                                                        <div className="d-flex gap-2">
                                                            <Rate disabled defaultValue={product?.rating} style={{ color: "#111", fontSize: "18px" }} />
                                                            <p style={{ fontSize: "18px", textAlign: "center", fontWeight: "700" }}>{product?.rating} Stars</p>
                                                        </div>
                                                        {product?.reviews?.slice(0, 3).map((review, index) => {
                                                            return <Review data={review} key={index} />
                                                        })}
                                                        <Button type="text" className="p-0 text-black" style={underlineBtn} onClick={() => setOpen(true)}>More reviews</Button>
                                                    </>
                                                }
                                            </>
                                        }
                                    ]}
                                />
                            </div>
                        </div>

                        <Drawer open={open} placement="bottom" key="bottom" title="Reviews" onClose={() => setOpen(false)} height={500}>
                            {product?.reviews?.map((review, index) => {
                                return <Review data={review} key={index} />
                            })}
                        </Drawer>

                        <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)} footer={(_, { OkBtn, CancelBtn }) => (<></>)} width={700}>
                            <AddReviewModal />
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details