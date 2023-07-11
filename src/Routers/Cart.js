const { Router } = require("express");
const Cart = Router();
const CartHandler = require("./handlers/CartHandler.js");

const ch = new CartHandler()

Cart.post("/", async (req, res) => ch.createCart(req, res));

Cart.get("/:cid", async (req, res) => ch.listCartProducts(req, res));

Cart.post("/:cid/product/:pid", async (req, res) => ch.addProductToCart(req, res));

module.exports = Cart;