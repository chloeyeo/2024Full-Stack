const { Router } = require("express");
const blogRouter = Router();
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const { mongoose } = require("mongoose");

blogRouter.get("/", async (_, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).send({ blogs });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || typeof title !== "string") {
      res.status(400).send({ error: "title is required as string" });
    }
    if (!content || typeof content !== "string") {
      res.status(400).send({ error: "content is required as string" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      res
        .status(400)
        .send({ error: "userId is required - not a valid userId" });
    }
    let user = await User.findById(userId);
    if (!user) {
      res.status(400).send({ error: "user does not exist" });
    }
    const blog = new Blog({
      ...req.body,
      user,
    });
    await blog.save();
    return res.status(200).send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
