const express=require('express');
const mongoose=require('mongoose');
const User=require('./users')
const app=express();
mongoose.connect('mongodb://localhost:27017/paginations');
 const sayan=mongoose.connection

 sayan.once('open',async()=>{
    if (await User.countDocuments().exec()>0) return
  
    Promise.all([
      User.create({id:1,name:"user 1"}),
      User.create({id:2,name:'user 2'}),
      User.create({id:3,name:'user 3'}),
      User.create({id:4,name:'user 4'}),
      User.create({id:5,name:'user 5'}),
      User.create({id:6,name:'user 6'}),
      User.create({id:7,name:'user 7'}),
      User.create({id:8,name:'user 8'}),
      User.create({id:9,name:'user 9'}),
      User.create({id:10,name:'user 10'}),
      User.create({id:11,name:'user 11'}),
      User.create({id:12,name:'user 12'}),
    ]).then(()=>console.log('User Added'))
  })

app.get('/users',paginatedResult(User), (req,res)=>{
    res.send(res.paginatedResult)
})

// app.get('/posts',paginatedResult(posts), (req,res)=>{
//     res.send(res.paginatedResult)
// })

function paginatedResult(model) {
    return async(req,res,next)=>{

    const page=parseInt(req.query.page);
    const limit=req.query.limit;

    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    const results={}
    if (endIndex<model.countDocuments().exec()) {
      results.next={  
        page:page+1,
        limit:limit,
      }
    }
    if (startIndex>0) {
      results.previous={
        page:page-1,
        limit:limit,
       }
    }
    try {
      results.results=await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult=results
      next()
    } catch (e) {
      res.status(500).json({message:e.message})

    }
  }
}

app.listen(3000);