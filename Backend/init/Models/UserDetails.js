const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userDetails = new Schema({
    user_id :{type: Schema.Types.ObjectId, ref: 'User'},
    email : {
        type : String
    },
    address : {
        type : String
    },
    gender : {
        type : String,
       
    },
    Occupation : {
        type : String,
     
    },
    Contact : {
        type : Number,
       
    },
},{
    collection : 'user-details'
});

module.exports = mongoose.model('userDetails', userDetails);