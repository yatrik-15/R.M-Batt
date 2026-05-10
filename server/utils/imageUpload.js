const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');

/**
 * Configure multer for temporary file storage
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Temporary folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

/**
 * Upload image to Cloudinary and delete local file
 */
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'rm-batt-signage',
            transformation: [
                {
                    width: 1920,
                    height: 1080,
                    crop: 'limit',
                    quality: 'auto:good',
                    fetch_format: 'auto',
                },
            ],
        });

        // Delete local file after upload
        const fs = require('fs');
        fs.unlinkSync(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

/**
 * Delete image from Cloudinary
 */
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

/**
 * Generate responsive image URLs
 */
const getResponsiveUrls = (publicId) => {
    return {
        thumbnail: cloudinary.url(publicId, {
            width: 400,
            height: 300,
            crop: 'fill',
            quality: 'auto:good',
            fetch_format: 'auto',
        }),
        medium: cloudinary.url(publicId, {
            width: 800,
            height: 600,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto',
        }),
        large: cloudinary.url(publicId, {
            width: 1920,
            height: 1080,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto',
        }),
    };
};

module.exports = {
    upload,
    uploadToCloudinary,
    deleteImage,
    getResponsiveUrls,
};
