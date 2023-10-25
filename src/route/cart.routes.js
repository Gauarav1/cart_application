const cartController = require("../controller/cart.controller");
const { jwtToken } = require("../util/authentication");
const { cartVal } = require("../validation/cart.validation");
const route = require("express").Router();

route.post("/cart/create", [jwtToken, cartVal], cartController.addToCart);
route.delete("/cart/remove/:_id", [jwtToken], cartController.removeFromCart);
route.put("/cart/update", [jwtToken], cartController.updateCart);
route.get("/cart/all", [jwtToken], cartController.getProducts);
route.put("/cart/rem", [jwtToken], cartController.removeCart);

module.exports = route;