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


export {createComment, getPostComments}