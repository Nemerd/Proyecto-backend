const CustomRouter = require('./CustomRouter');
const ViewsHandler = require("../handlers/ViewsHandler");
const UserDTO = require('../../DTO/UserDTO');
const { permission } = require('../handlers/Permissions');
class Views extends CustomRouter {
    constructor() {
        super()
        this.vh = new ViewsHandler()
    }
    init() {
        this.get("/hbs", (req, res) => this.vh.loggedInView(req, res));

        this.get("/updateproducts", permission(['Admin']), (req, res) => this.vh.updateproducts(req, res))

        this.get('/current', (req, res) => req.user = UserDTO.noSensible())

        this.get('/products', (req, res) => this.vh.paginatedProducts(req, res))

        this.get('/carts/:cid', (req, res) => this.vh.cartProducts(req, res))
    }
}

module.exports = Views