const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateMe, updatePassword, logoutUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { uploadImageController } = require('../controllers/imageController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/me', protect, getMe)
router.put('/me', protect, updateMe)
router.put('/me/password', protect, updatePassword)
router.post('/profile-image', protect, uploadImageController)
router.get('/getAllUsers', getAllUsers)
router.put('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)

module.exports = router