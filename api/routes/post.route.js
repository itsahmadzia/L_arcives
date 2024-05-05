import express from "express"

import { verifyUser } from "../utils/verifyUser.js"
import { create,getPosts } from "../controllers/post.controller.js";
const postRouter = express.Router();


postRouter.post("/createPost", verifyUser,create);



postRouter.get("/getPosts", getPosts);


export {postRouter};    