import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const router=express.Router();

router.post('/register',async (req,res)=>{
    try {
        const user =new User(req.body);
        await user.save();
        res.json({message:"User registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"});
    }
});

router.post('/login',async(req,res)=>{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(401).json({error:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.json({token});
});

export default router;
