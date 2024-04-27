import express from "express"
import {signup,signin} from "../controllers/auth.controller.js"

const authRouter = express.Router();


authRouter.post("/signUp", signup);

    authRouter.post("/signIn", signin);



export { authRouter}; 