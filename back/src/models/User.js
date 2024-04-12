const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 4,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  createdAt: Date,
});
const User = mongoose.model("user", UserSchema);

module.exports = { User };
