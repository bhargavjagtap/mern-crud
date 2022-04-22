const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const routes  = require('./routes');
const dbconnection = require('./config/dbconnection');
const dotenv = require("dotenv");
dotenv.config();

const port = 3002;
dbconnection();
app.set('port',port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public",express.static('public'));

app.use('/', routes);

// app.use('/employees', empRouter);
// const empRouter = require('./routes/employees');

app.listen(app.get('port'),()=>{
  console.log('Server Started',port);
});