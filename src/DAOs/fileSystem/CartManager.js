const fs = require("fs")

class CartManager {
    constructor(route) {
        this.carts = []
        this.lastId = 0
        this.model = {
            products: []
        }
        this.route = route
        fs.writeFileSync(this.route, JSON.stringify(this.carts), err => console.log(err))
        this.encoding = "utf-8"
    }

    readAndUpdateProducts() {
        this.carts = JSON.parse(fs.readFileSync(this.route, this.encoding))
    }

    writeToFile() {
        fs.writeFileSync(this.route, JSON.stringify(this.carts))
    }

    createCart() {

        const newObj = {
            ...this.model,
            ID: this.lastId + 1
        }

        this.lastId += 1
        this.carts.push(newObj)
        this.writeToFile()
    }

    addProduct(cid, productID) {

        // Buscamos ID del carrito
        const workingCart = this.carts.findIndex(element => element.ID === parseInt(cid))
        // Buscamos ID del producto
        const productIndex = this.carts[workingCart].products.findIndex(element => element.ID === parseInt(productID))

        if (productIndex === (-1)) {
            // Si no hay producto, se lo agrega
            this.carts[workingCart].products.push(
                { ID: parseInt(productID), quantity: 1 }
            )
        } else {
            // De lo contrario se agrega la cantidad
            this.carts[workingCart].products[productIndex].quantity += 1
        }

        this.writeToFile()
    }

    listProducts(cid) {
        const workingCart = this.carts.find(element => element.ID === parseInt(cid))
        if (workingCart) {
            return workingCart.products
        }
    }

}

module.exports = CartManager