var express = require('express');
const orderRoute = express.Router(); 
let orderModel = require('../Models/Order');
const User = require('../Models/User1')

/* GET orders. */
orderRoute.get('/', function(req, res) {
  try {
    orderModel.find(function(err, details){
      if (err) {
        console.log(err);
      } else {
        res.json(details);
      }
    }).populate('user_id', 'email');
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
  });

/* GET orders by sorting and projecting */
orderRoute.get('/sp', function(req, res) {
  try {
    orderModel.find({ runtime: { $lt: 15 } }).sort({ Quantity: 1})
    .then((result) => {
      res.json(result);
    });
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
  });
  
/* POST order. */
orderRoute.post('/add-order', function(req, res) {
  try {
    const { user_id, order_number, itemName, Quantity } = req.body;

    const newUserData = {
      user_id, order_number,itemName, Quantity 
    }

    const newUser = new orderModel(newUserData);

    newUser.save()
      .then(() => res.status(200).json('Order Added'))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});

module.exports = orderRoute;
