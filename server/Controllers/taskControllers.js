import taskModel from "../Models/taskModel.js";
import { validateMongodbId } from "../Config/validateMongodbId.js";

export const createTaskController = async (req, res) => {
  try {
    const newTask = await taskModel.create(req.body);
    res.status(201).json({
      res: { message: "Task Created Successfully", success: true },
      createdTask: newTask,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ res: { message: error.message, success: false } });
  }
};

export const getAllTasksController = async (req, res) => {
  try {
    const allTasks = await taskModel.find().populate("assignee");
    res.status(200).json({
      res: { message: "All Tasks Got Successfully", success: true },
      tasks: allTasks,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ res: { message: error.message, success: false } });
  }
};

export const getTaskController = async (req, res) => {
  const { TaskId } = req.params;
  validateMongodbId(TaskId);
  try {
    const gotTask = await taskModel
      .findById(TaskId)
      .populate("assignee")
      .populate("creator");
    res.status(200).json({
      res: { message: "Task Got Successfully", success: true },
      gotTask,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ res: { message: error.message, success: false } });
  }
};

export const deleteTaskController = async (req, res) => {
  const { TaskId } = req.params;
  validateMongodbId(TaskId);
  try {
    const deletedTask = await taskModel.findByIdAndDelete(TaskId);
    res.status(200).json({
      res: { message: "Task Deleted Successfully", success: true },
      deletedTask,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ res: { message: error.message, success: false } });
  }
};

export const updateTaskController = async (req, res) => {
  const { TaskId } = req.params;
  validateMongodbId(TaskId);
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      { _id: TaskId },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Task Updated Successfully", updatedTask });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ res: { message: error.message, success: false } });
  }
};
