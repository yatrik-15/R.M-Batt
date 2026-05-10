const express = require('express');
const router = express.Router();
const {
    upload,
    uploadSingleImage,
    uploadMultipleImages,
} = require('../controllers/uploadController');

// Upload routes
router.post('/single', upload.single('image'), uploadSingleImage);
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

module.exports = router;
