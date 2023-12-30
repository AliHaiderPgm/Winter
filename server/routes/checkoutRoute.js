const express = require('express')
const { checkoutController, confirmOrder, newOrder, getAllOrders, getMyOrders } = require('../controllers/checkoutController')
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/create-checkout-session', checkoutController)
router.post('/confirm-order', confirmOrder)
router.post('/newOrder', newOrder)
router.get('/orders', getAllOrders)
router.get('/getMyOrders', protect, getMyOrders)

module.exports = router