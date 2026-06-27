import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  const toggleTheme = () => {

    document.body.classList.toggle("dark");
  };

  return (

    <nav>

      <div className="logo">
        📝 BlogHub
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/create">
              Create Post
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          🌙 Dark Mode
        </button>

      </div>

    </nav>
  );
}

export default Navbar;