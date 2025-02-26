import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import {dbconnect} from "./config/db.js"
import authrouter from "./routes/authRoute.js"
import router from "./routes/taskRoute.js"
import say from "say"
import schedule from "node-schedule"
import Task from "./models/Task.js"

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
    origin: '*'
  }));
  
dbconnect();
app.use('/api/auth',authrouter);
app.use('/api/tasks',router);
schedule.scheduleJob("* * * * *",async()=>{
    const now=new Date();
    const hour=now.getHours();
    const minute=now.getMinutes();

    const tasks=await Task.find({time:`${hour}:${minute}`});

    tasks.forEach(task=>{
        say.speak(`Hey ! It's time for ${task.title}`);
    });
});
const port=process.env.port|5000;
app.listen(port,()=>console.log(`server running on port ${port}`));