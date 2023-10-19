const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true
    }

});
const categoryModal = mongoose.model(`Category`, categorySchema);
module.exports = categoryModal;