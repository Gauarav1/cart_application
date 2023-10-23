const userController = require("../controller/user.controller");
const { jwtToken } = require("../util/authentication");
const { userVal, logInVal } = require("../validation/user.validation");
const route = require("express").Router();


route.post("/user/registration", [userVal], userController.createUser);
route.post("/user/login", [logInVal], userController.userLogin);
route.post("/user/info", [jwtToken], userController.userInfo);


module.exports = route; 