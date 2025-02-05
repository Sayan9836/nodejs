const mongoose=require('mongoose')
const shortId=require('shortid')
const ShortUrlSchema=new mongoose.Schema({
    full:{
      type:String,
      required:true
    },
    short:{
       type:String,
       required:true,
       default:shortId.generate         
    },
    clicks:{
        type:Number,
        required:true,
        default:1
    }
})

module.exports=mongoose.model('urlshortners',ShortUrlSchema)