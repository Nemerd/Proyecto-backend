class ProductDTO {
    constructor(param) {
        this.code = param.code ? param.code : Date.now();
        this.title = param.title
        this.description = param.description
        this.price = param.price
        this.thumbnail = param.thumbnail
        this.stock = param.stock
    }

}

module.exports = ProductDTO