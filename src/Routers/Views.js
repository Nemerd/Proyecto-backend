const { Router } = require("express");
const ViewsHandler = require("./handlers/ViewsHandler");
const Views = Router()

const vh = new ViewsHandler()

Views.get("/hbs", (req, res) => vh.loggedInView(req, res));

Views.get("/updateproducts", (req, res) => vh.updateproducts(req, res))

module.exports = Views