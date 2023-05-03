const { Schema, model } = require("mongoose")

const collection = "chat"
const chatSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    mesg: {
        type: String,
        required: true
    }
})

const ChatDAO = model(collection, chatSchema)

module.exports = { ChatDAO }