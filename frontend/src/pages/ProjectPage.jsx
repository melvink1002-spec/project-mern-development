import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import TaskList from "../components/TaskList";

export default function ProjectPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    request("/projects", "GET", null, token)
      .then((projects) => {
        const found = projects.find((p) => p._id === id);
        setProject(found);
      })
      .catch(() => setError("Failed to load project"))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      {/* Task system */}
      <TaskList projectId={id} />
    </div>
  );
}