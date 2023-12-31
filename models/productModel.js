const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add product name!"]
    },
    type: {
        type: String,
        required: [true, "Please add/select product type!"]
    },
    brand: {
        type: String,
        required: [true, "Please select product brand!"]
    },
    shoefor: {
        type: String,
        required: [true, "Specify product is for male/female/children!"]
    },
    description: {
        type: String,
        required: [true, "Please add description!"]
    },
    price: {
        type: Number,
        required: [true, "Please add product price!"]
    },
    colors: {
        type: Array,
        required: [true, "Please add product color!"],
        validate: {
            validator: colors => {
                return colors.length > 0
            },
            message: 'Please add at least one color!'
        }
    },
    sizes: {
        type: Array,
        required: [true, "Please add product size!"],
        validate: {
            validator: sizes => {
                return sizes.length > 0
            },
            message: 'Please add at least one size!'
        }
    },
    rating: {
        type: Number,
        required: [true, "Please add product rating!"]
    },
    reviews: {
        type: Array,
        required: [true, "Please add review field!"]
    },
    images: {
        type: Array,
        required: [true, "Please add product images!"],
        validate: {
            validator: images => {
                return images.length > 0
            },
            message: 'Please add at least one image!'
        }
    },
    stock: {
        type: Number,
        required: [true, "Please add product initial stock"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)