const express = require('express')
const { checkoutController, confirmOrder } = require('../controllers/checkoutController')
const router = express.Router()

router.post('/create-checkout-session', checkoutController)

router.post('/confirm-order', confirmOrder)

module.exports = router