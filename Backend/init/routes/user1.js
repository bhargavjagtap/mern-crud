var express = require('express');
const userRoute = express.Router(); 
const User = require('../Models/User1')
const UserDetail = require('../Models/UserDetails')

/* GET user listing. */
userRoute.get('/', function(req, res) {
  try {
    User.find().then(users=>{
        res.json(users)
    }).catch(err=>{
        return res.json({
          success:false,
          message: err.message})
    });
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});
  
/* POST user. */
userRoute.post('/add-user', function(req, res) {
  try {
    const { email, password, role, address, gender, Occupation, Contact } = req.body;
    const newUserData = {
      email,
      password,
      role
    }
    const newUser = new User(newUserData);
    newUser.save()
      .then((data) => {
        const newUserDetails = {
        user_id: data._id,
        address,
        gender,
        Occupation,
        Contact
      }
      const newUser1 = new UserDetail(newUserDetails)
      newUser1.save().then(() => {
        res.status(200).json('User Added')
      })
      
    })
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});

/* Update user. */
userRoute.post('/update-user/:id', function(req, res) {
  try {
    User.findByIdAndUpdate(req.params.id, {
      email:  req.body.email,
      role: req.body.role,
    },function(err, user){
      if(err){
        return res.status(400).json({
          success:false,
          message: err.message})
      }else{
        console.log(user);
         res.status(200).json({message:'User Updated'})
      }
      });
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});

/* Delete user. */
userRoute.post('/update-user/:id', function(req, res) {
  try {
    User.findByIdAndUpdate(req.params.id, {
      email:  req.body.email,
      role: req.body.role,
    },function(err, user){
      if(err){
        return res.status(400).json({
          success:false,
          message: err.message})
      }else{
        console.log(user);
         res.status(200).json({message:'User Updated'})
      }
      });
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});

module.exports = userRoute;
