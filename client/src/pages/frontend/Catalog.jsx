import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { message } from "antd"
import Loader from "../../components/shared/Loader"

const Catalog = () => {
    const { type } = useParams()
    const [loading, setLoading] = useState(false)
    const { GetFilteredProducts } = useProduct()
    const [products, setProducts] = useState([])
    const log = useRef(true)
    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await GetFilteredProducts({ shoefor: type })
            console.log(res)
            setProducts(res)
        } catch (error) {
            console.log(error)
            message.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (log.current) {
            getProducts()
            log.current = false
        }
    }, [])

    if (loading) {
        return <div style={{ height: "100vh" }}>
            <Loader />
        </div>
    }
    return (
        <div>Catalog</div>
    )
}

export default Catalog