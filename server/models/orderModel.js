const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: Object,
        required: [true, "Please add user data!"]
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
    orderId: {
        type: Number,
        required: [true, "Order id is missing!"]
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