import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location = "/";
  };

  return (
    <div>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}