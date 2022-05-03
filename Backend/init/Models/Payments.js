const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Payment = new Schema({
    user_id :{type: Schema.Types.ObjectId, ref: 'User'},
    order_id :{type: Schema.Types.ObjectId, ref: 'Order'},
    Amount : {
        type : Number,
        required: true, 
    },
    Status:{
        type: String,
        default: 'Pending'
    }
},{
    collection : 'payment'
});

module.exports = mongoose.model('Payment', Payment);