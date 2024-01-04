const express = require('express')
const { checkoutController, confirmOrder, newOrder, getAllOrders, getMyOrders, updateOrder } = require('../controllers/checkoutController')
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/create-checkout-session', checkoutController)
router.post('/confirmOrder', confirmOrder)
router.post('/newOrder', newOrder)
router.get('/orders', getAllOrders)
router.get('/getMyOrders', protect, getMyOrders)
router.post('/updateOrder/:id', protect, updateOrder)

module.exports = router