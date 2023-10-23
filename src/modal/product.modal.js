const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        require: true
    }


},{
    timestamps:true
});

const productModal = mongoose.model(`Products`, productSchema);
module.exports = productModal;