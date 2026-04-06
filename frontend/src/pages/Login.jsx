import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { request } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const data = await request("/auth/login", "POST", form);

      if (!data.token) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token in context
      login(data.token);

      // Redirect to dashboard
      nav("/"); 
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}