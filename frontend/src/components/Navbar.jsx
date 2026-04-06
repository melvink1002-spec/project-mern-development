import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={{ cursor: "pointer" }} onClick={() => nav("/")}>
        Pro-Tasker
      </h2>

      <div style={styles.right}>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              style={styles.profileBtn}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            >
              Menu
            </button>

            {open && (
              <div style={styles.dropdown}>
                <button
                  onClick={() => {
                    nav("/");
                    setOpen(false);
                  }}
                  style={styles.item}
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  style={styles.item}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: "1px solid #ddd",
    background: "#fff"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.2s"
  },
  profileBtn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid",
    cursor: "pointer",
    transition: "0.2s"
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    minWidth: "120px"
  },
  item: {
    padding: "10px",
    border: "none",
    background: "white",
    textAlign: "left",
    cursor: "pointer",
    transition: "0.2s"
  }
};