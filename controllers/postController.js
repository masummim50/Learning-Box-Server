const { default: mongoose } = require("mongoose");
const postModel = require("../models/post");
const userModel = require("../models/user");


module.exports.getAllPostsController = async(req, res, next)=> {
    try {
        // const posts = await postModel.find({});
        const posts = await userModel.findOne({email:req.user.email}).populate('posts').select('posts');
        return res.status(200).json(posts.posts);
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            message:'Internal server error',
            error:error?.message
        })
    }
}

module.exports.getFilteredPostsController = async(req, res, next)=> {
    try {
        const {page = 1, search, tags} = req.query;
        const limit = 10;
        const skip = (page-1)*limit;
        const pipeline = [];
        
        pipeline.push({
            $match: {user: new mongoose.Types.ObjectId(req.user.id)}
        })
        if(search){
            const searchArray = search.split(" ").map(s=> new RegExp(s, 'i'));
            pipeline.push({
                $match: {title: {$in: searchArray}}
            })
        }
        if(tags){
            const tagsArray = Array.isArray(tags)? tags: [tags];
            pipeline.push({
                $match: {tags: {$in: tagsArray}}
            })
        }
        pipeline.push({
            $facet: {
              totalCount: [{ $count: "count" }],
              posts: [{ $skip: skip }, { $limit: limit }],
            },
          });
        
        pipeline.push({
            $project: {
                posts: 1,
                totalCount: {$arrayElemAt: ["$totalCount.count", 0]}
            }
        })
        
        const data = await postModel.aggregate(pipeline);
        // testing new phase
        // data[0].page = page;
        // data[0].totalCount = data[0]?.totalCount[0]?.count || 0;
        // if(data[0]?.totalCount> (page*limit)) data[0].nextPage = parseFloat(page)+1;
        // res.status(200).json({
        //     data:data[0]
        // });
        res.status(200).json({
            data
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
        message: error?.message
        });
    }};
    

module.exports.createPostController = async(req, res,next)=> {
    try {
        const postObject = {...req.body, user:req.user.id};
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


module.exports.updatePostController = async(req, res, next)=> {
    try {
        const id = req.params.id;
        const updateData = await postModel.findOneAndUpdate({_id:id}, req.body, {new:true})
        return res.status(200).json({
            status:'success',
            data:updateData
        })
    } catch (error) {
        return res.status(500).json({
            status:'failed',
            message:'error from update controller',
            error:error?.message
        })
    }
}

module.exports.deletePostController = async(req, res, next)=> {
    try {
        const id = req.params.id;
        const userid = req.params.userid;
        if(req.user.id == userid){
            
        const deleted = await postModel.deleteOne({_id:id});
        return res.status(200).json({
            status:'success',
            message:'data deleted'
        })
        }else{
            return res.status(400).json({
                status:'fail',
                message:'you do not have permission to delete this'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:'failed',
            message:'error from update controller',
            error:error?.message
        })
    }
}