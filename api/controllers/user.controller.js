import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandle } from "../utils/errorHandle.js";
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
    if (!req.user.isAdmin &&(!req.user || req.user.id !== req.params.user)) {
      console.log("Unauthorized access");
      return res.status(403).json({ message: "You can delete only your account" });
    }
    else {
      try {
        let getuser = await User.findOne({ _id : req.params.user });
        if(getuser.isAdmin){
          res.status(501).json({message:"Admin cannot be deleted "})   
        }
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
  

  const getAllUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandle(501, "You cannot view all users"));
    } else {
        try {
            const currentDate = new Date();
            const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const users = await User.find();
            const totalUsers = users.length;
            
          
            const lastMonthUsers = await User.find({
                createdAt: {
                    $gte: lastMonthDate, 
                    $lte: currentDate 
                }
            });
            
            res.status(200).json({ users: users, totalUsers: totalUsers, lastMonthUsers: lastMonthUsers.length });
            
        } catch (error) {
            next(error);
        }
    }
}


const getUserbyId = async(req,res,next)=>{
  const {userId} = req.body ; 
  if(!userId){
    res.status(501).json("ERROR");
    return ; 
  }
  console.log(userId)
  try {
    const user = await User.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    next(error);
  }
}

export { test, updatetheUser ,deleteUser,signOut,getAllUsers  , getUserbyId};
