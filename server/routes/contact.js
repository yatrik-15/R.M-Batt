const express = require('express');
const router = express.Router();
const {
    submitContactForm,
    getAllContacts,
    updateContactStatus,
} = require('../controllers/contactController');

// Public route
router.post('/', submitContactForm);

// Admin routes
router.get('/', getAllContacts);
router.patch('/:id/status', updateContactStatus);

module.exports = router;
