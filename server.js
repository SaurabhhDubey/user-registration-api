import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import bcrypt from "bcrypt";
//import User from "./models/user.model";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("db connection error:" , err));


 const PORT = process.env.PORT;
app.listen(PORT , ()=> console.log("server running on port 5000"));