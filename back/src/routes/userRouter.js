const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");
const { hash } = require("bcryptjs");

userRouter.get("/", async (_, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// userRouter.get("/register", async (req, res) => {
//   try {
//     return res.send("test");
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

userRouter.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
    });
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await User.findByIdAndUpdate(
      userId,
      { username, password: hashedPassword },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
