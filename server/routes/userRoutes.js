const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, logoutUser, getAllUsers, updateUser, newAccessToken } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/token', newAccessToken)
router.get('/me', protect, getMe)
router.get('/getAllUsers', getAllUsers)
router.put('/update/:id', updateUser)

module.exports = router