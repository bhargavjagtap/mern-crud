var express = require('express');
const orderRoute = express.Router(); 
const orderController = require('../Controllers/order.controller');

/* GET orders. */
orderRoute.get('/', orderController.getOrders);

/* GET orders by sorting and projecting */
orderRoute.get('/sp', orderController.getOrdersBySorting);
  
/* POST order. */
orderRoute.post('/add-order', orderController.addOrders);

/* Aggregate order. */
orderRoute.get('/aggregate', orderController.aggregateOrders);

/* Lookup order. */
orderRoute.get('/lookup', orderController.lookupOrders);

module.exports = orderRoute;
