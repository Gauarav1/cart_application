const joi = require("joi");
const { failed } = require("../util/constant");

const cartVal = (req, res, next) => {
    const data = req.body;
    const joiSchema = joi.object().keys({ 
        productId: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required(),

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
    cartVal
}