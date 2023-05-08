const userModel = require("../models/user");
const jwt = require('jsonwebtoken')

require('dotenv').config()


module.exports.logInUserController = async(req, res, next)=> {
    // receiving only name and email from req.body,
    // check if that email exist, if so send that back as response.
    // if does not exists, create a new user with those information assign a accesstoken with jwt and send it back.
    console.log('before try', req.body)
    
    try {
        console.log('body', req.body)
        const {name, email} = req.body;
        const user = await userModel.findOne({email}).select('-posts');
        console.log(user)
        if(user){
            const payload = {
                email:user.email,
                name:user.name,
                id:user._id,
            }
            const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'2 days'})
            return res.status(200).json({
                user,
                accessToken:token,
            })
        }else{
            console.log('inside else')
            const newUser = await userModel.create(req.body);
            const payload = {
                email:user.email,
                name:user.name,
                id:newUser._id,
            }
            const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'2 days'})
            return res.status(200).json({
                newUser,
                accessToken:token,
            })
        }
    } catch (error) {
        console.log("catch error",error)
        return res.status(500).json({
            status:'fail',
            error:error?.message,
        })
    }
}