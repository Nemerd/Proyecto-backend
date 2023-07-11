const CustomRouter = require('./CustomRouter');
const ProductsHandler = require("../handlers/ProductsHandler");

class Products extends CustomRouter {
    constructor() {
        super()
        this.ph = new ProductsHandler()
    }
    init() {
        this.get("/", (req, res) => this.ph.getAllProducts(req, res))

        this.post("/", (req, res) => this.ph.addProduct(req, res));

        this.get("/:pid", (req, res) => this.ph.getProduct(req, res));

        this.put("/:pid", (req, res) => this.ph.updateProduct(req, res));

        this.delete("/:pid", (req, res) => this.ph.deleteProduct(req, res));
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Products