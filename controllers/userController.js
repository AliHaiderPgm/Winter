const jwt = require('jsonwebtoken')
const bycrpt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Token = require('../models/refreshTokenModel')
// const { getTokenFromCookie } = require('../utils/global')

const CookieExpiryTime = 10 * 24 * 60 * 60 * 1000
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
            const data = {
                _id: user.id,
                name: user.name,
                email: user.email,
                type: user.type
            }
            const accessToken = generateToken(data)
            res.cookie("accessToken", accessToken, { maxAge: CookieExpiryTime })
            res.status(200).json({ data })
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
            const data = {
                _id: user.id,
                name: user.name,
                email: user.email,
                type: user.type
            }
            const accessToken = generateToken(data)
            if (req.body.remember) {
                res.cookie("accessToken", accessToken, { maxAge: CookieExpiryTime })
            } else {
                res.cookie("accessToken", accessToken)
            }
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(401)
        throw new Error('Failed to login!')
    }
})

//----------------------TOKENS------------------//
//Generate Token
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    })
}

// const newAccessToken = asyncHandler(async (req, res) => {
//     try {
//         const refreshToken = getTokenFromCookie(req.headers.cookie, "refreshToken")
//         if (!refreshToken) return res.status(401).json({ message: "No token" })
//         const isValid = await Token.findOne({ token: refreshToken })
//         if (!isValid) return res.status(403).json({ message: "Invalid token" })

//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//             if (err) return res.status(403).json({ message: "Something went wrong" })
//             const accessToken = generateToken(user.id)
//             const secureRequest = { httpOnly: true, secure: true, sameSite: 'None' }
//             res.cookie('accessToken', accessToken, secureRequest)
//             res.status(200).json({ message: "All set" })
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })


// @desc     logout user
// @route    GET /api/users/logout
// @access   PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
    try {
        // const refreshToken = getTokenFromCookie(req.headers.cookie, "refreshToken")
        // await Token.deleteOne({ token: refreshToken })
        res.clearCookie("accessToken")
        res.status(200).json({ message: "Token removed" })
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
// @desc   delete user
// @route  /api/users/delete/:id
// @access PRIVATE
// const deleteUser = asyncHandler(async (req, res) => {
//     try {
//         const { ...user } = req.body
//         await User.findByIdAndDelete(req.params.id, user)
//         res.status(200).json({ message: "User updated!" })
//     } catch (error) {
//         console.log(error)
//         res.status(400)
//         throw new Error("Failed to update user!")
//     }
// })

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    getAllUsers,
    updateUser
}