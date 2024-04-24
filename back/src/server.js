const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const mongoose = require("mongoose");
const { blogRouter } = require("./routes/blogRouter");
const { commentRouter } = require("./routes/commentRouter");
const { getFaker } = require("../faker");
require("dotenv").config();
const dbUrl = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

const server = async function () {
  try {
    await mongoose.connect(dbUrl);
    mongoose.set("debug", true);
    console.log("db connected");
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment", commentRouter);
    app.listen(4000, async function () {
      try {
        console.log("server on port 4000");
        // await getFaker(10, 2);
      } catch (error) {
        console.error(error.message);
      }
    });
  } catch (error) {
    console.error("unable to connect to db", error.message);
  }
};

server();
