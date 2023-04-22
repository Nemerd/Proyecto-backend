const fs = require("fs")

class ProductManager {
    constructor(route) {
        this.products = []
        this.lastId = 0
        this.model = {
            code: 0,
            title: "",
            description: "",
            price: 0,
            thumbnail: "",
            stock: 0
        }
        this.route = route
        fs.writeFileSync(this.route, JSON.stringify(this.products), err => console.log(err))
        this.encoding = "utf-8"
    }

    readAndUpdateProducts() {
        this.products = JSON.parse(fs.readFileSync(this.route, this.encoding))
    }

    writeToFile() {
        fs.writeFileSync(this.route, JSON.stringify(this.products))
    }

    addProduct(obj) {

        // Chequear que no se dupliquen los códigos
        for (const element of this.products) {
            if (obj.code === element.code) {
                return "Error: Código existente"
            }
        }

        // Chequear los campos obligatorios
        for (const key in this.model) {
            if (!(key in obj)) {
                return `${key} is needed.`
            }
        }

        // Agregar el ID del objeto
        const newObj = {
            ...obj,
            ID: this.lastId + 1
        }

        this.lastId += 1
        this.products.push(newObj)
        this.writeToFile()

        return newObj
    }

    getProducts() {
        this.readAndUpdateProducts()
        return this.products
    }

    getProductById(id) {

        this.readAndUpdateProducts()

        if (!id || !this.products.find(element => element.ID === parseInt(id))) {
            return "Error: Not found"
        } else {
            return this.products.find(element => element.ID === parseInt(id))
        }
    }

    updateProduct(id, newProperties) {
        const originalProduct = this.getProductById(parseInt(id))
        if (newProperties.ID) {
            delete newProperties.ID
        }
        const updatedProduct = { ...originalProduct, ...newProperties }

        const replaceIndex = this.products.findIndex(obj => obj.ID === parseInt(id))
        this.products[replaceIndex] = updatedProduct

        this.writeToFile()
    }

    deleteProduct(id) {
        const deleteIndex = this.products.findIndex(obj => obj.ID === parseInt(id))
        if (deleteIndex < 0) {
            return "Error: Product ID not found"
        }
        this.products.splice(deleteIndex, 1)
        this.writeToFile()
    }
}

module.exports = ProductManager