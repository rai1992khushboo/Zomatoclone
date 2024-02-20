const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const LocationSchema= new Schema({
_id : {type:String},
name :{type:String},
city_id:{type:Number},
location_id:{type:Number},
city:{type:String},
country_name:{type:String},
})

//create model
const LocationModel=mongoose.model("location", LocationSchema,"locations");

//export model
module.exports = LocationModel;