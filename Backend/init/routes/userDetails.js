var express = require('express');
const userDetailsRoute = express.Router(); 
const detailsController = require('../Controllers/userDetails.controller')

/* GET user-details. */
userDetailsRoute.get('/', detailsController.getDetails);
  
/* POST user-details. */
userDetailsRoute.post('/add-details/:id', detailsController.addDetails);

/* GET aggregated user-details. */
userDetailsRoute.get('/aggregated-details/', detailsController.getAggregDetails);

module.exports = userDetailsRoute;
