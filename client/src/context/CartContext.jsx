import { createContext, useContext, useEffect, useRef, useState } from "react"
import { getRandomId } from "../global"
import { message } from "antd"

const CartContext = createContext()
const CartContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const log = useRef(true)
    const successMessage = "Added to Cart!"
    const errorMessage = "Something went wrong!"

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

    const handleTotalQuantity = (e) => {
        return products
            .filter(item => item.product._id === e.product._id)
            .reduce((acc, item) => acc + item.quantity, 0)
            + e.quantity
    }

    const addToCart = (newData) => {
        getCartProducts()
        const checkSize = products.some(e => e.size === newData.size)
        const checkProduct = products.some(e => e.product._id === newData.product._id)
        const totalCount = handleTotalQuantity(newData)

        if (totalCount > 10) {
            message.error("Sorry, you have reached the quantity limit. Please remove an item and try again.")
            return
        }

        if (checkProduct && checkSize) {
            const data = products.map((item) =>
                item.product._id === newData.product._id && item.size === newData.size
                    ? { ...item, quantity: item.quantity + newData.quantity }
                    : item
            )
            localStorage.setItem("cartItems", JSON.stringify(data))
            message.success(successMessage)
            getCartProducts()
            return
        }

        const data = {
            ...newData,
            cartId: getRandomId()
        }
        products.push(data)
        localStorage.setItem("cartItems", JSON.stringify(products))
        message.success(successMessage)
        getCartProducts()
    }


    const removeFromCart = (data) => {
        const leftOver = products.filter(e => e.cartId !== data.cartId)
        localStorage.setItem("cartItems", JSON.stringify(leftOver))
        getCartProducts()
    }


    const updateCart = (data) => {
        const checkSize = products.some(e => e.size === data.size)
        const checkProduct = products.some(e => e.product._id === data.product._id)
        if (checkSize && checkProduct) {
            const productIndex = products.findIndex(e => e.cartId === data.cartId)
            const array = [...products]
            array[productIndex] = data
            localStorage.setItem("cartItems", JSON.stringify(array))
        }
        getCartProducts()
    }
    return (
        <>
            <CartContext.Provider value={{ products, updateCart, addToCart, removeFromCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

export const useCart = () => {
    return useContext(CartContext)
}