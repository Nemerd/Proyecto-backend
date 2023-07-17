const { Schema, model } = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const collection = "products"
const productsSchema = new Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})
productsSchema.plugin(paginate)
const ProductDAO = model(collection, productsSchema)


module.exports = { ProductDAO }