class ProductManager{
    constructor(){
        this.products = []
        this.lastId = 0
        this.model = {
            title: "",
            description: "",
            price: 0,
            thumbnail: "",
            code: 0,
            stock: 0
        }
    }

    addProduct(obj){
        if (obj.hasOwnProperty("code")){
            return "The product has a code. This shouldn't be the case."
        }

        for (const key in this.model) {
            if (!(key in obj) && key !== "code") {
                return `${key} is needed.`
            }
        }

        const newObj = {
            ... obj,
            ID: this.lastId + 1,
            code: 0
        }
        this.lastId += 1
        this.products.push(newObj)
        return newObj
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        return this.products.find( element => element.ID === id )
    }
}

module.exports = ProductManager