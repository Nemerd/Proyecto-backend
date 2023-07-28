const CustomRouter = require('./CustomRouter');
const CartHandler = require("../handlers/CartHandler");
const { cartPermission } = require('../handlers/Permissions');

class Cart extends CustomRouter {
    constructor() {
        super()
        this.ch = new CartHandler()
    }
    init() {
        this.post("/",
            async (req, res) => this.ch.createCart(req, res));

        this.get("/:cid",
            cartPermission,
            async (req, res) => this.ch.listCartProducts(req, res));

        this.post("/:cid/product/:pid",
            cartPermission,
            async (req, res) => this.ch.addProductToCart(req, res));

        this.put('/:cid',
            cartPermission,
            async (req, res) => this.ch.updateCart(req, res))

        this.put('/:cid/products/:pid',
            async (req, res) => this.ch.updateSpecificProduct(req, res))

        this.delete('/:cid',
            cartPermission,
            async (req, res) => this.ch.resetCart(req, res))

        this.delete('/:cid/products/:pid',
            cartPermission,
            async (req, res) => this.ch.deleteProduct(req, res))

        this.get('/:cid/purchase',
            cartPermission,
            async (req, res) => this.ch.finishSale(req, res))

    }
}

module.exports = Cart