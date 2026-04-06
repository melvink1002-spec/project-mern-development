import { useContext, useState, useEffect } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onDelete, onUpdate }) {
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false); // <-- new state
  const [form, setForm] = useState({ name: "", description: "" });

  if (!project) return null;

  useEffect(() => {
    if (project) {
      setForm({ name: project.name || "", description: project.description || "" });
    }
  }, [project]);

  const saveEdit = async () => {
    try {
      const updated = await request(`/projects/${project._id}`, "PUT", form, token);
      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  if (editing) {
    return (
      <div className="card" style={{ cursor: "default", padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Project Name"
          style={{ padding: "8px", fontSize: "14px" }}
        />
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Project Description"
          style={{ padding: "8px", fontSize: "14px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}></div>
        <button onClick={saveEdit} style={{ cursor: "pointer" }}>Save</button>
        <button onClick={() => setEditing(false)} style={{ cursor: "pointer" }}>Cancel</button>
      </div>
    );
  }

  return (
    <div
      className="card"
      onClick={() => nav(`/projects/${project._id}`)}
      style={{
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{project.name || "Untitled Project"}</h3>
      <p>{project.description || "No description"}</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setEditing(true); }}
        style={{ cursor: "pointer" }}
      >
        Edit
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
        style={{ cursor: "pointer" }}
      >
        Delete
      </button>
    </div>
      </div>
  );
}