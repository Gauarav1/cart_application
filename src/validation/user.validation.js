const joi = require("joi");
const { success, failed } = require("../util/constant");
const jToken = require("jsonwebtoken");

/* User Validation */

const userVal = (req, res, next) => {
    const data = req.body;
    const joiSchema = joi.object().keys({
        name: joi.string().required(),
        age: joi.number().required(),
        mobileNo: joi.number().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    const validationData = joiSchema.validate(data);
    if (validationData.error) {
        let t = {
            msg: validationData.error.details[0].message,
            status: failed,
            code: 400,
            err: validationData.error
        }
        return res.send(t);
    }
    next();
}
const tokenVal = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            let t = {
                msg: "Unauthorized User",
                status: failed,
                code: 400
            }
            return res.send(t);
        }
        const data = jToken.decode(token);
        if (data) {
            next();
        }
        else {
            let t = {
                msg: "Error in Decoding Token",
                status: failed,
                code: 400
            }
            return res.send(t);
        }
    }
    catch (err) {
        res.send(err);
    }
}




/* Category Validation */



module.exports = {
    userVal,
    tokenVal
}