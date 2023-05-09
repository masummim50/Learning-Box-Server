
const express = require('express');
const { getAllPostsController, createPostController, getFilteredPostsController } = require('../controllers/postController');
const { checkLoginMiddleware } = require('../middleware/checkLoginMiddlware');
const { filterAggregation } = require('../controllers/aggregateController');

const postRouter = express.Router();

postRouter.get("/posts", checkLoginMiddleware, getFilteredPostsController);
postRouter.post("/post", checkLoginMiddleware, createPostController);
postRouter.get("/filteredposts",checkLoginMiddleware, getFilteredPostsController)
postRouter.get("/testing", filterAggregation)

module.exports = postRouter;