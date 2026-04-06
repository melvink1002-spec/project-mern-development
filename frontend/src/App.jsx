import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient( 180.7deg,  rgba(0, 255, 208, 1) -28.8%, rgba(0, 72, 123, 1) 95.4% )",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}