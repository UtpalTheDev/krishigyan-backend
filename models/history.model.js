const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const historySchema=new mongoose.Schema({

historyNo:{type:Number,required:true},
history:[
  {
    historyId:String,
    lastseen:Date
  }
]

})
//model creation
const historymodel=mongoose.model('history',historySchema);

module.exports={historymodel}