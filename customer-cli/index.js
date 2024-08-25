const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.set('strictQuery', false);
const db=mongoose.connect('mongodb://localhost:27017/customercli',{
   useNewUrlParser:true,
});
const Customer=require('./customer');

const addCustomer=(customer)=>{
   Customer.create(customer).then(customer=>{
    console.info('New Customer Added');
   });
}
 
 
const findCustomer=(name)=>{        
   //Make case insensitive
   const search=new RegExp(name,'i'); 
   Customer.find({
    $or:[{firstname:search},{lastname:search}]
   }).then(customer=>{
      console.info(customer)
   })   
                                                                          
}


const updateCustomer=(_id,customer)=>{
   Customer.updateOne({_id}, customer)
   .then(customer=>{
      console.info('customer Update');
      db.close();
   });
}
   
 
const removeCustomer=(_id)=>{
   Customer.deleteOne({_id})
   .then(()=>console.log('Customer Removed'))
}

const listCustomer=()=>{
   Customer.find().then((customer)=>{
      console.log(customer)
   })
}
  

module.exports={
    addCustomer,findCustomer,updateCustomer,removeCustomer,listCustomer
}
