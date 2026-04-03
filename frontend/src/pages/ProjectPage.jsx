import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProjectPage({ id }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get(`/projects/${id}/tasks`).then(res => setTasks(res.data));
  }, [id]);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div key={t._id}>{t.title} - {t.status}</div>
      ))}
    </div>
  );
}