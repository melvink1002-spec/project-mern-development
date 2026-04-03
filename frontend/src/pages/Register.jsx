import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post("/auth/register", form);
    window.location = "/login";
  };

  return (
    <div>
      <input placeholder="name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
