const { CartDAO } = require('../DAOs/mongoDB/CartDAO');

class CartManager {

    async createCart() {
        return await CartDAO.create({})
    }

    async addProduct(cid, productID) {
        const workingCart = await CartDAO.findById(cid)
        const productIndex = workingCart.products.findIndex(prod => prod._id === productID)
        if (productIndex >= 0) {
            // Si tiene el producto, agregar 1
            console.log("Tiene el producto");
            workingCart.products[productIndex].quantity += 1
        } else {
            // Si no tiene el producto, agregarlo
            console.log("No tiene el producto");
            workingCart.products.push({ _id: productID, quantity: 1 })
        }
        return await CartDAO.updateOne({ _id: cid }, { products: workingCart.products })
    }

    async listProducts(cid) {
        const workingCart = await CartDAO.findById(cid)
        return workingCart.products
    }

}

module.exports = CartManager