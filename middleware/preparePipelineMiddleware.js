
module.exports.preparePipelineMiddleware = async(req, res, next)=> {
    try {
        const {page = 1, search, tags} = req.query;
        const limit = 10;
        const skip = (page-1)*limit;
        const pipeline = [];
        
        // depending on which page the request is coming from, the first match pipeline will change. 
        // to decide all the public posts or specific posts of someone.
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

    } catch (error) {
        return res.status(500).json({
            status:'fail - pipeline creation failed',
            message:error?.message,

        })
    }
}