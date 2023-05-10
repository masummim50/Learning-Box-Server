const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    color:{
        type:String,
        required:true
    },
    isPublic:{
        type:boolean,
        default: false
    }

})

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;