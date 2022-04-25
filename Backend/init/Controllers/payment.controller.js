const paymentModel = require('../Models/Payments');
const User = require('../Models/User1');

const getPayment = async(req, res) => {
try {
    const query = {
        _id: req.params.id
    };

    const user = await User.findOne(query);
    // since this method returns the matched document, not a cursor, print it directly
    if (user.role == 'admin') {
        paymentModel.find().populate('order_id','itemName').then(result => {
            res.json(result);
        });
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

//aggregation
const aggreagatePayment = async(req, res) => {
try {
    // paymentModel.aggregate([
    //     { $match: { Status: req.body.Status  } },
    //     {
    //         $lookup: {
    //             from: 'order',//collection name
    //             localField: 'order_id',//field name
    //             foreignField: '_id',//field name
    //             as: 'orderData'
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'user',//collection name
    //             localField: 'user_id',//field name
    //             foreignField: '_id',//field name
    //             as: 'userData'
    //         }
    //     },
    //     {
    //         $unwind: "$userData"
    //     },
    //     {
    //         $unwind: "$orderData"
    //     },
    //     {
    //         $sort: {'Amount':-1}
    //     },
    //     {
    //         $project: {
    //             "userData.email": 1,
    //             "orderData.itemName": 1,
    //             "orderData.order_number": 1,
    //             "orderData.Quantity": 1,
    //             "Status": 1,
    //         }
    //     }
    // ]).then(result => {
    //     res.json(result);
    // })
    paymentModel.find(
        {Status: req.body.Status},
        {"__v":0})
    .populate('order_id',['itemName','order_number','Quantity'])
    .populate('user_id','email')
    .then(result => {
        res.json(result);
    })
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const addPayment = (req, res) => {
try {
    const {
        user_id,
        order_id,
        Amount
    } = req.body;

    const newUserData = {
        user_id,
        order_id,
        Amount
    }

    const newUser = new paymentModel(newUserData);

    newUser.save()
        .then(() => res.status(200).json('payment Added'))
        .catch(err => res.status(400).json('Error: ' + err));
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

// const updatePayment = (req, res) => {
// try {
//     paymentModel.updateMany({},{$set : {"Status": "Pending"}}).then(result => {
//         res.json(result);
//     })
// } catch (error) {
//     return res.json({
//         success: false,
//         message: error.message
//     })
// }
// }

const updatePayment = (req, res) => {
try {
    paymentModel.findByIdAndUpdate({"_id":req.params.id},{$set : {"Status": req.body.Status}}).then(result => {
        res.json(result);
    })
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

module.exports = {
    getPayment,
    addPayment,
    updatePayment,
    aggreagatePayment
}