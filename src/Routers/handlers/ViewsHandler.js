const CartManager = require("../../Controllers/CartManager")
const ProductManager = require("../../Controllers/ProductManager")

class ViewsHandler {
    constructor() {
        this.pm = new ProductManager()
        this.cm = new CartManager()
    }

    async loggedInView(request, response) {
        const data = await this.pm.getProducts()

        response.render("layouts/home", {
            products: data.docs,
            title: "Productos en vivo",
            user: request.signedCookies['user'],
            role: request.signedCookies['role']
        })
    }

    async noSensibleInfo(request, response) {
        const data = await this.pm.getProducts()

        response.render("layouts/home", {
            products: data.docs,
            title: "Productos en vivo",
            user: request.signedCookies['user'],
            role: request.user.role
        })
    }

    updateproducts(request, response) {
        response.render("layouts/realTimeProducts", { title: "Subida de productos" })
    }

    async paginatedProducts(request, response) {
        const { page } = request.body
        const data = await this.pm.getLimitedProducts({}, { limit: 10 })

        response.render('layouts/paginatedProducts', {
            title: "Productos",
            products: data.docs,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.prevLink,
            nextLink: data.nextLink
        })
    }

    async cartProducts(request, response) {
        const { cid } = request.params
        const data = await this.cm.listProducts(cid)

        response.render('layouts/paginatedProducts', {
            title: "Productos del carrito",
            products: data,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.prevLink,
            nextLink: data.nextLink
        })
    }
}

module.exports = ViewsHandler