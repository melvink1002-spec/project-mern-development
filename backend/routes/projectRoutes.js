import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectControllers.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

// Protect all routes below
router.use(protect);

// Project CRUD
router.route("/")
  .get(getProjects)
  .post(createProject);

router.route("/:id")
  .put(updateProject)
  .delete(deleteProject);

// Nested task routes
router.use("/:projectId/tasks", taskRoutes);

export default router;