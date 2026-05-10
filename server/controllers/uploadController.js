const { upload, uploadToCloudinary } = require('../utils/imageUpload');

/**
 * Upload single image to Cloudinary
 */
const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image file',
            });
        }

        // Upload to Cloudinary
        const imageData = await uploadToCloudinary(req.file.path);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: imageData,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message,
        });
    }
};

/**
 * Upload multiple images to Cloudinary
 */
const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image',
            });
        }

        // Upload all images to Cloudinary
        const uploadPromises = req.files.map((file) => uploadToCloudinary(file.path));
        const images = await Promise.all(uploadPromises);

        res.status(200).json({
            success: true,
            message: `${images.length} images uploaded successfully`,
            data: images,
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: error.message,
        });
    }
};

module.exports = {
    upload,
    uploadSingleImage,
    uploadMultipleImages,
};
