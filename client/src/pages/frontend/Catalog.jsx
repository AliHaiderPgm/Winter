import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { message } from "antd"
import Loader from "../../components/shared/Loader"
import BnbCard from "../../components/shared/BnbCard"

const Catalog = () => {
    const { type } = useParams()
    const [loading, setLoading] = useState(false)
    const { GetCustomizedProducts } = useProduct()
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const log = useRef(true)

    const getScrollProducts = async () => {
        try {
            setLoading(true)
            const res = await GetCustomizedProducts("shoefor", type, page)
            setProducts(prev => [...prev, ...res])
        } catch (error) {
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const handleScroll = () => {
        if (document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight) {
            log.current = true
            setPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        if (log.current) {
            getScrollProducts()
            log.current = false
        }
    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    return (
        <div className="row p-4">
            <div className="col-3">
                <p>Hello world!</p>
            </div>
            <div className="col-9 d-flex">
                <div className="row">
                    {
                        products?.map((product, index) => {
                            return <div className="col-3 flex-fill mb-4" key={index}>
                                <BnbCard data={product} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Catalog