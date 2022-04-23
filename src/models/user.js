const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema( {
    name : {
        type:String,
        required:true,
        min:3
    },
    email: {
        type:String,
        required:[true,"email filed is mandatory"],
        unique:[true, "Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
    }
} );

// we will create a collections
const User = new mongoose.model('User',userSchema);

module.exports = User;