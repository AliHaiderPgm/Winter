const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIP_PRIVATE_KEY)
const Products = require('../models/productModel')

const checkoutController = asyncHandler(async (req, res) => {
    try {
        const product = await Products.find()
        console.log(product)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            line_items: req.body.items.map(item => {

            }),
            success_url: 'google.com',
            cancel_url: 'facebook.com',
        })
        res.status(200).json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = checkoutController