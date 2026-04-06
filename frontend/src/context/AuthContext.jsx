import { createContext, useState, useEffect } from "react";
import { request } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // fetch user info after login
      const fetchUser = async () => {
        try {
          const data = await request("/auth/me", "GET", null, token);
          setUser(data);
        } catch (err) {
          console.error("Failed to fetch user info", err);
          setUser(null);
        }
      };
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}