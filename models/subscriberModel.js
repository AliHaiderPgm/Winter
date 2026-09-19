const mongoose = require('mongoose')

const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email!'],
        lowercase: true,
        trim: true
    },
    source: {
        type: String,
        default: 'footer'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Subscriber', subscriberSchema)
