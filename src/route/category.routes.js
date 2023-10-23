const categoryController = require("../controller/category.controller");
const { jwtToken } = require("../util/authentication");
const { catVal } = require("../validation/category.validation");
const route = require("express").Router();


route.post("/category", [jwtToken, catVal], categoryController.categoryCreate);
route.get("/category/products/:_id", [jwtToken], categoryController.getAllProducts)


module.exports = route;