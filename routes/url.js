const express=require("express");
//Q-1 are we importing handleGenerateNewShortURL() as an object
/*Answer: Yes, we are using ES6 destructuring syntax to import `handleGenerateNewShortURL` and `handleGetAnalytics` from the `../controllers/url` module.
 In the `../controllers/url` file, these functions are exported as properties of an object. 
So when we destructure with `{ handleGenerateNewShortURL, handleGetAnalytics }`, we are effectively pulling these functions out of the exported object.*/

const {handleGenerateNewShortURL,handleGetAnalytics}=require("../controllers/url")

const router=express.Router();
//generates a shortend URL and returns it
router.post("/",handleGenerateNewShortURL);

//for generating no. of clicks per url and visit history
router.get("/analytics/:shortId",handleGetAnalytics)

//exporting
module.exports=router;