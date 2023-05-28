const postModel = require("../models/post")


module.exports.getPostsController = async(req, res, next)=> {
    try {
        const data = await postModel.aggregate(req.pipeline);
        return res.status(200).json({
            status:'success',
            data:data[0]
        })
    } catch (error) {
        return res.status(500).json({
            status:'fail', 
            error:error?.message
        })
    }
}