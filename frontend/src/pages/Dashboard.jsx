import { useEffect, useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  const { token } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [tasksMap, setTasksMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projData = await request("/projects", "GET", null, token);
        setProjects(projData);

        const map = {};
        for (let p of projData) {
          const tasks = await request(
            `/projects/${p._id}/tasks`,
            "GET",
            null,
            token
          );
          map[p._id] = tasks;
        }
        setTasksMap(map);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadData();
  }, [token]);

  // Add project
  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await request(`/projects/${id}`, "DELETE", null, token); // call backend
      // remove from frontend state after successful deletion
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setTasksMap((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project. Check console.");
    }
  };

  // Update project
  const updateProject = (updated) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",          
      }}
    >
      <h1 style={{ textAlign: "center" }}>Projects</h1>

      {/* Add new project */}
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <AddProject onAdd={addProject} />
      </div>

      <div
        className="kanban-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",        
          width: "100%",
          maxWidth: "900px", 
        }}
      >
        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="kanban-column"
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid",
                borderRadius: "8px",
              }}
            >
              <ProjectCard
                project={project}
                onDelete={deleteProject}
                onUpdate={updateProject}
              />

              {/* Tasks */}
              {tasksMap[project._id]?.length === 0 ? (
                <p>No tasks</p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {tasksMap[project._id]?.map((task) => (
                    <div
                      key={task._id}
                      className="task-card"
                      style={{
                        padding: "8px",
                        border: "1px solid",
                        borderRadius: "4px",
                      }}
                    >
                      <strong>{task.title}</strong>
                      <p>{task.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
};