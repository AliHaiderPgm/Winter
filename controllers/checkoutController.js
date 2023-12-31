const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIP_PRIVATE_KEY)
const Products = require('../models/productModel')
const Order = require('../models/orderModel')


const checkoutController = asyncHandler(async (req, res) => {
    try {
        const cartItems = req.body.order
        const itemsIds = cartItems.map(item => { return item.product._id })
        const storeItems = await Products.find({ _id: { $in: itemsIds } })
        const orderNumber = randomId()

        // ---------------PAYMENT SESSION------------------//
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            line_items: cartItems.map(item => {
                const storeItem = storeItems.filter(e => e._id.toString() === item.product._id)[0]
                return {
                    price_data: {
                        currency: "pkr",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.price * 100,
                    },
                    quantity: item.quantity,
                }
            }),
            // {CHECKOUT_SESSION_ID}
            success_url: `${process.env.CLIENT_URL}/checkout/${orderNumber}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        })

        //---------------ORDER CREATION---------------------//
        if (session) {
            const data = {
                ...req.body,
                orderNumber,
                paymentMethod: "Online payment",
                paymentDetails: session
            }
            const order = await Order.create(data)

            res.status(200).json({ orderNumber, sessionUrl: session.url })
        }
    } catch (error) {
        // console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

const confirmOrder = asyncHandler(async (req, res) => {
    try {
        // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const order = await Order.findOne({ orderNumber: req.query.orderNumber, user: req.query.userId })

        if (!order) {
            return res.status(200).json("Failed to confirm order.")
        }

        res.status(200).json("Order confirmed.")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const newOrder = asyncHandler(async (req, res) => {
    try {
        const orderNumber = randomId()
        const data = {
            ...req.body,
            orderNumber,
            paymentMethod: "Cash on delivery",
            paymentDetails: {}
        }
        const order = await Order.create(data)

        res.status(200).json(order)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})

const randomId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    return randomId;
}

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find()
        const response = orders.map(user => {
            const { paymentDetails, ...data } = user._doc
            return data
        })
        // console.log(res)
        res.status(200).json(response)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        // console.log(orders)
        const response = orders.map(user => {
            const { paymentDetails, ...data } = user._doc
            return data
        })
        // console.log("res===>>>>", response)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = {
    checkoutController,
    confirmOrder,
    newOrder,
    getAllOrders,
    getMyOrders
}