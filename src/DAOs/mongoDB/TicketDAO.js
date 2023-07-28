const { Schema, model } = require('mongoose');

const collection = 'tickets'
const ticketsSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }],
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
}, {
    timestamps: {
        purchase_datetime: 'created_at'
    }
})

const TicketDAO = model(collection, ticketsSchema)

module.exports = TicketDAO