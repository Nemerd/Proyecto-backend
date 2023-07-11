const { ProductManager } = require("../../Controllers/ProductManager")

class ViewsHandler {
    constructor() {
        this.pm = new ProductManager()
    }

    loggedInView(request, response) {
        response.render("layouts/home", {
            products: this.pm.getProducts(),
            title: "Productos en vivo",
            user: request.signedCookies['user'],
            role: request.signedCookies['role']
        })
    }

    noSensibleInfo(request, response) {
        response.render("layouts/home", {
            products: this.pm.getProducts(),
            title: "Productos en vivo",
            user: request.signedCookies['user'],
            role: request.user.role
        })
    }

    updateproducts(request, response) {
        response.render("layouts/realTimeProducts", { title: "Subida de productos" })
    }
}

module.exports = ViewsHandler