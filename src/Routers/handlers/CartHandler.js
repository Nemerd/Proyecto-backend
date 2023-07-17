const CartManager = require('../../Controllers/CartManager');
const { ProductDAO } = require('../../DAOs/mongoDB/ProductDAO');

class CartHandler {
    constructor() {
        this.cm = new CartManager()
    }

    async createCart(request, response) {
        // Crear carrito
        response.send(await this.cm.createCart())
    }

    async listCartProducts(request, response) {
        // DONE Traer todos los productos completos mediante un “populate”.
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

    async updateSpecificProduct(request, response){
        /* DONE Actualizar SÓLO la cantidad de ejemplares
        * del producto por cualquier cantidad pasada desde req.body
        */
        const { cid, pid } = request.params
        const { amount } = request.body
        response.send(await this.cm.addProduct(cid, pid, amount))
    }

    async updateCart(request, response){
        /* DONE Actualizar el carrito con un arreglo de productos
        * con el formato especificado arriba.
        */
        const { cid } = request.params
        const { updateMany } = request.body

        updateMany.forEach(prod => {
            this.cm.addProduct(cid, prod.pid, prod.ammount)
        });

        response.send(await this.cm.showCart())

    }

    async resetCart(request, response){
        // DONE Eliminar todos los productos del carrito
        const { cid } = request.params
        response.send(await this.cm.resetCart())
    }

    async deleteProduct(request, response){
        // DONE Eliminar del carrito el producto seleccionado.
        const { cid, pid } = request.params
        response.send(await this.cm.removeProduct(cid, pid))
    }
}

module.exports = CartHandler