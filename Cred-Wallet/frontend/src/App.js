import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import { Home } from "./components/Home";
import About from "./components/About";
import CardState from "./context/cards/CardState";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Demo from "./components/Demo";
import Features from "./components/Features";

function App() {
  const [alert, setAlert] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div style={{ backgroundColor: "#000" }}>
      <CardState>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/features" element={<Features />} />
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Home handleAlert={handleAlert} />
                  ) : (
                    <Landing
                      onLoginClick={() => {
                        setShowLogin(true);
                        setShowSignup(false);
                      }}
                      onSignupClick={() => {
                        setShowSignup(true);
                        setShowLogin(false);
                      }}
                    />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* Popup Modals for Login/Signup */}
            {showLogin && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <Login
                    handleAlert={handleAlert}
                    onSuccess={handleLoginSuccess}
                    onClose={() => setShowLogin(false)}
                  />
                </div>
              </div>
            )}
            {showSignup && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <SignUp
                    handleAlert={handleAlert}
                    onSuccess={handleLoginSuccess}
                    onClose={() => setShowSignup(false)}
                  />
                </div>
              </div>
            )}
          </div>
          <Footer />
        </Router>
      </CardState>
    </div>
  );
}

export default App;
