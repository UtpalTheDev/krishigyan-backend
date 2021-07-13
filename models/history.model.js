const mongoose=require('mongoose');
require("mongoose-type-url");
//schema

const historyItems= new mongoose.Schema({
    historyId:{type:String,required:true},
    lastseen:{type:Date,required:true}
})


const historySchema=new mongoose.Schema({

userId:{type:String,required:true},
history:[historyItems]

})
//model creation
const historymodel=mongoose.model('history',historySchema);

module.exports={historymodel}