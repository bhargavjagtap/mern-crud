var express = require('express');
const userDetailsRoute = express.Router(); 
const userDetailsModel = require('../Models/UserDetails')
const User = require('../Models/User1')

/* GET user-details. */
userDetailsRoute.get('/', function(req, res) {
  try {
    userDetailsModel.find().then(userDetails=>{
        res.json(userDetails)
    });
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
  });
  
/* POST user-details. */
userDetailsRoute.post('/add-details/:id', async function(req, res) {
  try {
    const query = {
      _id: req.params.id
    };

    const user = await User.findOne(query);
    const {
      email,
      address,
      gender,
      Occupation,
      Contact
    } = req.body;

    const newUserData = {
      email,
      address,
      gender,
      Occupation,
      Contact
    }

    const newUser = new userDetailsModel(newUserData);
    if (user.role == 'admin' && user._id == req.params.id) {
      let result = await newUser.save()
      if (result) {
        res.status(200).json({
          success: true,
          data: result,
          message: 'User Details Added'
        })
      }
    } else {
      res.status(403).json('Access denied');
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
});

module.exports = userDetailsRoute;
