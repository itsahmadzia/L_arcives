import express from "express"
import test from "../controllers/auth.controller.js"

const router = express.Router();


router.post("/signUp", test);

export default router; 