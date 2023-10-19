const productController = require("../controller/product.controller");
const { productVal, } = require("../validation/product.validation");
const { tokenVal } = require("../validation/user.validation");
const route = require("express").Router();


route.post("/product/registration", [productVal], productController.productCreate);
route.get("/product/info/:_id", productController.productById);
route.get("/product/detail/:_id", productController.productCategory);

module.exports = route;