import Comment from '../models/comment.model.js';
import { errorHandle } from '../utils/errorHandle.js';

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
    try {
        console.log(req.params.commentId)
        console.log(req);
        const comment = await Comment.findById(req.params.commentId)
        if(!comment)
        {
            return res.status(404).json({message: "Comment not found"});
        }
        if(comment.userId !== req.user.id && req.user.isAdmin===false){
            return res.status(403).json({message: "You are not authorized to edit this comment"});
        }
     const newComment =await Comment.findByIdAndUpdate(
        req.params.commentId,{
content: req.body.content
     },
    {new:true}
    )
        res.status(200).json(newComment)
    } catch (error) {
        next(error);
    }
}
 const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
          return next(errorHandle(404, 'Comment not found'));
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
          return next(
            errorHandle(403, 'You are not allowed to delete this comment')
          );
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Comment has been deleted');
      } catch (error) {
        next(error);
      }
}

const getcomments = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandle(403, 'You are not allowed to get all comments'));
      try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const comments = await Comment.find()
          .sort({ updatedAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthComments = await Comment.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ comments, totalComments, lastMonthComments });
      } catch (error) {
        next(error);
      }
};
export {createComment, getPostComments,likeComments,editComments,deleteComment,getcomments}