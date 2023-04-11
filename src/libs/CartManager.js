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

    addProduct(cid, product) {
        const workingCart = this.carts.find(element => element.ID === parseInt(cid))
        const productIndex = workingCart.products.findIndex(element => element.ID === parseInt(product.ID))

        if (workingCart[productIndex]) {
            workingCart.products[productIndex] = + product[quantity]
        } else {
            workingCart.products.push([{ ID: product.ID, quantity: product.quantity }])
        }

        this.writeToFile()
    }

}

module.exports = CartManager