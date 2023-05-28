const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

var admin = require("firebase-admin");

var serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const {promisify} = require('util');

require("dotenv").config();

module.exports.logInUserController = async (req, res, next) => {
  // receiving only name and email from req.body,
  // check if that email exist, if so send that back as response.
  // if does not exists, create a new user with those information assign a accesstoken with jwt and send it back.
  
  try {
    console.log(req.body);
    
    const {uid, name, email} = await admin.auth().verifyIdToken(req.body.token);

    console.log(uid, name, email)

    const user = await userModel.findOne({id:uid}).select('-posts -id');
      console.log(user)
      if(user){
          const payload = {
              email:user.email,
              name:user.name,
              id:user._id,
          }
          const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'7 days'})
          return res.status(200).json({
              user,
              accessToken:token,
          })
      }else{
          console.log('inside else')
          const newUser = await userModel.create({
            id:uid,
            name,
            email
          });
          delete newUser.id;
          const payload = {
              email:email,
              name:name,
              id:newUser._id,
          }
          const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'2 days'})
          return res.status(200).json({
              newUser,
              accessToken:token,
          })
      }
    
  } catch (error) {
    console.log("catch error", error);
        return res.status(500).json({
            status:'fail',
            error:error?.message,
        })
  }

  // first try
  // try {
  //     console.log('body', req.body)
  //     const {name, email} = req.body;
  //     const user = await userModel.findOne({email}).select('-posts');
  //     console.log(user)
  //     if(user){
  //         const payload = {
  //             email:user.email,
  //             name:user.name,
  //             id:user._id,
  //         }
  //         const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'2 days'})
  //         return res.status(200).json({
  //             user,
  //             accessToken:token,
  //         })
  //     }else{
  //         console.log('inside else')
  //         const newUser = await userModel.create(req.body);
  //         const payload = {
  //             email:email,
  //             name:name,
  //             id:newUser._id,
  //         }
  //         const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'2 days'})
  //         return res.status(200).json({
  //             newUser,
  //             accessToken:token,
  //         })
  //     }
  // } catch (error) {
  //     console.log("catch error",error)
  //     return res.status(500).json({
  //         status:'fail',
  //         error:error?.message,
  //     })
  // }
};
