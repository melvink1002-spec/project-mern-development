import { useEffect, useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

export default function TaskList({ projectId }) {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    request(`/projects/${projectId}/tasks`, "GET", null, token)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, [projectId, token]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
 <div style={{ marginTop: "20px" }}>
         {/* ender AddTask */}
      <AddTask projectId={projectId} onAdd={addTask} />

      {/* Tasks list */}
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "15px",
      }}
    >
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            projectId={projectId}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
    </div>
  );
}