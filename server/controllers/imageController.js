const asyncHandler = require('express-async-handler')
const uploadImage = require('./uploadImage')
const uploadImageController = asyncHandler(async (req, res) => {
    try {
        const url = await uploadImage(req.body.base64)
        res.status(200).json({ url })
    } catch (error) {
        res.status(400).json({ message: "Failed to upload image!" })
    }
})

module.exports = {
    uploadImageController
}