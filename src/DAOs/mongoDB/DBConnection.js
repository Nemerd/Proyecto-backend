const { connect, connection } = require('mongoose');

module.exports = {
    connectMongo: () => {
        connect(process.env.MONGO_URL)
        console.log("DB connected");
    },
    disconnect: () => {
        connection.close()
        console.log("\nDB connection closed");
    }
}