const { Router } = require("express");
const Products = Router();
const { ProductManager } = require("../libs/ProductManager")

const pm = new ProductManager()

Products.get("/", async (request, response) => {
    // Listar todos los productos
    const { limit } = request.query
    if (!limit) {
        response.send(await pm.getProducts())
    } else {
        const queryProducts = []
        for (let i = 1; i <= limit; i++) {
            queryProducts.push(await pm.getProductById(i))
        }
        response.send(queryProducts)
    }
});

Products.post("/", async (request, response) => {
    // Agregar un nuevo producto
    response.send(await pm.addProduct(request.body))
});

Products.get("/:pid", async (request, response) => {
    // Devolver el producto seleccionado

    const pid = request.params.pid
    response.send(await pm.getProductById(pid))
});

Products.put("/:pid", async (request, response) => {
    // Actualizar un producto. ¡Nunca el ID!
    const { pid } = request.params
    response.send(await pm.updateProduct(pid, request.body))
});

Products.delete("/:pid", async (request, response) => {
    // Eliminar un producto según su ID
    response.send(await pm.deleteProduct(request.params.pid))
});

module.exports = Products;