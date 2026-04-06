import { useState } from "react";
import { createTask } from "../api/taskApi";

export default function TaskForm({ projectId, token, onAdd }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const task = await createTask(projectId, { title }, token);

    onAdd(task);
    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
}