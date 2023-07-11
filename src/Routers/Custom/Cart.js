const CustomRouter = require('./CustomRouter');
const CartHandler = require("../handlers/CartHandler");


class Cart extends CustomRouter {
    constructor() {
        super()
        this.ch = new CartHandler()
    }
    init() {
        this.post("/", async (req, res) => ch.createCart(req, res));

        this.get("/:cid", async (req, res) => ch.listCartProducts(req, res));

        this.post("/:cid/product/:pid", async (req, res) => ch.addProductToCart(req, res));
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Cart