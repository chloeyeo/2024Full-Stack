const { Types, Schema, model } = require("mongoose");
const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: false },
  user: { type: Types.ObjectId, required: true, ref: "user" }, // gets _id of "user" model instance (ref is like join in mysql)
  createdAt: Date,
});
const Blog = model("blog", BlogSchema);
module.exports = { Blog };
