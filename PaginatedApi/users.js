const mongoose=require('mongoose');
        
const paginateSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
         
module.exports=mongoose.model('paginateData',paginateSchema);