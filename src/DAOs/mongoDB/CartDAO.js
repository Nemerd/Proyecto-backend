// TODO Connect DAO to database
const { Schema, model } = require("mongoose")

const collection = "carts"
const cartSchema = new Schema({
    products: {
        type: Array,
        required: false
    }
})

const CartDAO = model(collection, cartSchema)

module.exports = { CartDAO }