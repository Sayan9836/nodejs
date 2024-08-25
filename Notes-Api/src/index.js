const express=require('express');
const app=express();
const quotes=require("./quotes.json");
app.get('/',(req,res)=>{
  res.send('hello')
})

app.get('/quote',(req,res)=>{
    res.status(200).json(quotes);
})

app.listen(5000,()=>{
    console.log('server started');
})