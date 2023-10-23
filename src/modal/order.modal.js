const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    cartId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    status: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});
const orderModal = mongoose.model(`order`, orderSchema);
module.exports = orderModal