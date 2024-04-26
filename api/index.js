import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let m= await mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB CONNECTED SUXXEXXFULLY")
})
.catch((err)=>{
console.log(err)
});
  

const app = express();
app.listen(3001,()=>{
console.log(`server is running at 3001`);
})