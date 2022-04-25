var express = require('express');
const userRoute = express.Router(); 
const usersController = require("../Controllers/user1.controller");

/* GET user listing. */
userRoute.get('/', usersController.getUsers);
  
/* POST user. */
userRoute.post('/add-user', usersController.addUsers);

/* Update user. */
userRoute.post('/update-user/:id', usersController.updateUsers);

/* Delete user. */
userRoute.delete('/delete-user/:id', usersController.deleteUsers);

module.exports = userRoute;
