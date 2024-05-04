import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
const test = (req, res) => {
  res.json({ message: "calling from controller" });
};
const updatetheUser = async (req, res) => {
    try {
      if (!req.user || req.user.id !== req.params.user) {
        console.log("Unauthorized access");
        return res.status(403).json({ message: "You can update only your account" });
      }
  
      if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
      }
  
     
      const updated = await User.findByIdAndUpdate(
        req.params.user,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            photo: req.body.photo,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updated._doc;
      res.status(200).json(rest);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const deleteUser = async(req,res,next) =>{
    if (!req.user || req.user.id !== req.params.user) {
      console.log("Unauthorized access");
      return res.status(403).json({ message: "You can delete only your account" });
    }
    else {
      try {
        await User.findByIdAndDelete(req.params.user)
        res.status(200).json({message:"User deleted successfully"})
        
      } catch (error) {
        next(error);
      }
    }

  }


  const signOut = (req,res,next)=> {
try {
  res.clearCookie('token');
  res.status(200).json({message:"Signed out successfull"});
} catch (error) {
  next(error);   
}
  }
  
export { test, updatetheUser ,deleteUser,signOut};
