const express=require('express');
const shortUrl = require('./views/ShortUrl');
require('./views/mongoose');

const app=express();
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

app.get('/', async(req,res)=>{
  const shorturls = await shortUrl.find();
  res.render('index',{ shorturls,shorturls});
})

app.post('/Shorturls',async(req,res)=>{
 await shortUrl.create({full:req.body.fullUrl });
  res.redirect('/')                                        
})


app.get('/:shortUrl', async (req,res)=>{
  const chotoUrl=await shortUrl.findOne({ short:req.params.shortUrl});
  if (chotoUrl==null) return res.status(404).send({message:"Url is not valid"})
  
    chotoUrl.clicks++;
    chotoUrl.save();
    res.redirect(chotoUrl.full)
})


app.listen(process.env.PORT || 5000);