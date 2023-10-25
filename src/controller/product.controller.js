const { default: mongoose } = require("mongoose");
const productModal = require("../modal/product.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const log = logger(new Date + `product.controller.js`);



const productCreate = async (req, res) => {
    try {
        const { productName, price, weight, description, categoryId } = req.body;
        const product = await productModal.create({
            productName,
            price,
            weight,
            description,
            categoryId
        })
        if (product) {
            let t = {
                msg: "Created Successfully",
                status: success,
                code: 200,
                data: product
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Error in Creating",
                status: failed,
                code: 400,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Creating Product, err:}${err}`);
        let t = {
            msg: "Error in Creating",
            status: failed,
            code: 400,
            data: {},
            err
        }
    }
}
const productById = async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await productModal.findOne({ _id })
        if (product) {
            let t = {
                msg: "Product Found Successfully",
                status: success,
                code: 200,
                data: product
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Cannot Find Product",
                status: failed,
                code: 404,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Finding Product ,err:${err}`);
        let t = {
            msg: "Error in Finding Product",
            status: failed,
            code: 400,
            data: {},
            err
        }
        res.send(t);
    }
}
const productCategory = async (req, res) => {
    try {
        const { _id } = req.params;
        // console.log(id);
        const result = await productModal.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "data"
                },
            },
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $project: {
                    _id: 0,
                    productName: 1,
                    price: 1,
                    weight: 1,
                    description: 1,
                    categoryId: 1,
                    data: {
                        _id: 1,
                        categoryName: 1,
                        categoryId: 1
                    }
                }
            }
        ])
        // return res.send(result);
        if (result) {
            let t = {
                msg: "Product Found Successfully",
                status: success,
                code: 200,
                data: result
            }
            return res.send(t);
        }
        else {
            let t = {
                msg: "Product Not Found",
                status: failed,
                code: 404,
                data: {},
                err
            }
            return res.send(t);
        }

    }
    catch (err) {
        log.error(`Error in Finding Product,err:${err}`);
        let t = {
            msg: `Error in Finding Product`,
            status: failed,
            code: 400,
            data: {},
            err
        }
    }
}
const getAllProducts = async (req, res) => {
    try {
        const result = await productModal.find();
        if (result) {
            let t = {
                msg: "Products List",
                code: 200,
                status: success,
                list: result
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "No Products",
                code: 400,
                status: failed,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Finding Products, err:${err}`);
        let t = {
            msg: "Error in Finding Products",
            code: 400,
            status: failed,
            data: {},
            err
        }
        res.send(t);
    }
}
module.exports = {
    productCreate,
    productById,
    productCategory,
    getAllProducts
}