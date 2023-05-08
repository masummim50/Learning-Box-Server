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

        const { title, tags } = req.query;

const query = postModel.find();

if (title) {
  const titleTerms = title.split(' ').map(term => new RegExp(term, 'i'));
  query.where({ title: { $in: titleTerms } });
}

if (tags) {
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  query.where({ tags: { $in: tagsArray } });
}

const posts = await query.exec();

res.status(200).json({
  message: 'getting page',
  posts: posts
});











        // const posts = await postModel.find({})
        // console.log('after exec', posts)
        // // console.log(posts)
        // console.log(req.params)
        // console.log(req.query)
        // let responsePosts = posts;
        // if(req.query.title){
        //     const titles = req.query.title.split(" ");
        //     const filtered = responsePosts.filter(post=> {
        //         return titles.some(title=> post.title.toLowerCase().includes(title))
        //     })
        //     // console.log('filtered posts: ', filtered)
        //     responsePosts = filtered;
        // }

        // if(req.query.tags){
        //     const tagsArray = [];
        //     if(typeof req.query.tags === 'string'){
        //         tagsArray.push(req.query.tags)
        //     }
        //     const tagsfiltered = responsePosts.filter(post=> {
        //         return tagsArray.some(tag=> post.tags.includes(tag));
        //     })
        //     responsePosts = tagsfiltered;

        // }
        // console.log('all filtered', responsePosts.slice(0,1))

        // res.status(200).json({
        //     message:'getting page',
        //     posts: responsePosts.slice(0,1)
        // })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({
            message:error?.message,
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