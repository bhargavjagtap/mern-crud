var express = require('express');
const personRouter = express.Router(); 
const personController = require("../Controllers/person.controller");

/* GET person listing. */
// personRouter.get('/', personController.addAuthor);
  
/* POST person. */
personRouter.post('/add-author', personController.addAuthor);

/* Update person. */
// personRouter.post('/update-author/:id', personController.updateUsers);

/* Delete person. */
// personRouter.delete('/delete-author/:id', personController.deleteUsers);

module.exports = personRouter;
