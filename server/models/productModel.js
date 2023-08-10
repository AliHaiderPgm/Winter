const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add product name!"]
    },
    category: {
        type: String,
        required: [true, "Please add/select product category!"]
    },
    description: {
        type: String,
        required: [true, "Please add description!"]
    },
    price: {
        type: Number,
        required: [true, "Please add product price!"]
    },
    color: {
        type: String,
        required: [true, "Please add product color!"]
    },
    size: {
        type: String,
        required: [true, "Please add product size!"]
    },
    rating: {
        type: Array,
        required: [true, "Please add product rating!"]
    },
    image: {
        type: Array,
        required: [true, "Please add product images!"]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)