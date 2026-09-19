const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email!'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password!']
    },
    type: {
        type: String,
        required: [true, 'Please specify user type!']
    },
    profileImage: {
        type: String,
        default: null
    },
    secondName: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    postalCode: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)