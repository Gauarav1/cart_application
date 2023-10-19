const userModal = require("../modal/user.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const jToken = require("jsonwebtoken");
const log = logger(new Date + "user.controller.js");
const secret = "GAURAV";



const createUser = async (req, res) => {
    try {
        const { name, age, mobileNo, email, password } = req.body;
        const user = await userModal.create({
            name,
            age,
            mobileNo,
            email,
            password
        });
        if (user) {
            let t = {
                msg: "User Created Successfully",
                status: success,
                code: 200,
                data: user
            };
            res.send(t);
        }
        else {
            let t = {
                msg: "Error in Creating User",
                status: failed,
                code: 400,
                data: {},
                err
            };
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Creating User, Error:${err}`);
        let t = {
            msg: "Error in Creating User",
            status: failed,
            code: 400,
            data: {},
            err
        };
        res.send(t);
    }
}
const userLogin = async (req, res) => {
    log.info(`The Request is ${JSON.stringify(req.body)}`);
    try {
        const { email, password } = req.body;
        const user = await userModal.findOne({
            email,
            password
        });
        if (user) {
            const token = jToken.sign({
                userName: user.name,
                userEmail: user.email,
                id: user._id
            }, secret);
            let t = {
                status: success,
                code: 200,
                token: token,
                data: user
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "User Not Found ",
                status: failed,
                code: 400,
            };
            res.send(t);
        }
    }
    catch (err) {
        log.info(`Error in Finding User , err:${err}`);
    }
}
const userInfo = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await userModal.findOne({ name })
        if (result) {
            let t = {
                msg: "User Found",
                status: success,
                code: 200,
                data: result
            };
            res.send(t);
        }
        else {
            let t = {
                msg: "User Not Found",
                status: failed,
                code: 400,
                data: result
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error In Finding User, err:${err}`);
        res.send(`Error In Finding User, err:${err}`);

    }
}
module.exports = {
    createUser,
    userLogin,
    userInfo
}