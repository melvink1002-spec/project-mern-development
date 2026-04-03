import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Check if user is logged in on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const { data } = await API.get("/auth/me")
        setUser(data)
      } catch (err) {
        console.error(err)
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token)
    setUser({}) // temporary until fetched
    navigate("/")
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook
export function useUser() {
  return useContext(UserContext)
}