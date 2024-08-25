const mongoose=require('mongoose');

const customerSchema=mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    phoneNo:{type:String},
    email:{type:String},
})

module.exports=mongoose.model('customer',customerSchema);