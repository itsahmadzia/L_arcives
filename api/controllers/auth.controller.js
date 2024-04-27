import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";
import jwt from "jsonwebtoken";
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (username === "" || password === "" || email === "") {
    throw next(errorHandle(401, "empty values not allowed "));
  }

  if (!username || !password || !email) {
    throw next(errorHandle(401, "username password and email is required"));
  }

  const hpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hpassword,
  });
  try {
    await newUser.save();
    res.json({
      newUser: {
        username,
        email,
      },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return next(errorHandle(401, "empty values not allowed "));
  }

  if (!username || !password) {
    return next(errorHandle(401, "username/email and password  is required"));
  }
  try {
    let getuser = await User.findOne({ username });
    let getuserbyemail = await User.findOne({ email: username });
    if (!getuser && !getuserbyemail) {
      return next(
        errorHandle(404, "User not found with required credetentials ")
      );
    }
    if (!getuser) {
      getuser = getuserbyemail;
    }

    const valid = bcryptjs.compareSync(password, getuser.password);
    if (!valid) {
      return next(
        errorHandle(402, "User not found with required credetentials")
      );
    }
    const token = jwt.sign(
      {
        id: getuser._id,
      },
      process.env.SECRET
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(getuser);
  } catch (error) {
    next(error);
  }
};
export { signup, signin };
