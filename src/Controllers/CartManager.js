const { CartDAO } = require('../DAOs/Factory');
const CartDTO = require('../DTO/CartDTO');


class CartManager {

    // Repository implementado como Manager
    static async createCart() {
        return await CartDAO.create({})
    }

    async showCart(cid) {
        return await CartDAO.findById(cid).populate('products.product')
    }

    async addProduct(cid, productID, byamount = 1) {
        const workingCart = await CartDAO.findById(cid)
        const productIndex = workingCart.products.findIndex(prod => prod.product == productID)
        if (productIndex >= 0) {
            // Si tiene el producto, agregar 1
            workingCart.products[productIndex].quantity += parseInt(byamount)
        } else {
            // Si no tiene el producto, agregarlo
            workingCart.products.push({ product: productID, quantity: byamount })
        }
        return await CartDAO.updateOne({ _id: cid }, { products: workingCart.products })
    }

    async listProducts(cid) {
        const workingCart = await CartDAO.findById({ _id: cid }).populate('products.product')
        return workingCart.products
    }

    async removeProduct(cid, productID) {
        const workingCart = await CartDAO.findById(cid)
        const productIndex = workingCart.products.findIndex(prod => prod.product == productID)
        workingCart.products.splice(productIndex, 1)
        return CartDAO.updateOne({ _id: cid }, { products: workingCart.products })
    }

    async resetCart(cid) {
        return CartDAO.updateOne({ _id: cid }, { products: [] })
    }
}

module.exports = CartManager