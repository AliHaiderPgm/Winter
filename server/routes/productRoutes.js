const express = require('express')
const router = express.Router()
const { getProducts, addProduct, updateProduct, deleteProduct, getProductDetails, getRecentProducts, getFilteredProducts } = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const { uploadImageController } = require('../controllers/imageController')

router.get('/getRecentProducts', getRecentProducts)

router.get('/getFilteredProducts', getFilteredProducts)

router.route('/').get(getProducts).post(protect, addProduct)

router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct).get(getProductDetails)

router.route('/uploadImage').post(uploadImageController)



module.exports = router