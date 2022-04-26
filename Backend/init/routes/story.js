var express = require('express');
const storyRouter = express.Router(); 
const storyController = require("../Controllers/story.controller");

/* GET person listing. */
storyRouter.get('/', storyController.getStory);
  
/* POST person. */
// storyRouter.post('/add-author', storyController.addAuthor);

/* Update person. */
// storyRouter.post('/update-author/:id', storyController.updateUsers);

/* Delete person. */
// storyRouter.delete('/delete-author/:id', storyController.deleteUsers);

module.exports = storyRouter;