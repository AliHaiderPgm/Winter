const express = require('express')
const checkoutController = require('../controllers/checkoutController')
const router = express.Router()

router.post('/create-checkout-session', checkoutController)

module.exports = router