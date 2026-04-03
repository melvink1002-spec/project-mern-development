import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

function Navbar() {
  const { user, logout } = useUser()

  return (
    <nav>
      {user && <p>Welcome {user.name}!</p>}

      <ul>
        {user ? (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar