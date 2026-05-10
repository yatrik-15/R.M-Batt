const supabase = require('../config/supabase');

/**
 * Get all signage products
 */
const getAllProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('signage_products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message,
        });
    }
};

/**
 * Get single product by ID
 */
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('signage_products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message,
        });
    }
};

/**
 * Get products by category
 */
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const { data, error } = await supabase
            .from('signage_products')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data,
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message,
        });
    }
};

/**
 * Create new product (Admin only - will add auth later)
 */
const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        const { data, error } = await supabase
            .from('signage_products')
            .insert([productData])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message,
        });
    }
};

/**
 * Update product (Admin only)
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from('signage_products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message,
        });
    }
};

/**
 * Delete product (Admin only)
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('signage_products')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
};
