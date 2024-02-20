const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const MealTypeSchema= new Schema({
    name:{type:String},
    content:{type:String},
    image:{type:String},
    meal_type:{type:String},
    
});
const MealTypeModel=mongoose.model("meal", MealTypeSchema ,"mealtypes");

//export model
module.exports = MealTypeModel;