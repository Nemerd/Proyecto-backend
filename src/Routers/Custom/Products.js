const CustomRouter = require('./CustomRouter');
const ProductsHandler = require("../handlers/ProductsHandler");
const { permission } = require('../handlers/Permissions');

class Products extends CustomRouter {
    constructor() {
        super()
        this.ph = new ProductsHandler()
    }
    init() {
        this.get("/", (req, res) => this.ph.getAllProducts(req, res))

        this.post("/", permission(['Admin']), (req, res) => this.ph.addProduct(req, res));

        this.get("/:pid", (req, res) => this.ph.getProduct(req, res));

        this.put("/:pid", permission(['Admin']), (req, res) => this.ph.updateProduct(req, res));

        this.delete("/:pid", permission(['Admin']), (req, res) => this.ph.deleteProduct(req, res));
    }
}

module.exports = Products