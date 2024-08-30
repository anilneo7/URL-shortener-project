const mongoose=require("mongoose");

//defining Schema
const urlSchema=new mongoose.Schema({
  shortId:{
    type:String,
    required:true,
    unique:true
  },
  redirectURL:{
    type:String,
    required:true
  },
  //it is an array of object but same as shortId & redirectURL
  visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true});

//creating model
const URL=mongoose.model("url",urlSchema);

//exporting
//Q-1 why URL is not exported as an object
module.exports=URL;

/*Answer: The `URL` is not exported as an object because `mongoose.model("url", urlSchema)` 
returns a Model object, which represents a MongoDB collection and provides an interface to interact with it.
 When exporting it, you're simply exporting this Model directly, so you can use it to perform CRUD operations.
 There's no need to wrap it in another object unless you have additional properties or methods you want to export along with it. */