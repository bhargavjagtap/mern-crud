const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true,
    },
},{
    collection : 'user'
});

module.exports = mongoose.model('User', User);