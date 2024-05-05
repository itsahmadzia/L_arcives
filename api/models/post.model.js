import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        default:'https://w0.peakpx.com/wallpaper/120/483/HD-wallpaper-anime-death-note-light-yagami.jpg',
        type:String
    },
    category: {
        type: String,
        default: 'uncategorized'
    }
    ,
    slug: {
        type:String,
        required: true,
        unique: true
    }
}, {timestamps:true})
   
 const Post = mongoose.model("Post", postSchema);
 export default Post;