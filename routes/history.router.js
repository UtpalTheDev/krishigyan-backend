const express=require("express");
const router=express.Router();
const { extend } = require("lodash");
const {historymodel}=require("../models/history.model.js")

router.route('/')
 .get(async (req, res) => {
   try{
     const {userId}=req;
     const historydata=await historymodel.findOne({userId});
     //console.log(history)
     res.status(200).json({message:"success",historydata:historydata.history})
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get history",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
  const {userId}=req;
  let {historyId,lastseen}=req.body;
  console.log("body",req.body);
  let previtems=await historymodel.findOne({userId}) ; 
  if(!previtems){
    await historymodel.create({userId,history:[]});
    let previtems=await historymodel.findOne({userId}) ; 
    previtems.history.push({historyId,lastseen})
  }
  else{
  let isPresent=previtems.history.find((item)=>item.historyId===historyId)
  if(isPresent===undefined){
   previtems.history.push({historyId,lastseen});
  }
  else{
    previtems.history.map(item=>{
      if(item.historyId===historyId){
        item.lastseen=lastseen
      }
      return item
    })
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
  let previtems=await historymodel.findOne({userId}) ; 
  let {historyId}=req.body;
  let filterdata=previtems.history.filter(eachitem=>eachitem.historyId!==historyId);
  
  let newdata={...previtems,history:filterdata}
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