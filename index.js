const express=require("express");
const {connectToMongoDB}=require("./connect");
const PORT=8001;
const app=express();
const urlRoute=require("./routes/url");
const URL=require("./models/url");

//middleware (for body.url)
app.use(express.json()); //Q-1 what does this middleware do
/*Answer: `express.json()` is a middleware that parses incoming requests with JSON payloads.
It is used to automatically parse JSON data from the request body (e.g., `req.body`) so that you can access it as a JavaScript object in your route handlers.
Without this middleware, `req.body` would be `undefined` when sending JSON data in a POST request.*/

//if it starts from "/url" then use urlRoute for it
app.use("/url",urlRoute);

//2 things to do here 1-fetch :shortId from DB 
//2-increment it, then redirect it to user 
app.get('/:shortId',async(req,res)=>{
  const shortId=req.params.shortId;

  const entry=await URL.findOneAndUpdate(
    //giving shortId to find it 
    {shortId},//this {shortId} here is const shortId=req.params.shortId;

    //what to update
    //$push as visitHistory is an array
    {$push:{visitHistory:{timestamp: Date.now()}}}
  );

  //redirecting user toward url
  res.redirect('https://'+entry.redirectURL);
})
//connection to DB and this returns a promise
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>{console.log("MongoDB connected");
})

app.listen(PORT,()=>{console.log(`Server started on Port ${PORT}`);
})
