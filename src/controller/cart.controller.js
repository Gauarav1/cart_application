const cartModal = require("../modal/cart.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const log = logger(new Date + `cart.controller.js`);


const addToCart = async (req, res) => {
    try {
        const {  productId, quantity, price } = req.body;
        log.info(req.user);
        const cart = await cartModal.create({
            userId:req.user.id,
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

module.exports = {
    addToCart,
    removeFromCart
}