const { ProductDAO } = require('../DAOs/Factory');
const ProductDTO = require('../DTO/ProductDTO');

class ProductManager {

    // Repository implementado como Manager
    async addProduct(obj) {
        try {
            return await ProductDAO.create(new ProductDTO(obj))
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            return await ProductDAO.paginate({})
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async getProductById(id) {
        try {
            return await ProductDAO.findById(id)
        } catch (error) {
            return { error: error }
        }
    }

    async getSpecificProduct(query) {
        try {
            return await ProductDAO.findOne(query)
        } catch (error) {
            console.log(error);
        }
    }

    async getLimitedProducts(query, { limit = 10, page = 1 }) {
        return await ProductDAO.paginate(query, { limit: parseInt(limit), page: parseInt(page) })
    }

    async updateProduct(id, newProperties) {
        try {
            return await ProductDAO.findByIdAndUpdate({ _id: id }, newProperties)
        } catch (error) {
            return { error: error }
        }
    }

    async deleteProduct(id) {
        try {
            return await ProductDAO.deleteOne({ _id: id })
        } catch (error) {
            return { error: error }
        }
    }
}

module.exports = ProductManager