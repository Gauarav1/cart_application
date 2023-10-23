const mongoose =require("mongoose");

const cartSchema = new  mongoose.Schema({
    userId:{
        type : mongoose.Types.ObjectId,
        require : true
    },
    productId:{
        type : mongoose.Types.ObjectId,
        require : true
    },
    quantity :{
        type : Number,
        require : true
    },
    price : {
        type : Number,
        require: true
    }
},{
    timestamps:true
});

const cartModal = mongoose.model(`cart`,cartSchema);
module.exports = cartModal;