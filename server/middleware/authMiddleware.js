const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { getTokenFromCookie } = require('../utils/global')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.cookie) {
        try {
            token = getTokenFromCookie(req.headers.cookie, "accessToken");
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Get user from token
            req.user = await User.findById(decoded.id).select('-password')
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