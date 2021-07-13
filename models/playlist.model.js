const mongoose=require('mongoose');
require("mongoose-type-url");
//schema

const playlistItems= new mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    videos:{type:[String],required:true}
})

const playlistSchema=new mongoose.Schema({

userId:{type:String,required:true},
playlist:[playlistItems]

})
//model creation
const playlistmodel=mongoose.model('playlist',playlistSchema);

module.exports={playlistmodel}