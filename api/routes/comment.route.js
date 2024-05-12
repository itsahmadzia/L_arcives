import express from "express"
import { createComment } from "../controllers/comment.controller.js";
const commentRouter = express.Router();


// POST comments route
router.post('/addaComment', createComment);

export {commentRouter};  