const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {playlistmodel}=require("../models/playlist.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const {userId}=req;
     const playlistdata=await playlistmodel.findOne({userId});
     //console.log(playlist)
     res.status(200).json({message:"success",playlistdata:playlistdata.playlist})
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get playlist",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
  const {userId}=req;  
  let {playlistobj}=req.body;
  
  let previtems=await playlistmodel.findOne({userId}) ; 
  if(!previtems){
    await playlistmodel.create({userId,playlist:[]});
    let previtems=await playlistmodel.findOne({userId}) ; 
    previtems.playlist.push(playlistobj)
  }
  else{

  let check=(previtems.playlist.find((item)=>item.id===playlistobj.id))
  console.log(check);
  if(check===undefined){
   previtems.playlist.push(playlistobj);
  }
  }
  await previtems.save();
  res.json({success:true})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})
.delete(async(req,res)=>{
  try{
  const {userId}=req;
  console.log(req.body)
  let previtems=await playlistmodel.findOne({userId}) ; 
  let {playlistid}=req.body;
  let filterdata=previtems.playlist.filter(eachitem=>eachitem.id!==playlistid);
  console.log("filter",filterdata);
  
  let newdata={...previtems,playlist:filterdata}
   let data=extend(previtems,newdata); 
   console.log("data",data)
  await data.save();
  res.json({success:true,data})
  }
  catch(err){
    console.log(err);
        res.status(500).json({success:false,message:"unable to delete products",errormessage:err.message})
  }
});


router.route('/video/')
.post(async(req, res) => {
  try{
  const {userId}=req;
  let {playlistid,videoid}=req.body;
  let previtems=await playlistmodel.findOne({userId}) ; 
  
  previtems.playlist.map(item=>{
    if(item.id===playlistid){
      if(!(item.videos.find(eachvideo=>eachvideo===videoid))){
item.videos.push(videoid)
      }
     
    }
    return item
  })
  
  await previtems.save();
  res.json({success:true,product:previtems})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})
.delete(async(req, res) => {
  try{
  const {userId}=req;
  let {playlistid,videoid}=req.body;
  console.log(playlistid,videoid)
  let previtems=await playlistmodel.findOne({userId}) ; 
 
  previtems.playlist.map(item=>{
    if(item.id===playlistid){
      item.videos.remove(videoid)
    }
    return item
  })
  
  await previtems.save();
  res.json({success:true,product:previtems})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})


module.exports=router;