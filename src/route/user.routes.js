const userController = require("../controller/user.controller");
const { userVal, tokenVal } = require("../validation/user.validation");
const route = require("express").Router();

route.post("/user/registration", [userVal], userController.createUser);
route.post("/user/login", userController.userLogin);
route.post("/user/info", [tokenVal], userController.userInfo);


module.exports = route;