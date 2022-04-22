const express = require('express')
const User = require('../Models/User')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router(); 
const dotenv = require("dotenv");
dotenv.config();

userRoute.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }
      bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
          email,
          password: hashedPassword
        });
        user.save().then(user => res.json(user));
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

userRoute.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
      bcrypt.compare(password, savedUser.password).then(doMatch => {
        if (doMatch) {
          // res.json({ message: "Successfully logged in" });
          const payload ={
              id:savedUser._id,
              email:savedUser.email
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:86400},(err,token)=>{
            if(err) return res.json({message:err})
            return res.json({
              message:"Success",
              token: "Bearer "+token
            });
        })
    }
    else{
        return res.status(422).json({ error: "Invalid email or password" });
      }});
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = userRoute;
