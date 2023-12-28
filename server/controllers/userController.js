const jwt = require('jsonwebtoken')
const bycrpt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Token = require('../models/refreshTokenModel')


// @desc     Create a new user
// @route    POST /api/users
// @access   PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, type } = req.body

        if (!name || !email || !password || !type) {
            res.status(400)
            throw new Error('Incomplete data!')
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
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }
        const isMatch = await bycrpt.compare(password, user.password)

        if (isMatch) {
            const accessToken = generateToken(user._id)
            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET)
            const tokenData = {
                user: user._id,
                token: refreshToken
            }
            const tokenExists = await Token.findOne({ user: user._id })
            if (!tokenExists) {
                await Token.create(tokenData)
            } else {
                await Token.findOneAndUpdate({ user: user._id }, tokenData)
            }
            const secureRequest = { httpOnly: true, secure: true, sameSite: 'Strict' }
            res.cookie('accessToken', accessToken, secureRequest)
            res.cookie('refreshToken', refreshToken, secureRequest)
            res.status(200).json(user)
        } else {
            res.status(401).json({ message: "Invalid username or password!" })
        }
    } catch (error) {
        res.status(401)
        // console.log(error)
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


// @desc     Get All Users Data
// @route    GET /api/users/getAllUsers
// @access   PRIVATE
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        const response = users.map(user => {
            const { password, ...data } = user._doc
            return data
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400)
        throw new Error('Failed to get users data!')
    }
})

// @desc   update user
// @route  /api/users/update/:id
// @access PUBLIC
const updateUser = asyncHandler(async (req, res) => {
    try {
        const { ...user } = req.body
        await User.findByIdAndUpdate(req.params.id, user)
        res.status(200).json({ message: "User updated!" })
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Failed to update user!")
    }
})


const newAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.headers.cookie?.split(" ").filter(token => {
        if (token.startsWith("refreshToken")) {
            return token
        }
    })[0].split("=")[1]

    if (!refreshToken) return res.status(401).json({ message: "No token" })
    const isValid = await Token.findOne({ token: refreshToken })
    if (!isValid) return res.status(403).json({ message: "Invalid token" })

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Something went wrong" })
        const accessToken = generateToken(user.id)
        const secureRequest = { httpOnly: true, secure: true, sameSite: 'Strict' }
        res.cookie('accessToken', accessToken, secureRequest)
    })

    res.status(200).json({ message: "All set" })
})

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15s',
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    newAccessToken,
    getAllUsers,
    updateUser
}