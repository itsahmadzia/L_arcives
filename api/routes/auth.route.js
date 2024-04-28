import express from "express"
import {signup,signin,google} from "../controllers/auth.controller.js"

const authRouter = express.Router();


authRouter.post("/signUp", signup);

    authRouter.post("/signIn", signin);
    authRouter.post("/google", google);


export { authRouter}; 