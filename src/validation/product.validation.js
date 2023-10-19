const joi = require("joi");
const { success, failed } = require("../util/constant");
const jToken = require("jsonwebtoken");


const productVal = (req, res, next) => {
    const data = req.body;
    const joiSchema = joi.object().keys({
        productName: joi.string().required(),
        price: joi.number().required(),
        weight: joi.string().required(),
        description: joi.string().required(),
        categoryId: joi.string().required()
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
const infoVal = (req,res,next) =>{
    const data = req.body;
    const joiSchema = joi.object().keys({
        productName:joi.string().required()
    });
    const validationData = joiSchema.validate(data);
    if(validationData.error){
        let t = {
            msg:validationData.error.details[0].message,
            status:failed,
            code:400,
            err: validationData.error
        }
        return res.send(t);
    }
    next();
}
module.exports = {
    productVal,
    infoVal
}