const { Router } = require("express");
const blogRouter = Router();
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const { mongoose } = require("mongoose");

blogRouter.get("/", async (req, res) => {
  try {
    let { page } = req.query; // let {page, where} = req.query;
    page = parseInt(page); // convert to integer
    const totalCnt = await Blog.countDocuments({}); // total number of blogs in db
    const blogs = await Blog.find({})
      .skip(page * 7)
      .limit(7)
      .populate({
        path: "user",
        select: "email name",
      });
    return res.status(200).send({ blogs, totalCnt });
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
      createdAt: new Date(),
    });
    await blog.save();
    return res.status(200).send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
