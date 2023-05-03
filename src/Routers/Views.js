const { Router } = require("express");
const ProductManager = require("../DAOs/fileSystem/ProductManager");
const Views = Router()

const pm = new ProductManager("./DBs/Products.json")

Views.get("/hbs", (request, response) => {
    response.render("layouts/home", { products: pm.getProducts(), title: "Productos en vivo" })
});

Views.get("/realtimeproducts", (request, response) => {
    response.render("layouts/realTimeProducts", { title: "Subida de productos" })
})

module.exports = Views