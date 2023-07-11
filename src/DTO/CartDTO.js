class CartDTO {
    constructor(params) {
        this.products = params.products ? params.products : []
    }
}

module.exports = CartDTO