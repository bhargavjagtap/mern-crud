var express = require('express');
const employeeRoute = express.Router(); 
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
let empModel = require('../Models/Employee');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

/* GET employees listing. */
employeeRoute.get('/', function(req, res, next) {
  empModel.find(function(err, empList){
    if (err) {
      console.log(err);
    } else {
      res.json(empList);
    }
  });
});

/* POST employees. */
employeeRoute.post('/addEmp',upload.single('photo'), function(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    console.log(req.file);
    const photo = req.file.photo;
    const email = req.body.email;

    const newUserData = {
      firstName,
      lastName,
      photo,
      email
    }

    const newUser = new empModel(newUserData);

    newUser.save()
           .then(() => res.status(200).json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

/* GET employee By ID */
employeeRoute.get('/editEmp/:id', function(req, res, next) {
  let id = req.params.id;
  empModel.findById(id, function(err, emp){
    res.json(emp);
  });
});

/* Update employee By ID */
employeeRoute.post('/updateEmp/:id', function(req, res, next) {
  empModel.findById(req.params.id, function(err, emp){
    if (!emp){
      res.status(404).send('data is not found');
    }else{
      emp.firstName = req.body.firstName;
      emp.lastName = req.body.lastName;
      emp.email = req.body.email;
      emp.Phone = req.body.Phone;
      emp.save().then(emp => {
        res.json('Update complete');
      }).catch(err => {
        res.status(400).send("Update failed",err);
      });
    }
  });
});

/* DELETE employee */
employeeRoute.get('/deleteEmp/:id', function(req, res, next) {
  empModel.findByIdAndRemove({_id:req.params.id}, function(err, emp){
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = employeeRoute;
