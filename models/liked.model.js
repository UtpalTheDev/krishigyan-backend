const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const likedSchema=new mongoose.Schema({

userId:{type:String,required:true},
liked:[String]

})
//model creation
const likedmodel=mongoose.model('like',likedSchema);

module.exports={likedmodel}