const supabase = require('../config/supabase');
const { sendQuoteEmail } = require('../utils/emailService');

/**
 * Submit quote request
 */
const submitQuoteRequest = async (req, res) => {
    try {
        const { name, email, phone, projectType, message, budget } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, phone, and project details',
            });
        }

        // Save to database
        const { data, error } = await supabase
            .from('quotes')
            .insert([
                {
                    name,
                    email,
                    phone,
                    project_type: projectType || null,
                    message,
                    budget: budget || null,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        if (error) throw error;

        // Send email notification to admin
        try {
            await sendQuoteEmail({ name, email, phone, projectType, message, budget });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Quote request submitted successfully! We will contact you soon.',
            data: {
                id: data.id,
                created_at: data.created_at,
            },
        });
    } catch (error) {
        console.error('Error submitting quote request:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting quote request. Please try again.',
            error: error.message,
        });
    }
};

/**
 * Get all quote requests (Admin only)
 */
const getAllQuotes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('quotes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching quotes',
            error: error.message,
        });
    }
};

/**
 * Update quote status (Admin only)
 */
const updateQuoteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from('quotes')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Quote status updated',
            data: data,
        });
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating quote',
            error: error.message,
        });
    }
};

module.exports = {
    submitQuoteRequest,
    getAllQuotes,
    updateQuoteStatus,
};
