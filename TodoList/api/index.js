const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Todo=require('./models/Todo')
const app=express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://localhost:27017/mern-todo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("connected to DB")).catch(console.error)

// get all the todos
app.get('/todos', async(req,res)=>{
   const todos=await Todo.find();              
   res.json(todos)                            
})
                     
// add a todo;       
app.post('/todo/add', (req,res)=>{
  const todo=new Todo({
   text:req.body.text
  });
  todo.save();
  res.json(todo)
})

// delete a todo
app.delete('/todo/delete/:id',async(req,res)=>{
   const result=await Todo.findByIdAndDelete(req.params.id) 
   res.json(result)
})

//update the todo
app.put('/todo/complete/:id', async(req,res)=>{
   const todo=await Todo.findById(req.params.id);
   todo.complete=!todo.complete;
   todo.save();
   res.json(todo);
})
                     
app.listen(6000)