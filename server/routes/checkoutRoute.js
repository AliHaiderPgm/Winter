const express = require('express')
const { checkoutController, confirmOrder, newOrder, getOrders } = require('../controllers/checkoutController')
const router = express.Router()

router.post('/create-checkout-session', checkoutController)
router.post('/confirm-order', confirmOrder)
router.post('/newOrder', newOrder)
router.get('/orders', getOrders)

module.exports = router