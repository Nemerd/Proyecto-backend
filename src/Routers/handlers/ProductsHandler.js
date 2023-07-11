const { ProductManager } = require("../../Controllers/ProductManager")

class ProductsHandler {
    constructor(route) {
        this.pm = new ProductManager()
    }

    async getAllProducts(request, response) {
        // Listar todos los productos
        const { limit } = request.query
        if (!limit) {
            response.send(await this.pm.getProducts())
        } else {
            const queryProducts = []
            for (let i = 1; i <= limit; i++) {
                queryProducts.push(await this.pm.getProductById(i))
            }
            response.send(queryProducts)
        }
    }

    async addProduct(request, response) {
        // Agregar un nuevo producto
        response.send(await this.pm.addProduct(request.body))
    }

    async getProduct(request, response) {
        // Devolver el producto seleccionado
        const pid = request.params.pid
        response.send(await this.pm.getProductById(pid))
    }

    async updateProduct(request, response) {
        // Actualizar un producto. ¡Nunca el ID!
        const { pid } = request.params
        response.send(await this.pm.updateProduct(pid, request.body))
    }

    async deleteProduct(request, response) {
        // Eliminar un producto según su ID
        response.send(await this.pm.deleteProduct(request.params.pid))
    }
}
module.exports = ProductsHandler