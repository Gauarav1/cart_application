const { default: mongoose } = require("mongoose");
const categoryModal = require("../modal/category.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const log = logger(new Date + `category.controller.js`);

const categoryCreate = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = await categoryModal.create({
            categoryName
        })
        if (category) {
            let t = {
                msg: "Category Created Successfully",
                status: success,
                code: 200,
                data: category
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Error in Creating Category",
                status: failed,
                code: 400,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.info(` Error in Creating Category, err:${err}`);
        let t = {
            msg: "Error in Creating Category",
            status: failed,
            code: 400,
            data: {},
            err
        }
        res.send(t);
    }
}
const categoryProducts = async (req, res) => {
    try {
        const { _id } = req.params;
        // console.log(id);
        const result = await categoryModal.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "Products"
                },
            },
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    Products: {
                        _id: 1,
                        productName: 1,
                        price: 1,
                        weight: 1,
                        description: 1,
                        categoryId: 1,
                    }
                }
            }
        ])
        // return res.send(result);
        if (result) {
            let t = {
                msg: "Products Found Successfully",
                status: success,
                code: 200,
                data: result
            }
            return res.send(t);
        }
        else {
            let t = {
                msg: "Products Not Found",
                status: failed,
                code: 404,
                data: {},
                err
            }
            return res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Finding Products,err:${err}`);
        let t = {
            msg: `Error in Finding Products`,
            status: failed,
            code: 400,
            data: {},
            err
        }
    }
}


module.exports = {
    categoryCreate,
    categoryProducts
}
