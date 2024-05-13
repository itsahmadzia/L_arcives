import express from "express"
import { createComment , getPostComments, likeComments} from "../controllers/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const commentRouter = express.Router();


// POST comments route
commentRouter.post('/addaComment',verifyUser, createComment);
commentRouter.get('/getpostComments/:postId', getPostComments);

commentRouter.put('/likeComment/:commentId',verifyUser,likeComments);

export {commentRouter};  