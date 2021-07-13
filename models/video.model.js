const mongoose=require('mongoose');
require("mongoose-type-url");

//schema
const videoSchema=new mongoose.Schema({

    id: {type:String,required:true},
    title:{type:String,required:true},
    dateofpublish: {type:String,required:true},
    duration: {type:Number,required:true},
    genre: {type:String,required:true},
})
//model creation
const videomodel=mongoose.model('video',videoSchema);

module.exports={videomodel}