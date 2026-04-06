import Task from "../models/Task.js";

// GET 
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

// POST 
export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    project: req.params.projectId
  });

  res.json(task);
};

// PUT 
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(404).json({ message: "Not found" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updated = await task.save();
  res.json(updated);
};

// DELETE
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(404).json({ message: "Not found" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};