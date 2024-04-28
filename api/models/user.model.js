import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
    username : {
            required:true,
            type:String,
            unique:true,
    },
    email : {
        required:true,
        type:String,
        unique:true,
    },
    password : {
        required:true,
        type:String,
    }, 
    photo : {
        type:String , 
        default: "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-35.jpg"
    }
},{timestamps:true}
);
  const User = mongoose.model('User',userSchema);
  export default User;