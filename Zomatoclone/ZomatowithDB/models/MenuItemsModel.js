const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const MenuItemsSchema= new Schema({
    name:{type:String},
description:{type:String},
ingridients:{type:Array},
restaurantId:{type:Schema.Types.ObjectId},
image:{type:String},
qty:{type:Number},
price:{type:Number},
    
})

//create model
const MenuItemsModel=mongoose.model("menuitem",MenuItemsSchema ,"menuitems");

//export model
module.exports = MenuItemsModel;