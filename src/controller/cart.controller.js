const { default: mongoose } = require("mongoose");
const cartModal = require("../modal/cart.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const log = logger(new Date + `cart.controller.js`);


const addToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        log.info(req.user);
        const cart = await cartModal.create({
            userId: req.user.id,
            productId,
            quantity,
            price
        })
        if (cart) {
            let t = {
                msg: "Item Added to Cart",
                status: success,
                code: 200,
                data: cart
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Error in Creating Cart",
                status: failed,
                code: 400,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in creating Cart, err:${err}`);
        let t = {
            msg: "Error in Creating Cart",
            status: failed,
            code: 400,
            data: {},
            err
        }
    }
}
const removeFromCart = async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await cartModal.findOne({ _id });
        if (product) {
            const deleteResponse = await cartModal.deleteOne({ _id: product._id });
            log.info(`Product Removed From Cart Successfully`, JSON.stringify(product));
            let t = {
                msg: "Product Removed Successfully",
                status: success,
                code: 200,
                data: product
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Product Not Found",
                status: failed,
                code: 400,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Removing Product from Cart`);
        let t = {
            msg: "Product Not Found",
            status: failed,
            code: 400,
            data: {},
            err
        }
        res.send(t);
    }
}
const updateCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        const result = await cartModal.findOne({
            userId: req.user.id,
            productId
        });
        if (result) {
            result.quantity = result.quantity + 1;
            const response = await cartModal.updateOne({ _id: result._id }, { $set: { quantity: result.quantity } });
            let t = {
                msg: "Cart Updated Successfully",
                code: 200,
                status: success,
                data: response
            }
            res.send(t);
        }
        else {
            const response = await cartModal.create({
                userId: req.user.id,
                productId,
                quantity,
                price
            });
            if (response) {
                let t = {
                    msg: "Item Added to Cart",
                    code: 200,
                    status: success,
                    data: response
                }
                res.send(t);
            }
            else {
                let t = {
                    msg: "Item Not Added to Cart",
                    code: 400,
                    status: failed,
                    data: {},
                    err
                }
                res.send(t);
            }
        }
    }
    catch (err) {
        log.error(`Error in Adding Item to Cart, Err:${err}`);
        let t = {
            msg: "Item Not Added to Cart",
            code: 400,
            status: failed,
            data: {},
            err
        }
    }
}
const getProducts = async (req, res) => {
    try {
        const { id } = req.user;
        const result = await cartModal.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                },
            },
            {
                $match: { userId: new mongoose.Types.ObjectId(id) }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    productId: 1,
                    quantity: 1,
                    products: {
                        productName: 1,
                        price: 1,
                        weight: 1,
                        description: 1,
                    }
                },
            }
        ])
        if (result) {
            let t = {
                msg: "Products Found Successfully",
                code: 200,
                status: success,
                data: result
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Products not Found",
                code: 400,
                status: failed,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error In Finding Products, err:${err}`);
        let t = {
            msg: "Products not Found",
            code: 400,
            status: failed,
            data: {},
            err
        }
        res.send(t);
    }
}
const removeCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const result = await cartModal.findOne({
            userId: req.user.id,
            productId
        });
        if (result) {
            result.quantity = result.quantity - 1;
            if (result.quantity >= 1) {
                const response = await cartModal.updateOne({ _id: result._id }, { $set: { quantity: result.quantity } });
                let t = {
                    msg: "Cart Updated Successfully",
                    code: 200,
                    status: success,
                    data: response
                }
                res.send(t);
            }
            else {
                const response = await cartModal.deleteOne({ _id: result._id });
                let t = {
                    msg: "Removed From Cart Successfully",
                    code: 200,
                    status: success,
                    data: {}
                }
                res.send(t);
            }
        }
        else {
            let t = {
                msg: "Cannot Find Product",
                code: 400,
                status: failed,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.err(`Error In Finding Product,err:${err}`)
        let t = {
            msg: "Error in Finding Product",
            code: 400,
            status: failed,
            data: {},
            err
        }
        res.send(t);
    }
}
module.exports = {
    addToCart,
    removeFromCart,
    updateCart,
    getProducts,
    removeCart
}