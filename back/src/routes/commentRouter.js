const { Router } = require("express");
const commentRouter = Router({ mergeParams: true }); // merge params with those from route in server js
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const { Comment } = require("../models/Comment");
const { mongoose } = require("mongoose");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId } = req.params; // "/blog/:blogId/comment"
    const { content, userId } = req.body;

    if (!content || typeof content !== "string") {
      res.status(400).send({ message: "content is required as string" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      res
        .status(400)
        .send({ message: "userId is required - not a valid userId" });
    }

    if (!mongoose.isValidObjectId(blogId)) {
      res
        .status(400)
        .send({ message: "blogId is required - not a valid blogId" });
    }

    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ]);

    if (!blog) {
      res.status(400).send({ message: "blog does not exist" });
    }
    if (!user) {
      res.status(400).send({ message: "user does not exist" });
    }

    const comment = new Comment({
      content,
      blog,
      user,
      createdAt: new Date(),
    });
    await comment.save();
    return res.status(200).send({ comment });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!mongoose.isValidObjectId(blogId)) {
      res
        .status(400)
        .send({ message: "blogId is required - not a valid blogId" });
    }

    // const comment = await Comment.find({ blog: { _id: blogId } });
    const comment = await Comment.find({ blog: blogId })
      .populate([{ path: "user", select: "email name" }])
      .sort({ createdAt: 1 });
    return res.status(200).send({ comment });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

commentRouter.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete({ commentId });
    if (!comment)
      return res.status(400).send({ message: "comment does not exist" });
    return res
      .status(200)
      .send({ message: "comment deletion successful", comment });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { commentRouter };
