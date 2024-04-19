const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

userRouter.get("/", async (_, res) => {
  try {
    // find() finds all, findOne() just finds a single instance.
    const users = await User.find({}); // find all authenticated users 회원가입한 유저들
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

    // const user = await User.findOne({ email: req.body.email });
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
      // user._id is object data, so we convert it to string using .toHexString()
      userid: user._id.toHexString(),
      email: user.email,
      role: user.role,
    }; // payload is what to put inside the token
    // e.g. payload consists of email or role etc, but Not password.
    // token includes the logged in user's information but obv not the password
    // make the token expire in an hour
    // so that the user can no longer be stayed as logged in after an hour
    // when user logs out, token is deleted and cannot be used
    // when user logs in again, token is re-created
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    /* CREATE A TOKEN -- end -- */
    // { user, accessToken, message: "login OK" } is action.payload
    // action.payload.accessToken, action.payload.message
    return res.status(200).send({ user, accessToken, message: "login OK" });
  } catch (error) {
    // return res.status(500).send({ error: error.message });
    return res.status(500).send({ message: error.message });
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    return res.status(200).send({ message: "logout OK" });
  } catch (error) {
    // return res.status(500).send({ message: error.message });
    return res.status(500).send({ message: "logout fail" });
  }
});

// we use the auth middleware (middleware always goes in the middle between url and func)
userRouter.get("/auth", auth, async (req, res) => {
  // first goes to auth middleware function before going inside this userRouter.get function
  // receives token in header of request
  console.log("Auth middleware executing...");
  try {
    // get the req.user created from auth middleware
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      image: req.user.image,
    };
    return res.status(200).send({ user, message: "auth OK" });
  } catch (error) {
    // Log the error and send a 500 response with the error message
    console.error("Error in auth middleware:", error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = { userRouter };
