import { createContext, useContext, useEffect, useRef, useState } from "react"
import { getRandomId } from "../global"

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
        const data = {
            ...newData,
            cartId: getRandomId()
        }
        products.push(data)
        localStorage.setItem("cartItems", JSON.stringify(products))
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