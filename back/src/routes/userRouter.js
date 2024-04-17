const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (_, res) => {
  try {
    // find() finds all, findOne() just finds a single instance.
    const users = await User.find({}); // find all authenticated users 회원가입한 유저들
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// userRouter.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     return res.status(200).send({ user });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

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
    return res.status(500).send({ error: error.message });
  }
});

// userRouter.delete("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findByIdAndDelete(userId);
//     return res.status(200).send({ user });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

// userRouter.put("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { username, password } = req.body;
//     const hashedPassword = await hash(password, 10);
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $set: { username, password: hashedPassword } },
//       { new: true }
//     );
//     return res.status(200).send({ user });
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

module.exports = { userRouter };
