import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {projects.map(p => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}