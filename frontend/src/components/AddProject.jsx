import { useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function AddProject({ onAdd }) {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await request("/projects", "POST", form, token);

      if (onAdd) onAdd(data);

      // reset form
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}  style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
<h3 style={{ textAlign: "center" }}>Create New Project</h3>

      <input
        type="text"
        placeholder="Project name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
         style={{ padding: "8px", fontSize: "14px" }}
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ padding: "8px", fontSize: "14px" }}
      />

      <button
        style={{ cursor: "pointer" }}
        type="submit"
        disabled={loading}>
        {loading ? "Creating..." : "Add Project"}
      </button>
    </form>
  );
}