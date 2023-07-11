const { Router } = require("express");
const Products = Router();
const ProductsHandler = require("./handlers/ProductsHandler");

const ph = new ProductsHandler()

Products.get("/", (req, res) => ph.getAllProducts(req, res));

Products.post("/", (req, res) => ph.addProduct(req, res));

Products.get("/:pid", (req, res) => ph.getProduct(req, res));

Products.put("/:pid", (req, res) => ph.updateProduct(req, res));

Products.delete("/:pid", (req, res) => ph.deleteProduct(req, res));

module.exports = Products;