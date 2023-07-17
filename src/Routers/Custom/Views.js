const CustomRouter = require('./CustomRouter');
const ViewsHandler = require("../handlers/ViewsHandler");
const UserDTO = require('../../DTO/UserDTO');
class Views extends CustomRouter {
    constructor() {
        super()
        this.vh = new ViewsHandler()
    }
    init() {
        this.get("/hbs", (req, res) => this.vh.loggedInView(req, res));

        this.get("/updateproducts", (req, res) => this.vh.updateproducts(req, res))

        this.get('/current', (req, res) => req.user = UserDTO.noSensible())

        this.get('/products', (req, res) => this.vh.paginatedProducts(req, res))

        this.get('/carts/:cid', (req, res) => this.vh.cartProducts(req, res))
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Views