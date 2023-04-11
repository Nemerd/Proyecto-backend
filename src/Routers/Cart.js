const { Router } = require("express");
const Cart = Router();
const CartManager = require("../libs/CartManager")

const pm = new CartManager("./DBs/Cart.json")

Cart.post("/", async (request, response) => {
    // Crear carrito
});

Cart.get("/:cid", async (request, response) => {
    // Listar los productos que pertenezcan al carrito con el parámetro cid proporcionados



});

Cart.post("/:cid/product/:pid", async (request, response) => {
    // Deberá agregar el producto al arreglo “products” del
    // carrito seleccionado, agregándose como un objeto
});


module.exports = Cart;