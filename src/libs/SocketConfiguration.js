const { ProductManager } = require("./ProductManager");

const pm = new ProductManager()

function SocketConfiguration(socketServer) {
    socketServer.on('connection', socket => {

        socket.emit('first-contact')

        socket.on("chat:message", (data) => {
            socketServer.sockets.emit("chat:message", data);
        });

        // Configuración del chat
        const chat = []
        socket.on('msgToServer', (msg, id) => {
            const newMsg = {
                id: id,
                mesg: msg
            }
            chat.push(newMsg)
            socket.broadcast.emit('msgToSockets', newMsg)
        })

        // Configuración del actualizador de productos
        socket.on("upload", (newItem) => {
            pm.addProduct(newItem)
            socket.broadcast.emit("product-update", "http://localhost:8080/api/products")
        })
    })
}

module.exports = SocketConfiguration