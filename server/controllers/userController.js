const jwt = require('jsonwebtoken')
const bycrpt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc     Create a new user
// @route    POST /api/users
// @access   PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, type } = req.body

        if (!name || !email || !password || !type) {
            res.status(400)
            throw new Error('Please enter all fields')
        }

        //Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        //Hash Password
        const salt = await bycrpt.genSalt(10)
        const hashedPassword = await bycrpt.hash(password, salt)

        //Create new user
        const user = await User.create({
            name,
            email,
            type,
            password: hashedPassword
        })

        if (user) {
            res.cookie('accessToken', generateToken(user._id), { expires: new Date(Date.now() + 2592000000), httpOnly: true, path: '/' })
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to register!')

    }
})

// @desc     Authenticate user
// @route    POST /api/users/login
// @access   PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (email && (await bycrpt.compare(password, user.password))) {
            res.cookie('accessToken', generateToken(user._id), { expires: new Date(Date.now() + 2592000000), httpOnly: true, path: '/' })
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(401)
        throw new Error('Failed to login!')
    }
})
// @desc     logout user
// @route    GET /api/users/logout
// @access   PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
    console.log(req.session)
    try {
        res.setHeader('set-cookie', 'accessToken=; max-age=0');

        // res.clearCookie('accessToken', { domain: 'localhost', path: '/' })
        // res.cookie('accessToken', generateToken(getRandomId()), { expires: new Date(Date.now() + 2592000000), httpOnly: true, path: '/' })
        res.status(200).json({ message: "Logged out successfully!" })
        // await req.user.save()
    } catch (error) {
        res.status(401)
        throw new Error('Failed to logout!')
    }
})


// @desc     Get user data
// @route    GET /api/users/me
// @access   PRIVATE
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// Generate random id
const getRandomId = () => Math.random()

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}