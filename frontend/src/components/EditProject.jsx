import { useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function EditProject({ project, onUpdate }) {
  const { token } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: project.name,
    description: project.description
  });

  const submit = async (e) => {
    e.stopPropagation(); // prevent navigation

    try {
      const updated = await request(
        `/projects/${project._id}`,
        "PUT",
        form,
        token
      );

      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!editing) {
    return (
      <button onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}>
        Edit
      </button>
    );
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <input
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button onClick={submit}>Save</button>
    </div>
  );
}