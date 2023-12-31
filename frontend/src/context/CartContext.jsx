import { createContext, useContext, useEffect, useRef, useState } from "react"
import { getRandomId } from "../global"
import { message } from "antd"
import axios from "axios"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const log = useRef(true)
    const { user } = useAuth()
    const successMessage = "Added to Cart!"
    const errorMessage = "Something went wrong!"
    // const API_URL = `${import.meta.env.VITE_API_URL}/checkout`
    const API_URL = `${window.location.origin}/api/checkout`

    const getCartProducts = () => {
        const dataObj = JSON.parse(localStorage.getItem("cartItems"))
        setProducts(dataObj ? dataObj : [])
    }
    useEffect(() => {
        if (log) {
            getCartProducts()
            log.current = false
        }

        window.addEventListener("storage", getCartProducts)
        return () => {
            window.removeEventListener("storage", getCartProducts)
        }
    }, [])

    useEffect(() => {
        const val = products.map(i => {
            const quantity = i.quantity
            const price = i.product.price
            return quantity * price

        }).reduce((acc, val) => acc + val, 0)
        setSubTotal(val)
        const totalTax = Math.round(0.18 * val)
        setTax(totalTax)
    }, [products])

    const totalQuantity = (e) => {
        return products
            .filter(item => item.product._id === e.product._id)
            .reduce((acc, item) => acc + item.quantity, 0)
    }

    const addToCart = (newData) => {
        getCartProducts()
        const checkProduct = products.some(e => e.product._id === newData.product._id)
        const matchedProducts = products.filter(e => e.product._id === newData.product._id)
        const checkSize = matchedProducts.some(e => e.size === newData.size)

        const totalCount = totalQuantity(newData) + newData.quantity
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

    const updateCart = (newData) => {
        // console.log(newData)
        // const checkProduct = products.some(e => e.product._id === newData.product._id)
        // const matchedProducts = products.filter(e => e.product._id === newData.product._id)
        // const checkSize = matchedProducts.some(e => e.size === newData.size)

        // const totalCount = totalQuantity(newData)
        // if (totalCount > 10) {
        //     message.error("Sorry, you have reached the quantity limit. Please remove an item and try again.")
        //     return
        // }

        const productIndex = products.findIndex(e => e.cartId === newData.cartId)
        const array = [...products]
        array[productIndex] = newData
        localStorage.setItem("cartItems", JSON.stringify(array))
        // if (checkSize && checkProduct) {
        // }
        getCartProducts()
    }

    //------------CHECKOUT------------// 
    //ONLINE
    const orderDetails = {
        user,
        order: products,
        status: "pending",
        subTotal,
        tax,
        total: subTotal + tax,
    }
    const payment = async (e) => {
        try {
            const newData = {
                user,
                receiver: e,
                order: products,
                status: "pending",
                total: subTotal + tax,
                subTotal,
                tax,
            }
            const res = await axios.post(`${API_URL}/create-checkout-session`, newData)
            // localStorage.setItem('checkout-session', JSON.stringify(res.data))
            window.location = res.data.sessionUrl
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
    //CASH ON DELIVERY
    const placeOrder = async (e) => {
        const data = {
            ...orderDetails,
            receiver: e
        }

        const res = await axios.post(`${API_URL}/newOrder`, data)
        return res
    }

    const getMyOrders = async () => {
        const config = {
            withCredentials: true,
        }
        const res = await axios.get(`${API_URL}/getMyOrders`, config)
        return res.data
    }

    //-------------CONFIRM ORDER----------//
    const confirmOrder = async (id) => {
        const res = await axios.post(`${API_URL}/checkout/confirm-order?orderNumber=${id}&userId=${user._id}`)
        return res
    }

    const contextValue = {
        products,
        getCartProducts,
        updateCart,
        addToCart,
        removeFromCart,
        totalQuantity,
        subTotal,
        tax,
        payment,
        placeOrder,
        getMyOrders,
        confirmOrder
    }
    return (
        <>
            <CartContext.Provider value={contextValue}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

export const useCart = () => {
    return useContext(CartContext)
}