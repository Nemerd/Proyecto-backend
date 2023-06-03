const { ProductDAO } = require('../DAOs/mongoDB/ProductDAO');

class ProductManager {

    async addProduct(obj) {
        try {
            return await ProductDAO.create(obj)
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            return await ProductDAO.find({})
        } catch (error) {
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

module.exports = { ProductManager }