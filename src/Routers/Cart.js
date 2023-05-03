const { Router } = require("express");
const Cart = Router();
const CartManager = require("../libs/CartManager.js")

const cm = new CartManager()

Cart.post("/", async (request, response) => {
    // Crear carrito
    response.send(await cm.createCart())
});

Cart.get("/:cid", async (request, response) => {
    // Listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
    const { cid } = request.params
    response.send(await cm.listProducts(cid))

});

Cart.post("/:cid/product/:pid", async (request, response) => {
    // Deberá agregar el producto al arreglo “products” del
    // carrito seleccionado, agregándose como un objeto

    const { cid, pid } = request.params

    response.send(await cm.addProduct(cid, pid))

});


module.exports = Cart;