
const express = require('express');
const { getAllPostsController, createPostController, getFilteredPostsController, updatePostController, deletePostController } = require('../controllers/postController');
const { checkLoginMiddleware } = require('../middleware/checkLoginMiddlware');
const { filterAggregation } = require('../controllers/aggregateController');
const { preparePipelineMiddleware } = require('../middleware/preparePipelineMiddleware');
const { getPostsController } = require('../controllers/getPostcontroller');

const postRouter = express.Router();

// postRouter.get("/posts", checkLoginMiddleware, getFilteredPostsController);
// postRouter.post("/post", checkLoginMiddleware, createPostController);
// postRouter.get("/filteredposts",checkLoginMiddleware, getFilteredPostsController)
// postRouter.get("/testing", filterAggregation)

postRouter.get("/home",checkLoginMiddleware, preparePipelineMiddleware, getPostsController)
postRouter.get("/publicPosts", checkLoginMiddleware, preparePipelineMiddleware, getPostsController);
postRouter.patch("/update/:id", checkLoginMiddleware, updatePostController)
postRouter.delete("/delete/:id/:userid", checkLoginMiddleware, deletePostController)

module.exports = postRouter;