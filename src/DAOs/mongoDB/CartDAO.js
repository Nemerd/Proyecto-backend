const { Schema, model } = require("mongoose")

const collection = "carts"
const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

const CartDAO = model(collection, cartSchema)

module.exports = { CartDAO }