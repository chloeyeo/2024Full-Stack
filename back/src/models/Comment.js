const { Types, Schema, model } = require("mongoose");
const CommentSchema = new Schema({
  content: { type: String, required: true },
  //   isLive: { type: Boolean, required: true, default: false },
  blog: { type: Types.ObjectId, required: true, ref: "blog" },
  user: { type: Types.ObjectId, required: true, ref: "user" }, // gets _id of "user" model instance (ref is like join in mysql)
  createdAt: Date,
});
const Comment = model("comment", CommentSchema);
module.exports = { Comment };
