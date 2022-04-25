const User = require('../Models/User1')
const UserDetail = require('../Models/UserDetails')

const getUsers = async(req, res) => {
try {
    let data = await User.find();
    return res.json({data});
} catch (error) {
    return res.json({
        success: false,
        message: error.message
    })
}
}

const addUsers = (req, res) => {
try {
    const { email, password, role, address, gender, Occupation, Contact } = req.body;
    const newUserData = {
        email,
        password,
        role
    }
    const newUser = new User(newUserData);
    newUser.save()
        .then((data) => {
        const newUserDetails = {
        user_id: data._id,
        address,
        gender,
        Occupation,
        Contact
        }
        const newUser1 = new UserDetail(newUserDetails)
        newUser1.save().then(() => {
        res.status(200).json('User Added')
        })
        
    })
        .catch(err => res.status(400).json('Error: ' + err));
    } catch (error) {
    return res.json({
        success:false,
        message: error.message})
    }
}

const updateUsers = (req, res) => {
try {
    User.findByIdAndUpdate(req.params.id, {
        email:  req.body.email,
        role: req.body.role,
    }).then(user => {
        res.status(200).json({
            data: user,
            message:'User Updated'
        })
    });
    } catch (error) {
    return res.json({
        success:false,
        message: error.message})
    }
}

const deleteUsers = (req, res) => {
try {
    User.findByIdAndDelete(req.params.id).then(user => {
        res.status(200).json({
            data: user,
            message:'User Deleted'
        })
    });
    } catch (error) {
    return res.json({
        success:false,
        message: error.message})
    }
}

module.exports = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers
}