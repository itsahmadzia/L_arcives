import Comment from '../models/comment.model.js';



const createComment = async(req,res,next)=> {

        try {
            const { content,postId, userId } = req.body;
            if(!content || !postId || !userId && userId !== req.user.id ){
                return res.status(400).json({message: "ERRor"});

            }

            const newComment = await Comment.create({ content,userId, postId });
            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            next(error);
        }
    

}


export {createComment}