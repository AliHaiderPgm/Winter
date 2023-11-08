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
const filterProducts = asyncHandler(async (req, res) => {
    try {
        const { field, value, page, prices, types, sizes, brands, order } = req.body.params
        // Pagination
        const obj = {}
        if (field && value) {
            obj[field] = value
        }
        const pageVal = parseInt(page) || 1
        const perPage = 8
        const skip = (pageVal - 1) * perPage

        // Filter
        //by size
        if (sizes && sizes.length > 0) {
            const stringSizes = sizes.map(size => size.toString())
            obj.sizes = { $in: stringSizes }
        }
        //by shoe type
        if (types && types.length > 0) {
            obj.type = { $in: types }
        }
        //by shoe brand
        if (brands && brands.length > 0) {
            obj.brand = { $in: brands }
        }
        //by price range
        if (prices && prices.length > 0) {
            const range = prices.map(price => {
                const [min, max] = price.split('-')
                return {
                    price: {
                        $gte: parseFloat(min),
                        $lte: parseFloat(max)
                    }
                }
            })
            obj.$or = range
        }
        //sort by date
        let sortByDate = 1
        if (order && order[0] === "newest") {
            sortByDate = -1
        }

        const data = await Product.find(obj).sort({ createdAt: sortByDate }).skip(skip).limit(perPage)

        // sort products
        if (order[0] === "acs") {
            data.sort((a, b) => a.price - b.price)
        }
        if (order && order[0] === "desc") {
            data.sort((a, b) => b.price - a.price)
        }

        res.status(200).json(data)
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
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct,
}