const express = require('express');
const router = express.Router();
const {
    submitQuoteRequest,
    getAllQuotes,
    updateQuoteStatus,
} = require('../controllers/quoteController');

// Public route
router.post('/', submitQuoteRequest);

// Admin routes
router.get('/', getAllQuotes);
router.patch('/:id/status', updateQuoteStatus);

module.exports = router;
