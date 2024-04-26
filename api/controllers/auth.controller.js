import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandle } from "../utils/errorHandle.js";
const  auth = async(req,res,next) =>{
const {username,email,password} = req.body
if(username==="" || password ===""  || email ==="")
   {
    throw next(errorHandle(401,"empty values not allowed "))
   }
   
if(!username || !password || !email){
  throw next(errorHandle(401,"username password and email is required"))
    
}

const hpassword =bcryptjs.hashSync(password, 10);
   
const newUser = new User(
    {
        username,
        email, 
        password:hpassword
    }
)
try {
    
await newUser.save();
res.json({newUser: {
    username,
    email
},
success:true})
} catch (error) {
   next(error);
}


    }
    export default auth;