const supabase = require('../config/supabase');
const { sendContactEmail } = require('../utils/emailService');

/**
 * Handle contact form submission
 */
const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message',
            });
        }

        // Save to database
        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name,
                    email,
                    phone: phone || null,
                    message,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        if (error) throw error;

        // Send email notification to admin
        try {
            await sendContactEmail({ name, email, phone, message });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                id: data.id,
                created_at: data.created_at,
            },
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form. Please try again.',
            error: error.message,
        });
    }
};

/**
 * Get all contacts (Admin only)
 */
const getAllContacts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message,
        });
    }
};

/**
 * Update contact status (Admin only)
 */
const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from('contacts')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Contact status updated',
            data: data,
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact',
            error: error.message,
        });
    }
};

module.exports = {
    submitContactForm,
    getAllContacts,
    updateContactStatus,
};
