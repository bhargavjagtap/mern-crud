const User = require('../Models/User1')
const UserDetail = require('../Models/UserDetails')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// const addUsers = (req, res) => {
// try {
//     const { email, password, role, address, gender, Occupation, Contact } = req.body;
//     const newUserData = {
//         email,
//         password,
//         role
//     }
//     if (!email || !password || !role) return res.json({
//         message:"Fields cannot be empty"
//     });

//     User.findOne({email: email}).then(user => {
//         if (user) {
//             return res.json({
//                 message: "User already exists"
//             })
//         }
//         return;
//     }).catch(err => {
//         if (err) {
//             return res.json({
//                 message: err.message
//             })
//         }
//     })
//     const newUser = new User(newUserData);
//     newUser.save()
//         .then((data) => {
//             console.log(data);
//         const newUserDetails = {
//         user_id: data._id,
//         address,
//         gender,
//         Occupation,
//         Contact
//         }
//         const newUser1 = new UserDetail(newUserDetails)
//         newUser1.save().then(() => {
//         return res.status(201).json('User Added')
//         })
        
//     }).catch(err => {
//         return res.json({
//             'Error': err
//         })
//     });
//     } catch (error) {
//         console.log(error);
//     }
// }
const addUsers = async(req, res) => {
    try {
        const { email, password, role, address, gender, Occupation, Contact } = req.body;
        let newUserData = {
            email,
            password,
            role
        }
        if (!(email && password && role)) return res.json({
            message:"Fields cannot be empty"
        });
    
        const user = await User.findOne({email: email})
        if (user) {
            return res.json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        newUserData = new User({
        email,
        password: hashedPassword,
        role
        });
        let res_data = await newUserData.save();

        const newUserDetails = {
        user_id: newUserData._id,
        address,
        gender,
        Occupation,
        Contact
        };

        const newUser1 = new UserDetail(newUserDetails);
        await newUser1.save();
        return res.json({message:'User Added'})
       
        } catch (error) {
            console.log(error);
        }
    }

const userLogin = async(req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email or password" });
        }
        bcrypt.compare(password, savedUser.password).then(doMatch => {
            if (doMatch) {
            // res.json({ message: "Successfully logged in" });
            const payload ={
                id:savedUser._id,
                email:savedUser.email
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:86400},(err,token)=>{
                if(err) return res.json({message:err})
                return res.json({
                message:"Success",
                token: "Bearer "+token
                });
            })
            User.token = token;
        }
        else{
            return res.status(422).json({ error: "Invalid email or password" });
        }});
        })
        .catch(err => res.status(500).json({ error: err }));
}

const updateUsers = async(req, res) => {
try {
    const id = req.params.id;
    if(!id){
        return res.json({
            success: false,
            message: "No id found"
        })
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
        email:  req.body.email,
        role: req.body.role,
    });
    return res.json({
        success: true,
        message: "User Updated"
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
    userLogin,
    updateUsers,
    deleteUsers
}