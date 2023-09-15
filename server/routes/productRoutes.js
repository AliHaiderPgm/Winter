const express = require('express')
const router = express.Router()
const { getProducts, addProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const { uploadImageController } = require('../controllers/imageController')

router.route('/').get(protect, getProducts).post(protect, addProduct)

router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct).get(protect, getProductDetails)

router.route('/uploadImage').post(uploadImageController)


module.exports = router