const express=require ("express");
const mongoose=require ('mongoose');
const cors=require('cors')
const AppRouter= require("./routes/AppRouter");
const app= express();
const PORT=3030;

// const MONGODB_URI=`mongodb://127.0.0.1:27017/ZomatoDatabase`
const MONGODB_URI=`mongodb+srv://zomato:zomato123@zomato-clone.dao3bhy.mongodb.net/ZomatoDatabase?retryWrites=true&w=majority`
app.use(cors());
//post type data enable

app.use(express.json());
app.use(express.urlencoded({extended:false}));//for form data or other formate.
// server.set('views', "./views/index") // specify the views directory
// server.set('view engine', "pug") // register the template engine
app.use("/api", AppRouter);

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Database connect successfuly')
    app.listen(PORT,()=>{
        console.log("server is running",PORT);
    });
}).catch((error)=>{
   console.log(error)
})

