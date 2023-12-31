const mongoose = require("mongoose")

const tokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamp: true
})

module.exports = mongoose.model("Token", tokenSchema)