const personModel = require('../Models/Person');
const storyModel = require('../Models/Story');
const mongoose = require('mongoose');

const addAuthor = async(req, res) => {
    try {
        const author = new personModel({
            name: req.body.name,
            age: req.body.age
        });
          
    await author.save(async()=>{
        const story = new storyModel({
            title: req.body.title,
            author: author._id
        })
        await story.save();
    });
    return res.status(200).json({
        success: true,
        message: 'Author Added',
        data: author
    });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    addAuthor
}