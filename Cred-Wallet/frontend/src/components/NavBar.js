import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/Navbar.style.css";

const NavBar = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/"); // Redirect to landing page after logout
  };
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/"></Link>
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <div className={`navbar-links${menuOpen ? " open" : ""}`}>
        <Link
          className={`nav-link ${
            location.pathname === "/features" ? "active" : ""
          }`}
          aria-current="page"
          to="/features"
          onClick={() => setMenuOpen(false)}
        >
          features
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/about" ? "active" : ""
          }`}
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/demo" ? "active" : ""
          }`}
          to="/demo"
          onClick={() => setMenuOpen(false)}
        >
          Demo
        </Link>
        {isAuthenticated && (
          <button
            className="logout-btn mobile-logout"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
      <div className="navbar-auth" id="navbarSupportedContent">
        {!isAuthenticated ? null : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
