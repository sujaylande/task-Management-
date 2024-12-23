import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskController,
  updateTaskController,
} from "../Controllers/taskControllers.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const taskRoute = express.Router();

taskRoute.post("/create", authMiddleware, createTaskController);
taskRoute.get("/get/:TaskId", authMiddleware, getTaskController);
taskRoute.get("/allTasks", authMiddleware, getAllTasksController);
taskRoute.delete("/delete/:TaskId", authMiddleware, deleteTaskController);
taskRoute.put("/update/:TaskId", authMiddleware, updateTaskController);

export default taskRoute;
