import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import {authRouter} from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();

app.use(cookieParser());
let m= await mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB CONNECTED SUXXEXXFULLY")
})
.catch((err)=>{
console.log(err)
});
  
app.use(express.json())
app.listen(3002,()=>{
console.log(`server is running at 3002`);
})


app.use("/api/user",userRouter);

app.use("/api/auth",authRouter);




app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message ;
    res.status(statusCode).json(
        {
            message,
            statusCode,
            success:false ,
            err

        }
    )

});