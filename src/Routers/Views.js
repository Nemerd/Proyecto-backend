const { Router } = require("express");
const { ProductManager } = require("../libs/ProductManager");
const Views = Router()

const pm = new ProductManager()

Views.get("/hbs", (request, response) => {
    response.render("layouts/home", {
        products: pm.getProducts(),
        title: "Productos en vivo",
        user: request.signedCookies['user'],
        role: request.signedCookies['role']
    })
});

Views.get("/realtimeproducts", (request, response) => {
    response.render("layouts/realTimeProducts", { title: "Subida de productos" })
})

module.exports = Views