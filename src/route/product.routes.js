const productController = require("../controller/product.controller");
const { jwtToken } = require("../util/authentication");
const { productVal, } = require("../validation/product.validation");
const route = require("express").Router();


route.post("/product/registration", [jwtToken, productVal], productController.productCreate);
route.get("/product/info/:_id", [jwtToken], productController.productById);
route.get("/product/detail/:_id", [jwtToken], productController.productCategory);

module.exports = route;