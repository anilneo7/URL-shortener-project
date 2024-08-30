// const {nanoid}=require("nanoid");

const shortid=require("shortid");
const URL=require("../models/url");

async function handleGenerateNewShortURL(req,res){
  //logic for URL shortener

  //validation
  const body=req.body;
  if(!body.url){
    return res.status(400).json({error:"url is required"});
  }

  // const shortID=nanoid(8);//creates short id of length 8
  // const shortID=shortid(); //calling shortid()

//---if nanoid package won't work use below code---
  function generateRandomString() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}
const shortID=generateRandomString();

  //creating new url in DB with properties shortID,redirectURL,visitHistory
  await URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[]
  })
  return res.json({id:shortID})
}

async function handleGetAnalytics(req,res){
  const shortId=req.params.shortId;
  const result= await URL.findOne({shortId});
  return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory
  });
}

//exporting as object
module.exports={
  handleGenerateNewShortURL,
  handleGetAnalytics,
}
