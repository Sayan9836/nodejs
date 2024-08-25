const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/Usermodel");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const cors=require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)

const jwtkey = process.env.JWT_KEY;

app.post("/register", async (req, res) => {
    const { firstname, lastname, email, address, password } = req.body;
    
    if (!firstname || (!lastname) || (!email) || (!address) || (!password)) {
        res.status(404).json("please enter all the details")
    }

    const existingUser=await User.findOne({email});
    if(existingUser){
        res.status(400).json("user already exists")
    }


    const user = new User(req.body);

    const result = await user.save();
    if (!result) {
        res.status(404).json("user registered unSuccessfull");
    }

    const token = JWT.sign({ result }, jwtkey, { expiresIn: "2h" })
    if (!token) {
        res.status(404).json("error in token generation")
    }

    res.status(200).json({ user, token });

})

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if ((!email) || (!password)) {
            res.status(404).json("please enter all the details")
        }
    
        const user =await  User.findOne({ email });
    
        if (!user) {
            res.status(404).json("No User Exists with this email address");
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json("Invalid password")
        }
    
        const token = JWT.sign({ user }, jwtkey, { expiresIn: "2h" });
        if (!token) {
            res.status(404).json("error in token generation")
        }
    
        res.status(200).json({ user, token });
        
    } catch (error) {
        res.status(500).json("internal server error")
    }

})

app.listen(5000,()=>console.log("server started"));



