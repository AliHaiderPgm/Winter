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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)