const CartManager = require('../../Controllers/CartManager');

class CartHandler {
    constructor() {
        this.cm = new CartManager()
    }

    async createCart(request, response) {
        // Crear carrito
        response.send(await this.cm.createCart())
    }

    async listCartProducts(request, response) {
        // Listar los productos que pertenezcan al carrito con el parámetro cid proporcionados
        const { cid } = request.params
        response.send(await this.cm.listProducts(cid))
    }

    async addProductToCart(request, response) {
        // Deberá agregar el producto al arreglo “products” del
        // carrito seleccionado, agregándose como un objeto

        const { cid, pid } = request.params
        response.send(await this.cm.addProduct(cid, pid))
    }
}

module.exports = CartHandler