const UserModel=require('../models/UserModel');
const jwt = require('jsonwebtoken');
const KEY=`349rj567*(00`
module.exports.createUserAccount = async (request,response)=>{
   let data=request.body

   //to save single user by creating a instance
  
    let newUser=new UserModel({
        "name": data.name,
        "mobile":data.mobile,
        "email": data.email,
        "address":data.address,
        "password":data.password,
    })
    //save user
    let result=await newUser.save();
        if(result){
            
            response.send({
                status: true,
                message:"Your registration is done successfully.",
        });
    }else{
        response.send({
            status:false,
            message:"Your registration failed, try again."
        });
    }
};
    
module.exports.userLogin =async (request,response)=>{
    let data = request.body;
   let result= await UserModel.findOne({
        email:data.username,
        password:data.password,
    },{
        password:0,
        __v:0,
    })
    if(result){
        let data={
            name:result.name,
            id:result._id,
            email:result.email,
            mobile:result.mobile,
        }
        let token = jwt.sign(data,KEY,{ expiresIn: 60 * 60 })// jwt token
        response.send({
            status: true,
            token,
    });
}else{
    response.send({
        status:false,
        imessage:"Invalid username and password."
    });
}
};
