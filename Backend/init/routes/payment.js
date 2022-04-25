var express = require('express');
const paymentRoute = express.Router(); 
const paymentController = require('../Controllers/payment.controller');

/* GET payment-details. */
paymentRoute.get('/payment-details/:id', paymentController.getPayment);

/* GET aggregated payment-details. */
paymentRoute.get('/aggregated-details/', paymentController.aggreagatePayment);
  
/* POST payment. */
paymentRoute.post('/add-payment', paymentController.addPayment);

/* UPDATE payment. */
paymentRoute.put('/update-payment/:id', paymentController.updatePayment);

module.exports = paymentRoute;
