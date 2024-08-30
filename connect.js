//connecting with DB

const mongoose=require("mongoose");

async function connectToMongoDB(url){
  return mongoose.connect(url);
}

//export
module.exports={
  connectToMongoDB,
}