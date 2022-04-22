var express = require('express');
const airbnbRoute = express.Router(); 
const mongoose = require('mongoose');
const db = mongoose.connection
// const userDetailsModel = require('../Models/UserDetails')

//MongoDB url
const mongoDBurl = 'mongodb://localhost:27017/testdb';
// const mongoDBurl = 'mongodb+srv://bhargav:bhargav@cluster0.23inr.mongodb.net/testdb?retryWrites=true&w=majority'

mongoose.Promise = global.Promise;

//connect to DB
mongoose.connect(mongoDBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
  },
  err => {
    console.log("Problem connecting with DB", err);
  });


/* GET airbnb list */
airbnbRoute.get('/', function(req, res, next) {
    var collection = db.collection('sample_airbnb');

    collection.find().toArray(function(err, list) {
        res.json(list);
    });    
});

// Find one  
airbnbRoute.get('/single', async function(req, res, next) {
    var collection = db.collection('sample_airbnb');
    const query = { name: "Apt Linda Vista Lagoa - Rio" };
    
    await collection.findOne(query).then(result => {
        res.json(result);
        }
    )   
});
  
/* POST user-details. */
// userDetailsRoute.post('/add-details', function(req, res, next) {
//     const { user_id, address, gender, Occupation, Contact } = req.body;

//     const newUserData = {
//         user_id, address, gender, Occupation, Contact
//     }

//     const newUser = new userDetailsModel(newUserData);

//     newUser.save()
//             .then(() => res.status(200).json('User-Details Added'))
//             .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = airbnbRoute;