const express = require('express')
const { checkoutController, confirmOrder, newOrder } = require('../controllers/checkoutController')
const router = express.Router()

router.post('/create-checkout-session', checkoutController)

router.post('/confirm-order', confirmOrder)

router.post('/newOrder', newOrder)

module.exports = router