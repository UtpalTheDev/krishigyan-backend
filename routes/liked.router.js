const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {likedmodel}=require("../models/liked.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const {userId}=req;
     const likeddata=await likedmodel.findOne({userId});
     //console.log(liked)
     res.status(200).json({message:"success",likeddata:likeddata.liked})

   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get liked",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
  const {userId}=req;  
  let {likedId}=req.body;
  let previtems=await likedmodel.findOne({userId}) ; 
  if(!previtems){
    await likedmodel.create({userId,liked:[]});
    let previtems=await likedmodel.findOne({userId}) ; 
    previtems.liked.push(likedId)
  }
  else{
  let isPresent=previtems.liked.find((item)=>item===likedId)
  if(isPresent===undefined){
   previtems.liked.push(likedId);
  }
  }
  await previtems.save();
  res.json({success:true,product:previtems})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add video",errormessage:err.message})
  }
})
.delete(async(req,res)=>{
  try{
  const {userId}=req;
  console.log(req.body)
  let previtems=await likedmodel.findOne({userId}) ; 
  let {likedId}=req.body;
  let filterdata=previtems.liked.filter(eachitem=>eachitem!==likedId);
  
  let newdata={...previtems,liked:filterdata}
   let data=extend(previtems,newdata); 
   console.log("data",data)
  await data.save();
  res.json({success:true,data})
  }
  catch(err){
    console.log(err);
        res.status(500).json({success:false,message:"unable to delete video",errormessage:err.message})
  }
});

module.exports=router;