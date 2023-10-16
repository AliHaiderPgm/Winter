import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { Button, Checkbox, Collapse, message } from "antd"
import Loader from "../../components/shared/Loader"
import BnbCard from "../../components/shared/BnbCard"
import { FilterOutlined } from "@ant-design/icons"

const Catalog = () => {
    const { type } = useParams()
    const [loading, setLoading] = useState(false)
    const { GetCustomizedProducts } = useProduct()
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const log = useRef(true)
    const loader = useRef(true)
    const [isResEmpty, setIsResEmpty] = useState(false)
    const [checkedVals, setCheckedVals] = useState([])

    const handleScroll = () => {
        if (document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight) {
            log.current = true
            setPage(prev => prev + 1)
        }
    }

    const getScrollProducts = async () => {
        try {
            loader.current ? setLoading(true) : setLoading(false)
            const res = await GetCustomizedProducts("shoefor", type, page)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false)
            setProducts(prev => [...prev, ...res])
        } catch (error) {
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (log.current && !isResEmpty) {
            getScrollProducts()
            log.current = false
            loader.current = false
        }
    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    ////////Sorting//////// 
    const sortingOptions = [
        {
            index: "0",
            label: "Shop by Price",
            options: [
                {
                    label: "Rs.2000 - Rs.5000",
                    value: "2000-5000"
                },
                {
                    label: "Rs.5000 - Rs.10,000",
                    value: "5000-10000"
                },
                {
                    label: "Over Rs.10,000",
                    value: "10000-999999999"
                },
            ]
        },
        {
            index: "1",
            label: "Types",
            options: [
                {
                    value: "Sneakers",
                    label: "Sneakers",
                },
                {
                    value: "Sportswear",
                    label: "Sportswear",
                },
                {
                    value: "Running",
                    label: "Running",
                },
                {
                    value: "Golf",
                    label: "Golf",
                },
                {
                    value: "Workout & Gym",
                    label: "Workout & Gym",
                },
                {
                    value: "Football",
                    label: "Football",
                },
                {
                    value: "Basketball",
                    label: "Basketball",
                },
                {
                    value: "LifeStyle",
                    label: "LifeStyle",
                },
            ]
        },
    ]

    const handleCheckBox = (checkedValue, index) => {
        const newArray = [...checkedVals]
        newArray[index] = checkedValue
        setCheckedVals(newArray)
    }

    return <div>
        <h1 className="px-5 py-3">Men's Shoes</h1>
        <div className="row justify-content-center p-4 gap-5">
            <div className="col-2">
                <p className="fw-bold fs-5">Filter <FilterOutlined style={{ verticalAlign: "0" }} /></p>
                <div className="dropDowns d-flex flex-column gap-2">
                    {
                        sortingOptions.map((option, index) => {
                            return <Collapse
                                key={index}
                                items={[
                                    {
                                        key: index,
                                        label: option.label,
                                        children: <Checkbox.Group options={option.options} onChange={val => handleCheckBox(val, option.index)} />,
                                    },
                                ]}
                            />
                        })
                    }
                    <div>
                        <Button className="btn-filled" type="primary" onClick={() => console.log(checkedVals)}>Filter</Button>
                    </div>
                </div>
            </div>
            <div className="col-9 d-flex min-vh-100">
                {
                    loading ? <Loader /> : <div className="row">
                        {
                            products?.map((product, index) => {
                                return <div className="col-3 flex-fill mb-4" key={index}>
                                    <BnbCard data={product} />
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    </div>
}

export default Catalog