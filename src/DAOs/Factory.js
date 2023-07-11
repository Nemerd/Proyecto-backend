const { commander } = require("../Configurations/config");
const { persistence } = commander.opts()

console.log('Persistencia elegida:', persistence);

let ProductDAO
let CartDAO
let UsersDAO

switch (persistence) {
    case 'mongo':
        ({ ProductDAO } = require('./mongoDB/ProductDAO')) &&
            ({ CartDAO } = require('./mongoDB/CartDAO')) &&
            ({ UsersDAO } = require('./mongoDB/UsersDAO'))

        break;

    case 'filesystem':
        const productDAO = require('./fileSystem/ProductManager')
        const cartDAO = require('./fileSystem/CartManager')

        ProductDAO = new productDAO(__dirname + '/../../DBs/Products.json')
        CartDAO = new cartDAO(__dirname + '/../../DBs/Cart.json')
        break;

    default:
        break;
}


module.exports = {
    ProductDAO,
    CartDAO,
    UsersDAO
}