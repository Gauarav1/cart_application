const productController = require("../controller/product.controller");
const { jwtToken } = require("../util/authentication");
const upload = require("../util/image.upload");
const { productVal, } = require("../validation/product.validation");
const route = require("express").Router();



route.post("/product/registration", [jwtToken, productVal], productController.productCreate);
route.get("/product/info/:_id", [jwtToken], productController.productById);
route.get("/product/detail/:_id", [jwtToken], productController.productCategory);
route.get("/product/all", [jwtToken], productController.getAllProducts);
route.post("/image", upload.single(`file`), productController.uploadImage);

module.exports = route;