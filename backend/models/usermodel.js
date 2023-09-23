require("dotenv").config();
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    orderItems: [
        {
            name: {type:String, required: true},
            image: {type: String, required: true},
            price: { type: Number, required: true},
            qty: {type: Number, required: true},
            counInStock: {
                type: Number,
            },
            product: {
                type: String,
              
                required: true,
            },
            
        },
    ],
    shipping : {
        name:{ type: String,required: true },
        email: {type: String,required: true },
        Cellphone: { type: String , required: true},
        country: { type: String, required: true, },
        address: { type: String, required: true,},
        city: { type: String, required: true },
        ZIP: { type: String, required: true },
    },
    payment :{
        paymentMethod : {type: String , required: true},
    },
    itemsPrice: {type: Number , required: true},
    totalPrice: {type: Number },
},
    {
        timestamps:true,
    },
);

//model
const userModel = mongoose.model('userModel', userSchema);

module.exports=userModel;