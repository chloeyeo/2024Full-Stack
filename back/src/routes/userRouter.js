const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

userRouter.get("/", async (_, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
    });
    await user.save();
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "email does not exist" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "wrong password" });
    }

    /* CREATE A TOKEN -- start -- */
    const payload = {
      userid: user._id.toHexString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    /* CREATE A TOKEN -- end -- */
    console.log("user", user);

    return res.status(200).send({ user, accessToken, message: "login OK" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    return res.status(200).send({ message: "logout OK" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

userRouter.get("/auth", auth, async (req, res) => {
  console.log("Auth middleware executing...");
  try {
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      image: req.user.image,
    };
    return res.status(200).send({ user, message: "auth OK" });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = { userRouter };
