const { Router } = require("express");
const Products = Router();
const ProductManager = require("../libs/ProductManager")

const pm = new ProductManager("./DBs/Products.json")

Products.get("/", async (request, response) => {
    // Listar todos los productos
    const { limit } = request.query
    if (!limit) {
        response.send(pm.getProducts())
    } else {
        const queryProducts = []
        for (let i = 1; i <= limit; i++) {
            queryProducts.push(pm.getProductById(i))
        }
        response.send(queryProducts)
    }
});

Products.get("/:pid", async (request, response) => {
    // Devolver el producto seleccionado

    const pid = parseInt(request.params.pid)
    response.send(pm.getProductById(pid))
});

Products.post("/", async (request, response) => {
    // Agregar un nuevo producto

    response.send(pm.addProduct(request.body))
});

Products.put("/:pid", async (request, response) => {
    // Actualizar un producto. ¡Nunca el ID!
    const { pid } = parseInt(request.params)
    response.send(pm.updateProduct(pid, request.body))
});

Products.delete("/:pid", async (request, response) => {
    // Eliminar un producto según su ID
    response.send(pm.deleteProduct(parseInt(request.params.pid)))
});


module.exports = Products;