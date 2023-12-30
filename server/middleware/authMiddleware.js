const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.cookie)
    let token
    if (req.headers.cookie && req.headers.cookie.startsWith("accessToken")) {
        try {
            token = req.headers.cookie.split("=")[1]
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded.user
            //Get user from token
            // req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = {
    protect,
}