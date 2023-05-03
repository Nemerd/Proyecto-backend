const { connect, connection } = require('mongoose');

module.exports = {
    connectMongo: () => {
        connect("mongodb+srv://MoisesMubarqui:Encrust-Scabbed8-Antacid@ecommerce.api9og7.mongodb.net/?retryWrites=true&w=majority")
        console.log("DB connected");
    },
    disconnect: () => {
        connection.close()
        console.log("Connection closed");
    }
}