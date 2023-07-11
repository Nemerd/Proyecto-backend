// Imports
const express = require("express")
const Products = require("./src/Routers/Custom/Products")
const Views = require("./src/Routers/Custom/Views");
const Cart = require("./src/Routers/Custom/Cart")
const Login = require("./src/Routers/Custom/Login");
const Cookies = require("./src/Routers/Custom/Cookies");
const Mock = require("./src/Routers/Custom/Mock");
const handlebars = require("express-handlebars");
const { Server: SocketServer } = require("socket.io");
const SocketConfiguration = require("./src/Controllers/SocketConfiguration");
const DBConnection = require('./src/DAOs/mongoDB/DBConnection');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const { initPassportLocal, initPassportGitHub } = require("./src/Configurations/passport");
const session = require("express-session");
const { commander } = require("./src/Configurations/config");
const { mode } = commander.opts()
require('dotenv').config({ path: "./.env." + mode })


// Constants
const PORT = process.env.PORT

// Server setup
const app = express()
const httpServer = app.listen(PORT)
const socketServer = new SocketServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SIGNATURE))
app.use(session({
    secret: process.env.COOKIE_SIGNATURE,
    resave: true,
    saveUninitialized: true,
}))
initPassportLocal()

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

// Passport
initPassportLocal()
passport.use(passport.initialize())
passport.use(passport.session())

// Routers
const views = new Views()
app.use("/", views.getRouter());
const products = new Products()
app.use("/api/products", products.getRouter());
const cart = new Cart()
app.use("/api/carts", cart.getRouter());
const cookies = new Cookies()
app.use('/api/cookies', cookies.getRouter())
const login = new Login()
app.use('/', login.getRouter())
const mock = new Mock()
app.use('/api', mock.getRouter())

// Folders
app.use("/public", express.static("./public"));

// Sockets
SocketConfiguration(socketServer)

process.on("exit", () => DBConnection.disconnect())
process.on("SIGINT", (signal) => { process.exit(0) })