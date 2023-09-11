const express = require('express')
const router = express.Router()
const { getProducts, addProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const asyncHandler = require('express-async-handler')
const uploadImage = require('../controllers/uploadImage')

router.route('/').get(protect, getProducts).post(protect, addProduct)

router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct).get(protect, getProductDetails)

router.post('/uploadImage', (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "ok" })
    // try {
    //     const url = await uploadImage(req.body.image)
    //     res.status(200).json({ url: `${url}` })
    // } catch (e) {
    //     res.status(400).json({ message: `Some thing went wrong ${e}!` })
    // }
})

module.exports = router