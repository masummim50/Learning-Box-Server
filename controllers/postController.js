const postModel = require("../models/post");
const userModel = require("../models/user");


module.exports.getAllPostsController = async(req, res, next)=> {
    try {
        // const posts = await postModel.find({});
        const posts = await userModel.findOne({email:req.user.email}).populate('posts')
        return res.status(200).json({
            data:posts
        });
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            message:'Internal server error',
            error:error?.message
        })
    }
}

module.exports.createPostController = async(req, res,next)=> {
    try {
        const postObject = req.body;
        const createdPost = await postModel.create(postObject);
        await userModel.findByIdAndUpdate(req.user.id, {
            $push: {posts:createdPost._id}
        });
        return res.status(200).json({
            status:'success',
            data:createdPost
        })
    } catch (error) {
        return res.status(500).json({
            status:'success',
            message:'Internal server error',
            error:error?.message
        })
    }
}