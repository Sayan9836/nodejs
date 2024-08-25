const express=require('express');
require('./mongoose')
const app=express();
app.use(express.json())

const subscribersRouter=require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)

app.listen(3000,()=>{
    console.log("server started");
});