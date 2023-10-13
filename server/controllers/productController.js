const asyncHandler = require('express-async-handler')
const uploadImage = require('../controllers/uploadImage')

const Product = require('../models/productModel')

// @desc     Get products
// @route    GET /api/products
// @access   PUBLIC
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Get single product details
// @route    GET /api/products/:id
// @access   PUBLIC
const getProductDetails = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Get recent products
// @route    GET /api/products/recent
// @access   PUBLIC
const getRecentProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(req.body.limit)
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Get filtered products
// @route    GET /api/products/filter
// @access   PUBLIC
const getFilteredProducts = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const filteredProducts = await Product.find(req.body)
        res.status(200).json(filteredProducts)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Add product
// @route    POST /api/products
// @access   PRIVATE 
const addProduct = asyncHandler(async (req, res) => {

    try {
        const { images, ...productData } = req.body
        if (req.user.type !== "admin") {
            res.status(500).json({ message: "Not authorized for this action!" })
            return
        }
        if (!Array.isArray(images)) {
            res.status(400).json({ message: "Images must be provided as an array" });
            return;
        }
        const imageUrls = []
        for (const image of images) {
            const url = await uploadImage(image)
            imageUrls.push(url)
        }

        productData.images = imageUrls

        const product = new Product(productData)
        await product.validate()

        const createdProduct = await Product.create(productData)

        res.status(200).json(createdProduct)
    } catch (error) {
        // Handle validation or other errors
        const errorMessages = [];
        if (error.errors) {
            Object.values(error.errors).forEach((err) => {
                errorMessages.push(err.message);
            });
        } else {
            errorMessages.push(error.message);
        }
        res.status(400).json({ errors: errorMessages });
    }
})

// @desc     Update product
// @route    PUT /api/products/:id
// @access   PRIVATE 
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { ...productData } = req.body
        //Get Product by id
        // const product = Product.findById(req.params.id)
        // if (!product) {
        //     res.status(400)
        //     throw new Error('Product not found!')
        // }
        await Product.findByIdAndUpdate(req.params.id, { $set: productData }, { new: true })
        res.status(200).json({ message: "Product updated!" })
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   PRIVATE
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        if (req.user.type !== "admin") {
            res.status(500).json({ message: "Not authorized for this action!" })
            return
        }
        //Get product by id
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(400)
            throw new Error('Product not found!')
        }
        await product.deleteOne()
        res.status(200).json({ message: "Product deleted successfully!" })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getProducts,
    getProductDetails,
    getRecentProducts,
    getFilteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}