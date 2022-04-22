const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    user_id :{type: Schema.Types.ObjectId, ref: 'User'},
    order_number : {
        type : Number
    },
    itemName : {
        type : String
    },
    Quantity : {
        type : Number
    },
},{
    collection : 'order'
});

module.exports = mongoose.model('Order', Order);