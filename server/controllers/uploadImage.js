const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
}

const uploadImage = async (image) => {
    try {
        const result = await cloudinary.uploader.upload(image, opts)
        if (result && result.secure_url) {
            return result.secure_url
        }
        else {
            console.log(error.message)
            throw new Error(error.message)
        }
    }
    catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = uploadImage