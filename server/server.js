const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, postLimiter, uploadLimiter } = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

// Import routes
const productRoutes = require('./routes/products');
const contactRoutes = require('./routes/contact');
const quoteRoutes = require('./routes/quotes');
const uploadRoutes = require('./routes/upload');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiter to all API routes
app.use('/api', apiLimiter);

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', postLimiter, contactRoutes);
app.use('/api/quotes', postLimiter, quoteRoutes);
app.use('/api/upload', uploadLimiter, uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'R.M BATT API is running',
        timestamp: new Date().toISOString(),
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to R.M BATT Signage API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            contact: '/api/contact',
            quotes: '/api/quotes',
            upload: '/api/upload',
            health: '/health',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🚀 R.M BATT Signage API Server             ║
║                                               ║
║   Server running on: http://localhost:${PORT}   ║
║   Environment: ${process.env.NODE_ENV || 'development'}                    ║
║                                               ║
║   API Endpoints:                              ║
║   • Products: /api/products                   ║
║   • Contact:  /api/contact                    ║
║   • Quotes:   /api/quotes                     ║
║   • Upload:   /api/upload                     ║
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

module.exports = app;
