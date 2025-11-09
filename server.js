import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("db connection error:" , err));

app.post("/api/register", async(req , res)=>{
    try{
        const {name , email ,password} = req.body;
         
        if (!name || !email || !password){
            return res.status(400).json({message : "all fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exist"});
        }

        const hashedpassword = await bcrypt.hash(password , 10);

        const user = new User({name,email ,password:hashedpassword});
        await user.save();
        res.status(201).json({message:"user registered succesfully"});
    }
    catch(error){
        res.status(500).json({message:"server error" , error});
    }
});

 const PORT = process.env.PORT;
app.listen(PORT , ()=> console.log("server running on port 5000"));