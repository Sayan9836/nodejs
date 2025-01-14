require('dotenv').config();
const express =require('express')
const app=express()
const passport=require('passport')
const initializepassport=require('./passport-config')
const flash=require('express-flash')
const session=require('express-session')
const bcrypt=require('bcrypt')

initializepassport(
    passport,
    email => users.find(user=>user.email === email),
    id => users.find(user => user.id===id)
)
const users = []

console.log(users);

app.set('view-engine', 'ejs') // here we are using .ejs file
app.use(express.urlencoded({extended:false})) // middleware used to parse the incoming data(body parser)
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res)=>{
    res.render('index.ejs',{name:req.user.name})
})

app.get('/login', (req,res)=>{
      res.render('login.ejs')
})

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))
        

app.get('/register', (req,res)=>{
  res.render('register.ejs')
})


app.post('/register', async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
        id:Date.now().toString(),
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    res.redirect('/login')
  }catch{
     res.redirect('/register')
  }
  console.log(users);
})

function checkAuthenticated(req,res,next) {
  if (req.isAuthenticatd()) {
    return next();
  }

  res.redirect('/login')
}

app.listen(3000,()=>console.log("server stared"))