const LocationModel=require('../models/LocationModel')
module.exports.getLocationList = async (request,response)=>{
    let result = await LocationModel.find();
    response.send({
       status: true,
       result,
    });
};


