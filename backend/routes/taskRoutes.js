import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskControllers.js";

const router = express.Router({ mergeParams: true });

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:taskId")
  .put(updateTask)
  .delete(deleteTask);

export default router;