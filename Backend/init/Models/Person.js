const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
        type:String
    },
    age: {
        type:Number
    },
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }]
},{
    collection : 'Person'
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;