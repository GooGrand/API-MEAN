const bcrypt = require('bcryptjs')
const User = require('../models/User')


module.exports.login = function (req, res) {
    res.json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

module.exports.register = async function (req, res) {
    // email password throw err if it's exist passw security
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // User is existing, throw err
        res.status(409).json({
            message: 'User is existing. Try another email'
        })
    } else {
        //Need to make a user

        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            // Fix err
        }
        
    }
}