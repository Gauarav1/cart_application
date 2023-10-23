const mongoose = require("mongoose");

const orderSchema =  new mongoose.Schema({
    userId : {
        type:new mongoose.Types.ObjectId  
    }
})