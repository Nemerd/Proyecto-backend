const { connect, connection } = require('mongoose');
require('dotenv').config()

module.exports = {
    connectMongo: () => {
        connect(process.env.DB_URI)
        console.log("DB connected");
    },
    disconnect: () => {
        connection.close()
        console.log("Connection closed");
    }
}