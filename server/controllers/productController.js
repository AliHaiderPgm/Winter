const asyncHandler = require('express-async-handler')
const uploadImage = require('../controllers/uploadImage')

const Product = require('../models/productModel')

// @desc     Get products
// @route    GET /api/products
// @access   PRIVATE 
const getProducts = asyncHandler(async (req, res) => {
    try {
        if (req.user.type !== "admin") {
            res.status(500).json({ message: "Not authorized for this action!" })
            return
        }
        const goals = await Product.find()
        res.status(200).json(goals)
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc     Add product
// @route    POST /api/products
// @access   PRIVATE 
const addProduct = asyncHandler(async (req, res) => {
    const { images, ...productData } = req.body

    try {
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
    //Get Product by id
    const product = Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('Product not found!')
    }

    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // //Make sure only update goal of logged in user
    // if (goal.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    console.log(req.body)

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedProduct)
})

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   PRIVATE
const deleteProduct = asyncHandler(async (req, res) => {
    //Get product by id
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('Product not found!')
    }

    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // //Make sure only delete goal of logged in user
    // if (goal.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    await product.deleteOne()
    res.status(200).json({ message: "Product deleted successfully!" })
})

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}