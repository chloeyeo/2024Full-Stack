const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  console.log("inside auth middleware function");
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token received:", token);
  if (token === null) return res.sendStatus(401);
  console.log("token not null");

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    if (!decodedToken || !userId) {
      return res
        .status(401)
        .send({ error: "token userId is undefined or null" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).send({ error: "user not found" });
    }
    console.log("user authorized");
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
