const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIP_PRIVATE_KEY)
const Products = require('../models/productModel')

// const storeItems = new Map([
//     [1, { price: 10000, name: "Learn React Today" }],
//     [2, { price: 20000, name: "Learn CSS Today" }],
// ])

const checkoutController = asyncHandler(async (req, res) => {
    try {
        const cartItems = req.body.items
        const itemsIds = cartItems.map(item => { return item.product._id })
        const storeItems = await Products.find({ _id: { $in: itemsIds } })

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
            success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        })
        // console.log(session)
        res.status(200).json({ url: session.url })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
})

const confirmOrder = asyncHandler(async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        // console.log(session)
        // const customer = await stripe.customers.retrieve(session.id);
        // console.log(customer)

        res.status(200).json(session.customer_details)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
    checkoutController,
    confirmOrder
}