const cartController = require("../controller/cart.controller");
const { jwtToken } = require("../util/authentication");
const { cartVal } = require("../validation/cart.validation");
const route = require("express").Router();

route.post("/cart/create", [jwtToken, cartVal], cartController.addToCart);
route.delete("/cart/remove/:_id", [jwtToken], cartController.removeFromCart)

module.exports = route;