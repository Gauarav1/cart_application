const joi = require("joi");
const { success, failed } = require("../util/constant");


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
const logInVal = (req,res, next) =>{
    const data = req.body;
    const joiSchema = joi.object().keys({
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


module.exports = {
    userVal,
    logInVal,
}