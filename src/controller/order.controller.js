const { default: mongoose } = require("mongoose");
const orderModal = require("../modal/order.modal");
const { success, failed } = require("../util/constant");
const logger = require("../util/logging");
const log = logger(new Date + `order.controller.js`);


const createOrder = async (req, res) => {
    try {
        const { cartId, status } = req.body;
        const order = await orderModal.create({
            userId: req.user.id,
            cartId,
            status
        })
        if (order) {
            let t = {
                msg: "Order Created Successfully",
                code: 200,
                status: success,
                data: order
            }
            res.send(t)
        }
        else {
            let t = {
                msg: " Error in Creating Order",
                code: 400,
                status: failed,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Creating Order, err:${err}`);
        let t = {
            msg: " Error in Creating Order",
            code: 400,
            status: failed,
            data: {},
            err
        }
        res.send(t);
    }
}
const getOrder = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await orderModal.aggregate([
            {
                $lookup: {
                    from: "carts",
                    localField: "userId",
                    foreignField: "userId",
                    as: "orders"
                },
            },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    cartId: 1,
                    orders: {
                        userId: 1,
                        productId: 1,
                        price: 1,
                        quantity: 1
                    }
                }
            }
        ])
        if (result) {
            let t = {
                msg: "Orders Found Successfully",
                code: 200,
                status: success,
                data: result
            }
            res.send(t);
        }
        else {
            let t = {
                msg: "Order not Found",
                code: 400,
                status: failed,
                data: {},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error in Finding Order , err:${err}`);
        let t = {
            msg: "Error in finding Order",
            code: 400,
            status: failed,
            data: {},
            err
        }
        res.send(t);
    }
}
const orderByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        log.info(status);
        const data = await orderModal.find({status: status});
        if(data){
            let t = {
                msg:"All Delivered Orders",
                code:200,
                status:success,
                data:data
            }
            res.send(t);
        }
        else{
            let t = {
                msg:`No Orders Found With Status:${status}`,
                code:400,
                status:failed,
                data:{},
                err
            }
            res.send(t);
        }
    }
    catch (err) {
        log.error(`Error In Finding Orders ,err:${err}`);
        let t = {
            msg:`Error In Finding Orders`,
            code:400,
            status:failed,
            data:{},
            err
        }
        res.send(t);
    }
}

module.exports = {
    createOrder,
    getOrder,
    orderByStatus
}