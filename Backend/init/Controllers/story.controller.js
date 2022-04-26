const storyModel = require('../Models/Story');
const authorModel = require('../Models/Person');

const getStory = async(req,res) => {
    try {
        storyModel.
        findOne({
            title: 'Riddles'
        }).
        populate('author').
        populate('fans').then(result => {
            res.status(200).json(result);
        })
        
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }

}

module.exports = {
    getStory
}