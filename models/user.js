const { default: mongoose} = require("mongoose");

const userschema =  mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    posts: [
        {
            type:mongoose.Types.ObjectId,
            ref:'Post'
        }
    ]
})

const userModel =  mongoose.model('user', userschema);
module.exports = userModel;