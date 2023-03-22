const fs = require("fs")

class ProductManager{
    constructor(route){
        this.products = []
        this.lastId = 0
        this.model = {
            code: 0,
            title: "",
            description: "",
            price: 0,
            thumbnail: "",
            code: 0,
            stock: 0
        }
        this.route = route
        fs.writeFileSync(this.route, JSON.stringify(this.products), err => console.log(err))
        this.encoding = "utf-8"
    }

    readAndUpdateProducts(){
        this.products = JSON.parse(fs.readFileSync(this.route, this.encoding))
    }

    writeToFile(){
        fs.writeFileSync(this.route, JSON.stringify(this.products))
    }

    addProduct(obj){
        for (const element of this.products) {
            if (obj.code === element.code) {
                return "Error: Código existente"
            }
        }

        for (const key in this.model) {
            if (!(key in obj)) {
                return `${key} is needed.`
            }
        }

        const newObj = {
            ... obj,
            ID: this.lastId + 1
        }

        this.lastId += 1
        this.products.push(newObj)

        this.writeToFile()
        return newObj
    }

    getProducts(){
        this.readAndUpdateProducts()
        return this.products
    }

    getProductById(id){

        this.readAndUpdateProducts()

        if (!id || !this.products.find( element => element.ID === id)){
            return "Error: Not found"
        } else {
            return this.products.find( element => element.ID === id )
        }
    }
}

module.exports = ProductManager