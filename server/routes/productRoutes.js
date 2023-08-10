const express = require('express')
const router = express.Router()
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const multer = require('multer')
const path = require('path')
const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.route('/').get(getProducts).post(upload.array("images", 5), addProduct)

router.route('/:id').put(updateProduct).delete(deleteProduct)

module.exports = router