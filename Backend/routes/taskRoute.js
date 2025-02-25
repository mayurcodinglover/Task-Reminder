import protect from "../middleware/authmiddleware.js";
import Task from "../models/Task.js";
import express from "express"

const router=express.Router();

router.post('/add',protect,async(req,res)=>{
    const {title,time}=req.body;

    if(!title || !time){
        return res.status(400).json({message:"Title and time is required"});
    }

    try {
        const task=new Task({
            userId:req.user._id,
            title,
            time,
        });
        await task.save();
        res.status(201).json({message:"Task added Successfully"});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
});
router.get('/get',protect,async(req,res)=>{
    try {
        const tasks=await Task.find({userId:req.user._id});
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
});

export default router;