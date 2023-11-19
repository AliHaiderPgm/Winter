import React, { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { Button, Checkbox, Collapse, Drawer, Empty, Radio, Result, Space } from "antd"
const Breadcrumb = React.lazy(() => import('antd').then(module => ({ default: module.Breadcrumb })));
const Select = React.lazy(() => import('antd').then(module => ({ default: module.Select })));
import Loader from "../../components/shared/Loader"
import BnbCard from "../../components/shared/BnbCard"
import { CloseOutlined, FilterOutlined } from "@ant-design/icons"
import data from "../dashboard/product/data"


const initialState = new Array(5).fill([])

const Catalog = () => {
    const [state, setState] = useState([])
    const { type } = useParams()
    const newType = type.charAt(0).toUpperCase() + type.slice(1)
    const [prevType, setPrevType] = useState('')
    const [firstLoading, setFirstLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { GetCustomizedProducts } = useProduct()
    const [page, setPage] = useState(1)
    const log = useRef(true)
    const [checkedVals, setCheckedVals] = useState(initialState)
    const [selectedSize, setSelectedSize] = useState([])
    const [clearFilterBtn, setClearFilterBtn] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isResEmpty, setIsResEmpty] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()
    // //////////Scroll /////////
    const handleScroll = () => {
        if (document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight) {
            setPage(prev => prev + 1)
        }
    }
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])


    /////////Get products ////////
    const getProducts = async (scrolling) => {
        try {
            setIsError(false)
            const val = scrolling === true ? true : false
            setLoading(val)
            setFirstLoading(!val)
            setIsDisabled(true)
            const pageNo = !val ? 1 : page

            val === false && setState([])

            const res = await GetCustomizedProducts("shoefor", newType, pageNo, checkedVals)
            setState(prev => {
                const uniqueIds = new Set(prev.map(item => item._id))
                const newItems = res.filter(item => !uniqueIds.has(item._id))
                return [...prev, ...newItems]
            })

            res.length === 0 && setPage(1)
            res.length === 0 ? setIsResEmpty(true) : setIsResEmpty(false)
        } catch (error) {
            setIsError(true)
        } finally {
            setFirstLoading(false)
            setLoading(false)
            setIsDisabled(false)
        }
    }
    useEffect(() => {
        if (newType !== prevType) {
            getProducts()
            setPrevType(newType)
        }
    }, [newType])
    useEffect(() => {
        if (!isResEmpty) {
            if (state.length === 0) {
                getProducts()
            } else {
                //////Get products on scroll ////////
                getProducts(true)
            }
            log.current = false
        }
    }, [page])

    ////////Filtering////////
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
        sort === undefined ? handleCheckBox([], 4) : handleCheckBox([sort], 4)
    }
    useEffect(() => {
        width > 768 && getProducts()
    }, [checkedVals[4]])


    ///////// clear filters  //////////
    const handleClearFilters = async () => {
        setCheckedVals([[], [], [], [], checkedVals[4]])
        setSelectedSize([])
    }
    useEffect(() => {
        const hasChanged = checkedVals.slice(0, -1).some((val, i) => val.length !== initialState[i].length);
        setClearFilterBtn(hasChanged);

        !hasChanged && getProducts()
    }, [checkedVals]);

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
            title: `${newType}`,
        },
    ]
    const ShoesFor = type === 'Male' ? 'Men' : type === 'Female' ? 'Women' : 'Kid';
    const sortBy = [
        { label: "Newest", value: "newest" },
        { label: "Price: High-Low", value: "desc" },
        { label: "Price: Low-High", value: "acs" },
    ]

    const Size = () => {
        return <div className="d-flex flex-wrap gap-2">
            {data.sizes?.map((size, index) => {
                return <div className={`custom-checkBox flex-fill ${selectedSize.includes(size.value) && "active"}`} onClick={() => handleSizeSelection(size.value)} key={index}>
                    <p>{size.label}</p>
                </div>
            })}
        </div>
    }

    const DrawerBody = () => {
        return <>
            <div className="mb-3">
                <h5>Sort</h5>
                <Radio.Group onChange={e => handleSort(e.target.value)} value={checkedVals[4][0]}>
                    <Space direction="vertical">
                        {sortBy.map((sort, index) => { return <Radio value={sort.value} key={index}>{sort.label}</Radio> })}
                    </Space>
                </Radio.Group>
            </div>
            {
                sortingOptions.map((option, index) => {
                    return <div key={index} className="mb-3">
                        <h5>{option.label}</h5>
                        <Checkbox.Group disabled={isDisabled} options={option.options} value={checkedVals[option.index]} onChange={val => handleCheckBox(val, option.index)} />
                    </div>
                })
            }
            <div>
                <h5>{`Size ${checkedVals[3].length === 0 ? "" : `(${checkedVals[3].length})`}`}</h5>
                <Size />
            </div>
        </>
    }
    const DrawerFooter = () => {
        return <div className="d-flex gap-3">
            <Button className="btn-outline w-100" onClick={() => { setCheckedVals(initialState); setIsDrawerOpen(false); }}>Clear</Button>
            <Button className="btn-filled w-100" onClick={() => { getProducts(); setIsDrawerOpen(false) }}>Apply</Button>
        </div>
    }
    if (newType !== "Male" && newType !== "Female" && newType !== "Children") {
        return <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" className="btn-filled" onClick={() => navigate('/')}>Back Home</Button>}
        />
    }

    // optimizing
    const MemoizedBnbCard = useMemo(() => React.memo(BnbCard), [])
    const MemoizedBreadCrumb = useMemo(() => React.memo(Breadcrumb), [])
    const MemoizedSelect = useMemo(() => React.memo(Select), [])

    return <div className="product-catalog">
        <div className="px-2 px-sm-4 px-md-5 py-4 d-flex justify-content-between align-items-center">
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <MemoizedBreadCrumb items={breadCrumbItems} />
                </Suspense>
                <h1 className="m-0">{ShoesFor}'s Shoes</h1>
            </div>
            {width > 768 &&
                <Suspense fallback={<p>Loading...</p>}>
                    <MemoizedSelect className="align-self-end" placeholder="Sort by" options={sortBy} style={{ width: 200 }} size="large" allowClear onChange={handleSort} value={checkedVals[4][0]} disabled={isDisabled} />
                </Suspense>}
            {
                width <= 768 && <>
                    <Button className="align-self-end" onClick={() => setIsDrawerOpen(true)}>Filter <FilterOutlined style={{ verticalAlign: "0" }} /></Button>
                    <Drawer open={isDrawerOpen} placement="bottom" key="bottom" title="Filter" onClose={() => setIsDrawerOpen(false)} height="80dvh" footer={<DrawerFooter />}>
                        {<DrawerBody />}
                    </Drawer>
                </>
            }
        </div>
        <div className="row justify-content-center align-items-start px-3 main-div me-0">
            {
                width > 768 && <div className="col-3 col-xxl-2 filter mb-3">
                    <div className="d-flex align-items-center mb-2">
                        <p className="fw-bold fs-5 m-0">Filter <FilterOutlined style={{ verticalAlign: "0" }} /></p>
                        {clearFilterBtn && <Button type="text" className="btn-outline d-flex align-items-center ms-auto" size="small" disabled={isDisabled} onClick={handleClearFilters}>Clear <CloseOutlined /></Button>}
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
                                            children: <Checkbox.Group disabled={isDisabled} options={option.options} value={checkedVals[option.index]} onChange={val => handleCheckBox(val, option.index)} />,
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
                                    children: <Size />,
                                },
                            ]}
                        />
                        <div>
                            <Button className="btn-filled w-100 py-2" type="primary" onClick={() => getProducts()} disabled={isDisabled}>Filter</Button>
                        </div>
                    </div>
                </div>
            }
            <div className="col-12 col-md-9">
                <div style={{ minHeight: "50dvh" }}>
                    {
                        firstLoading ? <Loader />
                            :
                            <div className="row">
                                {state?.map((product, index) => (
                                    <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center d-md-block" key={index}>
                                        <MemoizedBnbCard data={product} />
                                    </div>
                                ))}
                                {
                                    state.length === 0 ? <div className="mx-auto"><Empty /></div>
                                        : isError && <div className="d-flex justify-content-center align-items-center ">
                                            <Result
                                                status="warning"
                                                title="Something went wrong!"
                                                extra={
                                                    <Button type="primary" className="btn-filled" onClick={() => getProducts()}>
                                                        Refresh
                                                    </Button>
                                                }
                                            />
                                        </div>
                                }
                            </div>
                    }
                </div>
                <div style={{ height: 42 }} className="mb-5">
                    {loading && <Loader />}
                </div>
            </div>
        </div>
    </div>
}

export default Catalog