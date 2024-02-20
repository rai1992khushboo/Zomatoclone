const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const UserSchema= new Schema({

    "name": {type:String},
    "mobile":{type:String},
        "email": {type:String},
        "address": {type:String},
        "password":{type:String},
})

//create model
const UserModel=mongoose.model("user", UserSchema,"users");

//export model
module.exports = UserModel;