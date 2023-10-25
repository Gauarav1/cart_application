const orderController = require("../controller/order.controller");
const { jwtToken } = require("../util/authentication");
const route = require("express").Router();


route.post("/order/create", [jwtToken], orderController.createOrder);
route.get("/order/get/:_id", [jwtToken], orderController.getOrder);

module.exports = route;