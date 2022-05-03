const orderModel = require('../Models/Order');
const paymentModel = require('../Models/Payments');
const User = require('../Models/User1')

const getOrders = (req, res) => {
try {
    orderModel.find().populate('user_id', 'email').then(result => {
        res.json(result);
    });
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const getOrdersBySorting = (req, res) => {
try {
    orderModel.find({
            runtime: {
                $lt: 15
            }
        }).sort({
            Quantity: 1
        })
        .then((result) => {
            res.json(result);
        });
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const addOrders = (req, res) => {
try {
    const {
        user_id,
        order_number,
        itemName,
        Quantity
    } = req.body;

    const newUserData = {
        user_id,
        order_number,
        itemName,
        Quantity
    }

    const newUser = new orderModel(newUserData);

    newUser.save()
        .then(() => res.status(200).json('Order Added'))
        .catch(err => res.status(400).json('Error: ' + err));
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

//aggregate example
const aggregateOrders = (req, res) => {
try {
    orderModel.aggregate([
        { $match: { Quantity: { $lte: 3 } } },
        {
            $group: {
                _id: {
                    itemName: "$itemName",
                    Quantity: "$Quantity"
                },
                totalQuantity: {
                    $sum: "$Quantity"
                }
            }
        },
        {
            $sort: {
                totalQuantity: -1
            }
        }
    ]).then((result) => {
        res.json(result);
    });
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

//lookup example
const lookupOrders = (req, res) => {
try {
    orderModel.aggregate([{
        // $lookup: {
        //     from: "payment",
        //     localField: "_id",
        //     foreignField: "order_id",
        //     as: "Orders"
        // }
        $lookup: {
            from: "payment",
            let: {
                orderId: "$_id",
                // userId: "$user_id"
            },
            pipeline: [{
                $match: {
                    $expr: {
                        $and: [
                        {
                            $eq: ["$order_id", "$$orderId"]
                        },
                        {
                            $eq: ["$Status", "Paid"]
                        }
                    ]
                    }
                }
            }],
            as: "Orders"
        },
    }]).then((result) => {
        res.json(result);
    });
} catch {
    return res.json({
        success: false,
        message: error.message
    })
}
}

module.exports = {
    getOrders,
    getOrdersBySorting,
    addOrders,
    aggregateOrders,
    lookupOrders
}