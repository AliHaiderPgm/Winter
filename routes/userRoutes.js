const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, logoutUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/me', protect, getMe)
router.get('/getAllUsers', getAllUsers)
router.put('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)

module.exports = router