import express from "express";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { protect, authorizeProject } from "../middleware/authMiddleware.js";

const router = express.Router();

// PROJECT CRUD
router.get("/", protect, async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  res.json(projects);
});

router.post("/", protect, async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.user._id });
  res.json(project);
});

router.get("/:id", protect, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!authorizeProject(project, req.user._id))
    return res.status(403).json({ message: "Forbidden" });
  res.json(project);
});

router.put("/:id", protect, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!authorizeProject(project, req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(project, req.body);
  await project.save();
  res.json(project);
});

router.delete("/:id", protect, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!authorizeProject(project, req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  await project.deleteOne();
  res.json({ message: "Deleted" });
});

// TASK CRUD
router.post("/:projectId/tasks", protect, async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!authorizeProject(project, req.user._id))
    return res.status(403).json({ message: "Forbidden" });
});

export default router;