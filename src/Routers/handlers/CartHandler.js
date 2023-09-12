const CartManager = require('../../Controllers/CartManager');
const ProductManager = require('../../Controllers/ProductManager');
const TicketManager = require('../../Controllers/TicketManager');
const UserManager = require('../../Controllers/UserManager');
const { ProductDAO } = require('../../DAOs/mongoDB/ProductDAO');

class CartHandler {
    constructor() {
        this.cm = new CartManager()
        this.pm = new ProductManager()
        this.tm = new TicketManager()
    }

    async createCart(request, response) {
        response.send(await CartManager.createCart())
    }

    async listCartProducts(request, response) {
        const { cid } = request.params
        response.send(await this.cm.listProducts(cid))
    }

    async addProductToCart(request, response) {
        const { cid, pid } = request.params
        response.send(await this.cm.addProduct(cid, pid))
    }

    async updateSpecificProduct(request, response) {
        const { cid, pid } = request.params
        const { amount } = request.body
        response.send(await this.cm.addProduct(cid, pid, amount))
    }

    async updateCart(request, response) {
        const { cid } = request.params
        const { updateMany } = request.body

        updateMany.forEach(prod => {
            this.cm.addProduct(cid, prod.pid, prod.amount)
        });

        response.send(await this.cm.showCart())

    }

    async resetCart(request, response) {
        const { cid } = request.params
        response.send(await this.cm.resetCart())
    }

    async deleteProduct(request, response) {
        const { cid, pid } = request.params
        response.send(await this.cm.removeProduct(cid, pid))
    }

    async finishSale(request, response) {
        const { cid } = request.params
        const sale = []
        const unableToBuy = []

        const workingCart = await this.cm.showCart(cid)

        // Check stock and add it to sale
        for (const product of workingCart.products) {
            if (product.product.stock < product.quantity) {
                unableToBuy.push(product)
            } else if (product.product.stock >= product.quantity) {
                sale.push(product)
                await this.cm.removeProduct(cid, product.product.id)
            }
        }

        const amountChecker = () => {
            let amount = 0
            sale.forEach(p => amount = + (p.product.price * p.quantity))
            return amount
        }

        const getPurchaser = () => request.signedCookies['user']

        const ticket = await this.tm.createTicket({
            products: sale,
            amount: amountChecker(),
            purchaser: getPurchaser()
        })

        response.render('layouts/ticket', {
            ...ticket._doc,
            products: sale
        })
    }
}

module.exports = CartHandler