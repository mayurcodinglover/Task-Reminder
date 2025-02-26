import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { dbconnect } from "./config/db.js";
import authrouter from "./routes/authRoute.js";
import router from "./routes/taskRoute.js";
import say from "say";
import schedule from "node-schedule";
import Task from "./models/Task.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

dbconnect();
app.use("/api/auth", authrouter);
app.use("/api/tasks", router);

// Schedule the job to run every minute
schedule.scheduleJob("* * * * *", async () => {
  try {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Find tasks matching the current time
    const tasks = await Task.find({ time: `${hour}:${minute}` });

    // Iterate through tasks and speak the title 5 times
    for (const task of tasks) {
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve, reject) => {
          say.speak(`Hey! It's time for ${task.title}`, null, 1.0, (err) => {
            if (err) {
              console.error("Error speaking:", err);
              reject(err);
            } else {
              console.log(`Spoken: ${task.title} (${i + 1}/5)`);
              resolve();
            }
          });
        });
      }
    }
  } catch (error) {
    console.error("Error in scheduled job:", error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));