const RestaurantModel=require('../models/RestaurantModel')
const MealTypeModel=require('../models/MealTypeModel')
const MenuItemsModel=require('../models/MenuItemsModel')
module.exports.getRestaurantsList = async (request,response)=>{
   let{loc_id}= request.params
    let result = await RestaurantModel.find({location_id: loc_id},{name:1,
    city:1,
locality:1,
image:1});//find has 2 parameter filter and projection is last one
    response.send({
       status: true,
       result,
    // message:"restaurant Api is working"
    });
};

module.exports.getRestaurantById=async (request,response)=>{
    let{id}= request.params
     let result = await RestaurantModel.findById(id);//find has 2 parameter filter and projection is last one
     response.send({
        status: true,
        result,
     // message:"restaurant Api is working"
     });
 };


 module.exports.getMealTypeList=async(request,response)=>{
    let result=await MealTypeModel.find();
    response.send({
        status:true,
        result,
    })
 }


 module.exports.getMenuItemsList=async(request,response)=>{
    let {r_id}= request.params
    let result=await MenuItemsModel.find({restaurantId
        :r_id});
    response.send({
        status:true,
        result,
    })
 }

 module.exports.filter=async(request,response)=>{
    let {location,meal_type,minprice,sort,cuisine_id}=request.body
    let filter={};
    sort = sort === undefined ? 1:sort;
    if(location!== undefined)filter ['location_id']=location
    if(meal_type!== undefined)filter['mealtype_id']= meal_type;
    if(minprice!== undefined) filter['min_price']=minprice;
    if(cuisine_id !== undefined)filter['cuisine_id'] = {$in:cuisine_id};
    let result = await RestaurantModel.find(filter,{name:1,
        city:1,
    locality:1,
    image:1,
    mealtype_id
:1,
cuisine:1,
min_price:1,}).sort({
    min_price: sort,
});
        response.send({
           status: true,
           result,
        
        });
 }