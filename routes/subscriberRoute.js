const express = require('express')
const router = express.Router()
const { subscribeToNewsletter } = require('../controllers/subscriberController')

router.post('/', subscribeToNewsletter)

module.exports = router
