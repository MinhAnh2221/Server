const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description, product_size } = req.body;
        if (!name || !image || !type || !price || !countInStock || !rating || !description || !product_size) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All input fields are required'
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The product is required'
            });
        }

        const response = await ProductService.updateProduct(productId, data);

        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        });
    }
};
const getDetailsProduct = async (req, res) => {

    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId  is required'
            });
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(400).json({
            status: 'ERR',
            message: e
        });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(400).json({
            status: 'ERR',
            message: e
        });
    }
};
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit), Number(page), sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({
            status: 'ERR',
            message: e.message || 'Something went wrong'
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { q } = req.query;
        const products = await Product.find({ name: { $regex: q, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm', error });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,


};
