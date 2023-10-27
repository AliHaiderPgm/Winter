import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { Breadcrumb, Button, Checkbox, Collapse, Empty, Result, Select } from "antd"
import Loader from "../../components/shared/Loader"
import BnbCard from "../../components/shared/BnbCard"
import { CloseOutlined, FilterOutlined } from "@ant-design/icons"
import data from "../dashboard/product/data"


const initialState = new Array(5).fill([])
const errorInitialState = { products: false, filterProducts: false }

const Catalog = () => {
    const { type } = useParams()
    const newType = type.charAt(0).toUpperCase() + type.slice(1)
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
    const [sortOrder, setSortOrder] = useState([])
    const [clearFilterBtn, setClearFilterBtn] = useState(false)
    const [error, setError] = useState(errorInitialState)

    // //////////Scroll /////////
    const handleScroll = () => {
        if (document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight) {
            log.current = true
            setPage(prev => prev + 1)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    /////////Get all products ////////
    const getProducts = async () => {
        loader.current ? setLoading(true) : setLoading(false) ////To show loader only first time when page mounts
        try {
            const res = await GetCustomizedProducts("shoefor", newType, page, checkedVals)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false) /////To stop getting products when res is empty
            setProducts(prev => {
                const uniqueIds = new Set(prev.map(item => item._id))
                const newItems = res.filter(item => !uniqueIds.has(item._id))
                return [...prev, ...newItems]
            }
            )
        } catch (error) {
            console.log(error)
            setError({ products: true, filterProducts: false })
        } finally {
            setLoading(false)
        }
    }

    ////////Sorting////////
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
    useEffect(() => { // so that when ever size value changes it immediately stores in checkedvals
        handleCheckBox(selectedSize, 3)
    }, [selectedSize])

    const handleSort = (sort) => {
        if (sort === undefined) {
            setSortOrder([])
            handleCheckBox([], 4)
        } else {
            setSortOrder([sort])
            handleCheckBox([sort], 4)
        }
    }
    useEffect(() => {
        const hasChanged = checkedVals.some((val, i) => val.length !== initialState[i].length);
        if (hasChanged && products.length === 0 && filteredProducts.length >= 0) {
            setFilteredProducts([])
            handleFilterProducts()
        } else {
            setProducts([])
            getProducts()
        }
    }, [sortOrder])

    //////////Get filter products ///////
    const handleFilterProducts = async (e) => {
        setLoading(true)
        try {
            const res = await GetCustomizedProducts("shoefor", newType, page, checkedVals)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false) ///same as for getProducts so to stop making requests when res is empty
            e.scrolling ? setFilteredProducts(prev => [...prev, ...res]) : setFilteredProducts([...res])   ///when ever user scroll add the new products in state but when he changes filter then don't store them
            setProducts([])
        } catch (error) {
            setError({ products: false, filterProducts: true })
        } finally {
            setLoading(false)
        }
    }

    ///////// clear filters  //////////
    const handleClearFilters = async () => {
        loader.current = true
        setPage(1)
        await getProducts()
        setClearFilterBtn(false)
        setSelectedSize([])
        setCheckedVals(initialState)
        setFilteredProducts([])
        setSortOrder(undefined)
    }
    useEffect(() => {
        const hasChanged = checkedVals.some((val, i) => val.length !== initialState[i].length);
        setClearFilterBtn(hasChanged);

        if (!hasChanged && products.length === 0 && filteredProducts.length > 0) {
            handleClearFilters();
        }
    }, [checkedVals]);

    //////Get products on scroll ////////
    useEffect(() => {
        if (log.current && !isResEmpty) {
            if (filteredProducts.length > 0) {
                handleFilterProducts({ scrolling: true })
            } else {
                getProducts()
            }
            log.current = false
            loader.current = false
        }
    }, [page])

    useEffect(() => {
        if (isResEmpty) {
            setPage(1);
        }
    }, [isResEmpty]);


    /////other
    const sortingOptions = [
        {
            index: "0",
            label: `Shop by Price ${checkedVals[0].length === 0 ? "" : `(${checkedVals[0].length})`}`,
            options: [
                {
                    label: "Under Rs.1999",
                    value: "0-1999"
                },
                {
                    label: "Rs.2000 - Rs.4999",
                    value: "2000-4999"
                },
                {
                    label: "Rs.5000 - Rs.9999",
                    value: "5000-9999"
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
    const breadCrumbItems = [
        {
            title: <Link to="/">Home</Link>,
        },
        {
            title: `${type}`,
        },
    ]
    const ShoesFor = type === 'Male' ? 'Men' : type === 'Female' ? 'Women' : 'Kid';
    const sortBy = [
        { label: "Newest", value: "newest" },
        { label: "Price: High-Low", value: "desc" },
        { label: "Price: Low-High", value: "acs" },
    ]

    return <div className="product-catalog">
        <div className="px-5 py-3 d-flex justify-content-between align-items-center">
            <div>
                <Breadcrumb items={breadCrumbItems} />
                <h1>{ShoesFor}'s Shoes</h1>
            </div>
            <Select placeholder="Sort by" options={sortBy} style={{ width: 200 }} size="large" allowClear onChange={handleSort} value={sortOrder} />
        </div>
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
                        <Button className="btn-filled w-100 py-2" type="primary" onClick={() => handleFilterProducts({ scrolling: false })}>Filter</Button>
                    </div>
                </div>
            </div>
            <div className="col-9 d-flex min-vh-100 ">
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <div className="row w-100 h-100">
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
                            ) : isResEmpty ?
                                <div className="mx-auto">
                                    <Empty />
                                </div>
                                : error.products || error.filterProducts ? <Result
                                    status="warning"
                                    title="Something went wrong!"
                                    extra={
                                        <Button type="primary" className="btn-filled" onClick={error.products ? getProducts : handleFilterProducts}>
                                            Refresh
                                        </Button>
                                    }
                                />
                                    : <Loader />
                            }
                        </div>
                    )
                }



            </div>
        </div>
    </div>
}

export default Catalog