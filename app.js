const express = require("express")
const Products = require("./src/Routers/Products")
const Cart = require("./src/Routers/Cart")
const handlebars = require("express-handlebars");
const { Server: SocketServer } = require("socket.io")


const PORT = 8080
const app = express()

const httpServer = app.listen(PORT)
const socketServer = new SocketServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('hbs', handlebars.engine(
    {
        extname: ".hbs",
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials/",
        defaultLayout: "index.hbs"
    }
))

app.set("views", __dirname + "/src/views")
app.set("view engine", "hbs")

app.use("/api/products", Products);
app.use("/api/carts", Cart);
app.use("/public", express.static("./public"));

socketServer.on('connection', socket => {
    console.log(`Nueva conexión con ID: ${socket.id}`)
    socket.emit('first-contact')
    socket.on("chat:message", (data) => {
        socketServer.sockets.emit("chat:message", data);
    });

    const chat = []
    socket.on('msgToServer', (msg, id) => {
        const newMsg = {
            id: id,
            mesg: msg
        }
        chat.push(newMsg)
        socket.broadcast.emit('msgToSockets', newMsg)
    })

    socket.on("upload", () => {
        socketServer.sockets.emit("product-update", "http://localhost:8080/api/products")
    })
})