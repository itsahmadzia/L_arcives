import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/errorHandle.js";
import generator from 'generate-password'
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
        id: getuser._id,isAdmin:getuser.isAdmin
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

const google = async (req, res, next) => {

  const { name, email, googlePhotoURL } = req.body;
try {
  const user = await User.findOne({email});
  if(user){

    const token = jwt.sign(
      {
        id: user._id, isAdmin:user.isAdmin
      },
      process.env.SECRET
    );
    res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json(user);

  }
  else {
    var postfix = generator.generate({
      length: 10,
      numbers: true
    });
    var npassword = generator.generate({
      length: 10,
      numbers: true
    });
    const hpassword = bcryptjs.hashSync(npassword, 10);

    const newUser = new User({
      username:name.toLowerCase().split(" ").join("") + postfix ,
      email,
      password: hpassword,
      photo:googlePhotoURL

    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id, isAdmin:newUser.isAdmin
      },
      process.env.SECRET
    );
    const {password,...withoutpassword}=newUser._doc;
    res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({user:withoutpassword});


  }

} catch (error) {
 next(error); 
}

};
export { signup, signin, google };
