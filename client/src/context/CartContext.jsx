import { createContext, useContext, useEffect, useRef, useState } from "react"
import { getRandomId } from "../global"
import { message } from "antd"

const CartContext = createContext()
const CartContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const log = useRef(true)
    const getCartProducts = () => {
        const dataObj = JSON.parse(localStorage.getItem("cartItems"))
        setProducts(dataObj ? dataObj : [])
    }
    useEffect(() => {
        if (log) {
            getCartProducts()
            log.current = false
        }
    }, [])
    useEffect(() => {
        window.addEventListener("storage", getCartProducts)
        return () => {
            window.removeEventListener("storage", getCartProducts)
        }
    }, [])

    const addToCart = (newData) => {
        getCartProducts()
        const checkSize = products.some(e => e.size === newData.size)
        const checkProduct = products.some(e => e.product._id === newData.product._id)
        // let quantity = 0;
        // const an = products.map(item => {
        //     let val = 0;
        //     if (item.product._id === newData.product._id) {
        //         val + item.quantity + newData.quantity
        //     }
        //     return val
        // })
        // console.log(an)

        if (checkProduct) {
            const totalQuantity = products.reduce((acc, item) => {
                return item.product._id === newData.product._id ? acc + item.quantity + newData.quantity : acc
            }, 0)
            console.log(totalQuantity)
        }


        if (checkProduct && checkSize) {
            const data = products.map((item) =>
                item.product._id === newData.product._id && item.size === newData.size
                    ? { ...item, quantity: item.quantity + newData.quantity }
                    : item
            )
            localStorage.setItem("cartItems", JSON.stringify(data))
        } else {
            const data = {
                ...newData,
                cartId: getRandomId()
            }
            products.push(data)
            localStorage.setItem("cartItems", JSON.stringify(products))
        }
        getCartProducts()
    }
    const removeFromCart = (data) => {
        getCartProducts()
        const leftOver = products.filter(e => e.cartId !== data.cartId)
        console.log(leftOver)
    }
    return (
        <>
            <CartContext.Provider value={{ products, setProducts, addToCart, removeFromCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

export const useCart = () => {
    return useContext(CartContext)
}