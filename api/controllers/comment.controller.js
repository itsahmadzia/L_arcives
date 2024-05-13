import Comment from '../models/comment.model.js';



const createComment = async(req,res,next)=> {

        try {
            const { content,postId, userId } = req.body;
            if(!content || !postId || !userId && userId !== req.user.id ){
                return res.status(400).json({message: "ERRor"});

            }

            const newComment = await Comment.create({ content,userId, postId });
            await newComment.save();
            res.status(200).json(newComment);
        } catch (error) {
            next(error);
        }
    

}

const getPostComments = async(req,res,next)=> {
    try {
     const comments = await Comment.find({postId:req.params.postId}).sort({createdAt: -1});
     res.status(200).json(comments); 

    } catch (error) {
      next(error);
    }
  
  }


  const likeComments = async(req,res,next)=>{
    try {
        console.log(req.params.commentId)
        console.log(req);
        const comment = await Comment.findById(req.params.commentId)
        if(!comment)
        {
            return res.status(404).json({message: "Comment not found"});
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.likes.push(req.user.id);    
            comment.countofLikes+=1;

        }
        else {
            comment.countofLikes-=1;

            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        next(error);
    }

  }
const editComments = async(req,res,next)=>{

}
export {createComment, getPostComments,likeComments,editComments}