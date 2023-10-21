import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { Button, Checkbox, Collapse, Empty, message } from "antd"
import Loader from "../../components/shared/Loader"
import BnbCard from "../../components/shared/BnbCard"
import { CloseOutlined, FilterOutlined } from "@ant-design/icons"
import data from "../dashboard/product/data"


const initialState = new Array(4).fill([])
const Catalog = () => {
    const { type } = useParams()
    const [loading, setLoading] = useState(false)
    const { GetCustomizedProducts } = useProduct()
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [page, setPage] = useState(1)
    const log = useRef(true)
    const loader = useRef(true)
    const [isResEmpty, setIsResEmpty] = useState(false)
    const [checkedVals, setCheckedVals] = useState(initialState)
    const [selectedSize, setSelectedSize] = useState([])
    const [clearFilterBtn, setClearFilterBtn] = useState(false)

    // //////////Scroll /////////
    const handleScroll = () => {
        if (document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight) {
            log.current = true
            setPage(prev => prev + 1)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    /////////Get all products ////////
    const getProducts = async () => {
        try {
            loader.current ? setLoading(true) : setLoading(false) ////To show loader only first time when page mounts
            const res = await GetCustomizedProducts("shoefor", type, page, initialState)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false)
            setProducts(prev => [...prev, ...res])
        } catch (error) {
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    ////////Sorting////////
    const sortingOptions = [
        {
            index: "0",
            label: `Shop by Price ${checkedVals[0].length === 0 ? "" : `(${checkedVals[0].length})`}`,
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
            label: `Types ${checkedVals[1].length === 0 ? "" : `(${checkedVals[1].length})`}`,
            options: [...data.types].splice(1)
        },
        {
            index: "2",
            label: `Brand ${checkedVals[2].length === 0 ? "" : `(${checkedVals[2].length})`}`,
            options: [...data.brands].splice(1)
        },
    ]

    const handleCheckBox = (checkedValue, index) => {
        const newArray = [...checkedVals]
        newArray[index] = checkedValue
        setCheckedVals(newArray)
    }

    const handleSizeSelection = (e) => {
        setSelectedSize(prev => {
            if (prev.includes(e)) {
                return prev.filter(size => size !== e)
            } else {
                return [...prev, e]
            }
        })
    }
    useEffect(() => {
        handleCheckBox(selectedSize, 3)
    }, [selectedSize])
    // so that when ever size value changes it immediately stores in checkedvals

    //////////Get filter products ///////
    const handleFilterProducts = async () => {
        try {
            setLoading(true)
            const res = await GetCustomizedProducts("shoefor", type, page, checkedVals)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false)
            setFilteredProducts([...res])
            setProducts([])
        } catch (error) {
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    ///////// clear filters  //////////
    const showClearBtn = () => {
        const res = checkedVals.map((val, i) => {
            if (val.length === initialState[i].length) {
                return false
            } else {
                return true
            }
        })
        res.includes(true) && setClearFilterBtn(true)
    }
    useEffect(() => {
        showClearBtn()
    }, [checkedVals])

    const handleClearFilters = async () => {
        try {
            setLoading(true)
            setCheckedVals(initialState)
            setSelectedSize([])
            setClearFilterBtn(false)
            setPage(1)
            setFilteredProducts([])
            await getProducts()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    //////Get products on scroll ////////
    useEffect(() => {
        if (log.current && !isResEmpty) {
            if (filteredProducts.length > 0) {
                handleFilterProducts()
            } else {
                getProducts()
            }
            log.current = false
            loader.current = false
        }
    }, [page])

    return <div className="product-catalog">
        <h1 className="px-5 py-3">Men's Shoes</h1>
        <div className="row justify-content-center align-items-start p-4 me-0 gap-5 main-div">
            <div className="col-2 filter">
                <div className="d-flex align-items-center mb-2">
                    <p className="fw-bold fs-5 m-0">Filter <FilterOutlined style={{ verticalAlign: "0" }} /></p>
                    {clearFilterBtn && <Button type="text btn-outline d-flex align-items-center ms-auto" size="small" onClick={handleClearFilters}>Clear <CloseOutlined /></Button>}
                </div>
                <div className="dropDowns d-flex flex-column gap-2">
                    {
                        sortingOptions.map((option, index) => {
                            return <Collapse
                                key={index}
                                items={[
                                    {
                                        key: index,
                                        label: option.label,
                                        children: <Checkbox.Group options={option.options} value={checkedVals[option.index]} onChange={val => handleCheckBox(val, option.index)} />,
                                    },
                                ]}
                            />
                        })
                    }
                    <Collapse
                        items={[
                            {
                                key: "3",
                                label: `Size ${checkedVals[3].length === 0 ? "" : `(${checkedVals[3].length})`}`,
                                children: <div className="d-flex flex-wrap gap-2">
                                    {data.sizes?.map((size, index) => {
                                        return <div key={index} className={`custom-checkBox flex-fill ${selectedSize.includes(size.value) && "active"}`} onClick={() => handleSizeSelection(size.value)}>
                                            <p>{size.label}</p>
                                        </div>
                                    })}
                                </div>,
                            },
                        ]}
                    />
                    <div>
                        <Button className="btn-filled w-100 py-2" type="primary" onClick={handleFilterProducts}>Filter</Button>
                    </div>
                </div>
            </div>
            <div className="col-9 d-flex min-vh-100 justify-content-center">
                {/* {
                    loading ? <Loader /> :
                        filteredProducts.length > 0 ? <div className="row align-content-start">
                            {
                                filteredProducts?.map((product, index) => {
                                    return <div className="col-3 flex-fill mb-4" key={index}>
                                        <BnbCard data={product} />
                                    </div>
                                })
                            }
                        </div> :
                            products.length === 0 ? <Empty /> :
                                <div className="row align-content-start">
                                    {
                                        products?.map((product, index) => {
                                            return <div className="col-3 flex-fill mb-4" key={index}>
                                                <BnbCard data={product} />
                                            </div>
                                        })
                                    }
                                </div>
                } */}
                {
                    loading ? <Loader /> : (
                        <div className="row align-content-start">
                            {filteredProducts.length > 0 ? (
                                filteredProducts?.map((product, index) => (
                                    <div className="col-3 flex-fill mb-4" key={index}>
                                        <BnbCard data={product} />
                                    </div>
                                ))
                            ) : products.length > 0 ? (
                                products?.map((product, index) => (
                                    <div className="col-3 flex-fill mb-4" key={index}>
                                        <BnbCard data={product} />
                                    </div>
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
}

export default Catalog