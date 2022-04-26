const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    title: {
    type: String
    },
    fans: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }]
},{
    collection : 'Story'
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;