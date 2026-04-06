import { request } from "../utils/api";

export const getTasks = (projectId, token) =>
  request(`/projects/${projectId}/tasks`, "GET", null, token);

export const createTask = (projectId, data, token) =>
  request(`/projects/${projectId}/tasks`, "POST", data, token);

export const updateTask = (projectId, taskId, data, token) =>
  request(`/projects/${projectId}/tasks/${taskId}`, "PUT", data, token);

export const deleteTask = (projectId, taskId, token) =>
  request(`/projects/${projectId}/tasks/${taskId}`, "DELETE", null, token);