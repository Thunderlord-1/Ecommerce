const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
});
const contactModel= mongoose.model('contactModel', contactSchema);

module.exports=contactModel;