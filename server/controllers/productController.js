const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')

// @desc     Get products
// @route    GET /api/products
// @access   PRIVATE 
const getProducts = asyncHandler(async (req, res) => {
    // const goals = await Goal.find({ user: req.user.id })
    // res.status(200).json(goals)
    res.status(200).json({ message: 'Get products' })
})

// @desc     Add product
// @route    POST /api/products
// @access   PRIVATE 
const addProduct = asyncHandler(async (req, res) => {
    const { name, category, description, price, color, size, rating } = req.body
    if (!name || !category || !description || !price || !color || !size || !rating) {
        res.status(400)
        throw new Error('Product details are incomplete!')
    }
    // console.log(req.file.path)
    const product = await Product.create({
        name,
        category,
        description,
        price,
        color,
        size,
        rating,
        images: req.file.path //req.file.path contains the image path
    })

    res.status(200).json(product)
    // res.status(200).json({ message: 'Product added successfully!' })
})

// @desc     Update product
// @route    PUT /api/products/:id
// @access   PRIVATE 
const updateProduct = asyncHandler(async (req, res) => {
    //Get goal by id
    // const goal = Goal.findById(req.params.id)
    // if (!goal) {
    //     res.status(400)
    //     throw new Error('Goal not found')
    // }

    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // //Make sure only update goal of logged in user
    // if (goal.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // res.status(200).json(updatedGoal)
    res.status(200).json({ message: `Update product with id ${req.params.id}` })
})

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   PRIVATE
const deleteProduct = asyncHandler(async (req, res) => {
    //Get goal by id
    // const goal = await Goal.findById(req.params.id)
    // if (!goal) {
    //     res.status(400)
    //     throw new Error('Goal not found')
    // }

    // if (!req.user) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // //Make sure only delete goal of logged in user
    // if (goal.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    // await goal.deleteOne()
    // res.status(200).json({ id: req.params.id })
    res.status(200).json({ message: `delete product with with id ${req.params.id}` })
})

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}