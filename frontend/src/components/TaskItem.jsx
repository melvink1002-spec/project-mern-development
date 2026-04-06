import { useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function TaskItem({ task, projectId, onUpdate, onDelete }) {
  const { token } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const saveEdit = async () => {
    try {
      const updated = await request(
        `/projects/${projectId}/tasks/${task._id}`,
        "PUT",
        form,
        token
      );

      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const deleteTask = async () => {
    try {
      await request(
        `/projects/${projectId}/tasks/${task._id}`,
        "DELETE",
        null,
        token
      );

      onDelete(task._id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✏️ EDIT MODE
  if (editing) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: "8px" }}
        />

        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ padding: "8px" }}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={{ padding: "8px" }}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ cursor: "pointer" }} onClick={saveEdit}>
            Save
          </button>
          <button style={{ cursor: "pointer" }} onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "white",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
          Edit
        </button>
        <button style={{ cursor: "pointer" }} onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
}