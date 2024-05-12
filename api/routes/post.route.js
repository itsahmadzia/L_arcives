import express from "express"

import { verifyUser } from "../utils/verifyUser.js"
import { create,getPosts,deletePost,updatePost } from "../controllers/post.controller.js";

const postRouter = express.Router();        
          

postRouter.post("/createPost", verifyUser,create);



postRouter.get("/getPosts", getPosts);

postRouter.delete("/deletePost/:postId/:userId", verifyUser,deletePost);

postRouter.put("/updatePost/:postId/:userId",verifyUser,updatePost)
export {postRouter};    