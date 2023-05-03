const express = require("express")
const Products = require("./src/Routers/Products")
const Cart = require("./src/Routers/Cart")
const handlebars = require("express-handlebars");
const { Server: SocketServer } = require("socket.io");
// const ProductManager = require("../DAOs/fileSystem/ProductManager");
const SocketConfiguration = require("./src/libs/SocketConfiguration");
const Views = require("./src/Routers/Views");
const DBConnection = require('./src/DAOs/mongoDB/DBConnection');

// Constants
const PORT = 8080

// Server setup
const app = express()
const httpServer = app.listen(PORT)
const socketServer = new SocketServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Database connection
DBConnection.connectMongo()

// Templates engine
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

// Routers
app.use("/", Views);
app.use("/api/products", Products);
app.use("/api/carts", Cart);

// Folders
app.use("/public", express.static("./public"));

// Sockets
SocketConfiguration(socketServer)

process.on("exit", () => DBConnection.disconnect())
process.on("SIGINT", (signal) => { process.exit(0) })