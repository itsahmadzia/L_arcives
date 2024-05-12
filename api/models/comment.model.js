import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    content : {
        type: String,
        required: true 
    },
    countofLikes : {
        type: Number,
        default: 0
    
    }
},{timestamps:true});




const Comment = mongoose.model('Comment', commentSchema);

export default Comment;