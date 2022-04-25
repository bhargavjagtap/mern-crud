const userDetailsModel = require('../Models/UserDetails')
const User = require('../Models/User1')
const paymentModel = require('../Models/Payments')
const orderModel = require('../Models/Order')

const getDetails = async(req, res) => {
try {
    let q = await userDetailsModel.find();
    res.json(q);
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const getAggregDetails = (req, res) => {
try {
    paymentModel.aggregate([{
        $match: {
            Status:"Paid"
        }
    },
    {
        $group: {
            _id: null,
            total: {
                $sum: "$Amount"
            },
        }
    },
    {
        $skip: 1
    },
    
]).then(result => {
        res.json(result);
    });
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const addDetails = async(req, res) => {
try {
    const query = {
        _id: req.params.id
    };

    const user = await User.findOne(query);
    const {
        email,
        address,
        gender,
        Occupation,
        Contact
    } = req.body;

    const newUserData = {
        email,
        address,
        gender,
        Occupation,
        Contact
    }

    const newUser = new userDetailsModel(newUserData);
    if (user.role == 'admin' && user._id == req.params.id) {
        let result = await newUser.save()
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: 'User Details Added'
            })
        }
    } else {
        res.status(403).json('Access denied');
    }
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

module.exports = {
    getDetails,
    addDetails,
    getAggregDetails
}