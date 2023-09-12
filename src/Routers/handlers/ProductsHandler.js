const ProductManager = require("../../Controllers/ProductManager")

class ProductsHandler {
    constructor(route) {
        this.pm = new ProductManager()
    }

    async getAllProducts(request, response) {

        const { limit, page } = request.query
        const { baseUrl } = request
        if (!limit) {
            const qry = await this.pm.getProducts()
            response.send({
                status: 'Success', ...qry
            })
        } else {
            const qry = await this.pm.getLimitedProducts({}, { limit: limit, page: page })
            response.send({
                status: 'Success', ...qry,
                nextLink: qry.hasNextPage ? `${baseUrl}?limit=${limit}&page=${qry.nextPage}` : null,
                prevLink: qry.hasPrevPage ? `${baseUrl}?limit=${limit}&page=${qry.prevPage}` : null
            })
        }
    }

    async addProduct(request, response) {
        response.send(await this.pm.addProduct(request.body))
    }

    async getProduct(request, response) {
        const pid = request.params.pid
        const product = await this.pm.getProductById(pid)
        response.send({ status: 'Success', ...product._doc })
    }

    async updateProduct(request, response) {
        const { pid } = request.params
        response.send(await this.pm.updateProduct(pid, request.body))
    }

    async deleteProduct(request, response) {
        response.send(await this.pm.deleteProduct(request.params.pid))
    }
}
module.exports = ProductsHandler