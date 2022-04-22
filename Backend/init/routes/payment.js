var express = require('express');
const paymentRoute = express.Router(); 
let paymentModel = require('../Models/Payments');
const User = require('../Models/User1')

/* GET payment-details. */
paymentRoute.get('/payment-details/:id', async function(req, res) {
  try {
    const query = { _id: req.params.id };
      
      const user = await User.findOne(query);
      // since this method returns the matched document, not a cursor, print it directly
      if (user.role == 'admin') {
        paymentModel.find(function(err, details){
          if (err) {
            console.log(err);
          } else {
            res.json(details);
          }
        }).populate('order_id');
      }else{
        res.status(403).json('Access denied');
      }
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
  });
  
/* POST payment. */
paymentRoute.post('/add-payment', function(req, res) {
  try {
    const { user_id, order_id, Amount } = req.body;

    const newUserData = {
        user_id, order_id, Amount 
    }

    const newUser = new paymentModel(newUserData);

    newUser.save()
      .then(() => res.status(200).json('payment Added'))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    return res.json({
      success:false,
      message: error.message})
  }
});

module.exports = paymentRoute;
