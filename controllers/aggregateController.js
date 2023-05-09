const postModel = require("../models/post")

module.exports.filterAggregation = async(req, res, next)=> {
    try {
        const posts  = await postModel.find({});
        const search = "adding some redux title".split(" ").map(s=> new RegExp(s, 'i'));
        const pipeline = [];
        if(search.length>0){
            pipeline.push({
                $match:{
                    title: {$in: search} 
                }
            });
            pipeline.push({
                $group: {
                    _id:null,
                    totalCount: {$sum: 1},
                    documents: {$push: "$$ROOT"}
                }
            })
        }

        const difpipeline = [
            {
                $match: {title: {$in: search}}
            },
            {
                $group: {
                    _id:null,
                    count: {$count: {}}
                }
            }
        ]

        const piped = await postModel.aggregate(difpipeline);



        res.status(200).json({
            message:'testing phase success',
            posts,
            piped
        })
    } catch (error) {
        res.status(400).json({
            message:error?.message
        })
    }
}