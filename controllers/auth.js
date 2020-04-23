const bcrypt = require('bcryptjs')
const User = require('../models/User')


module.exports.login = async function (req, res) {
   // send email pasw check it, then throw err or continue

    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // check passw, user existing

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Generate Token

            
            
        } else {
            //throw err

            res.status(401).json({
                message: 'Password is not correct.'
            })
        }

    } else {
        // user is not existing, err

        res.status(404).json({
            message: 'user is not existing'
        })
    }

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