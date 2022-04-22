const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connection = () => {
    //MongoDB url
    const mongoDBurl = process.env.LOCAL_URI;
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
}

module.exports = connection;

