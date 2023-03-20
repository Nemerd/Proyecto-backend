class ProductManager{
    constructor(){
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
    }

    addProduct(obj){
        for (const element of this.products) {
            if (obj.code === element.code) {
                return "Error: Código existente"
            }
        }

        for (const key in this.model) {
            if (!(key in obj) && key !== "code") {
                return `${key} is needed.`
            }
        }

        const newObj = {
            ... obj,
            ID: this.lastId + 1
        }

        this.lastId += 1
        this.products.push(newObj)
        return newObj
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        if (!id || !this.products.find( element => element.ID === id)){
            return "Error: Not found"
        } else {
            return this.products.find( element => element.ID === id )
        }
    }
}

module.exports = ProductManager