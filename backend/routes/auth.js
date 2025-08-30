const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Crypto = require('crypto-js');
require('dotenv').config();

router.post('/register' , async(req , res) => {

    try 
    {
        const {username , email , password} = req.body;

        const exist = await User.findOne({$or : [{email} , {username}]});
        if(exist) return res.status(400).json({message : "User Already Exists"});


        const encrypted = Crypto.AES.encrypt(password , process.env.PASS_SECR).toString();

        const newUser = new User({username , email , password : encrypted});
        await newUser.save();

        res.status(201).json({message : "User Created Successully"});
    }
    catch(err) {
        res.status(500).json({message : "Sercer Error"});
    }
});


// Login

router.post('/login' , async(req, res) => {
    try 
    {
        const {email , password} = req.body;
        const user =  await User.findOne({email});
        if(!user) return res.status(401).json({message : "Wronng Crenditials"});
    

    // decrypt password

    const bytes = Crypto.AES.decrypt(user.password , process.env.PASS_SECR);
    const  originalPassword = bytes.toString(Crypto.enc.Utf8);

    if(originalPassword !== password) return res.status(401).json({message : "Wrong Credentials"});

    // create jwt

   const token = jwt.sign(
  { id: user._id, username: user.username, email: user.email },
  process.env.JWT_SECR,
  { expiresIn: process.env.TOKEN_EXPIRY || "7d" }
);

    res.json({token, user: {id:user._id, username: user.username , email : user.email}});
    } catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server error"});
    }

    
})

module.exports = router;