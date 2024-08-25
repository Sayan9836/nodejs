require('dotenv').config()
const mongoose=require('mongoose');

mongoose.set('strictQuery',false)
mongoose.connect(process.env.DATABASE_URL)