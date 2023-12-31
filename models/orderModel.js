const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Object,
        required: [true, "Please add receiver's details!"]
    },
    order: {
        type: Array,
        required: [true, "Please add order details!"]
    },
    status: {
        type: String,
        required: [true, "Please add order status!"]
    },
    orderNumber: {
        type: Number,
        required: [true, "Order id is missing!"]
    },
    subTotal: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    total: {
        type: Number,
    },
    deliveryCharges: {
        type: Number,
    },
    paymentMethod: {
        type: String,
        required: [true, "Please provide paymentMethod!"]
    },
    paymentDetails: {
        type: Object,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)