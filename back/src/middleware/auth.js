const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
/* create the auth middleware (used in userRouter):
once user logs in isAuth becomes true
then every time user visits a new page this auth middleware
finds token.userId (token that it gets from localStorage
the token that was created when user logged in - every time
user logs in a new create is created and we set token expires in 1hr
so after 1hr the user automatically logs out and that token can no longer be used)
if that token.userId already exists in user database then we have verified
this indeed is an existing logged in user and allow user to be
"continued to be logged in" and thus allow to visit that page user clicked to visit.
if by any chance the token.userId does not exist in db, then the user
will get logged out automatically and will have to log in again to create new token. */

let auth = async (req, res, next) => {
  // 1. extract token from request header
  console.log("inside auth middleware function");
  const authHeader = req.headers.authorization;
  // && will give error if authHeader does not exist
  // where as ?. will Not give error if authHeader does not exist
  // we want error to be thrown => next(error) if authHeader doesn't exist
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token received");
  // "Bearer <token>" thus we need to split(" ") and get [1] to get token only
  // after split(" ") we get [Bearer, <token>] so we access [1] to get <token>
  if (token === null) return res.sendStatus(401);
  console.log("token not null");

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    if (!decodedToken || !decodedToken.userId) {
      return res
        .status(401)
        .send({ error: "token useId is undefined or null" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).send({ error: "user not found" });
    }
    console.log("user authorized");
    req.user = user; // create a new propoerty called user on the req object

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    next(error);
  }
};

module.exports = { auth };
