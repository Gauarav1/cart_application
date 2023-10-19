const categoryController = require("../controller/category.controller");
const { catVal } = require("../validation/category.validation");
const route = require("express").Router();

route.post("/category", [catVal], categoryController.categoryCreate);
route.get("/category/products",categoryController.getAllProducts)
module.exports = route;