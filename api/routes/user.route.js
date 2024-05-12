import express from "express"
import {deleteUser, test,updatetheUser, signOut, getAllUsers} from "../controllers/user.controller.js"
 
import { verifyUser } from "../utils/verifyUser.js"

const router = express.Router();


router.get("/test", test);

router.post("/update/:user",verifyUser, updatetheUser);

router.post("/delete/:user",verifyUser, deleteUser);


router.post("/signout",signOut);
router.get("/getUser",verifyUser,getAllUsers)

export default router; 