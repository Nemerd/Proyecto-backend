const { CartDAO } = require('../DAOs/Factory');
const CartDTO = require('../DTO/CartDTO');


class CartManager {

    // Repository implementado como Manager
    async createCart() {
        return await CartDAO.create(new CartDTO({}))
    }

    async showCart(cid){
        return await CartDAO.findById(cid)
    }

    async addProduct(cid, productID, byAmmount = 1) {
        const workingCart = await CartDAO.findById(cid)
        const productIndex = workingCart.products.findIndex(prod => prod.product == productID)
        if (productIndex >= 0) {
            // Si tiene el producto, agregar 1
            workingCart.products[productIndex].quantity += parseInt(byAmmount)
        } else {
            // Si no tiene el producto, agregarlo
            workingCart.products.push({ product: productID, quantity: byAmmount })
        }
        return await CartDAO.updateOne({ _id: cid }, { products: workingCart.products })
    }

    async listProducts(cid) {
        const workingCart = await CartDAO.findById(cid).populate('products.product')
        return workingCart.products
    }

    async removeProduct(cid, droductID){
        const workingCart = await CartDAO.findById(cid)
        const productIndex = workingCart.products.findIndex(prod => prod.product == productID)
        workingCart.splice(productIndex, 1)
        return CartDAO.updateOne({ _id: cid }, { products: workingCart.products })
    }

    async resetCart(cid){
        return CartDAO.updateOne({_id:cid}, {products: []})
    }
}

module.exports = CartManager