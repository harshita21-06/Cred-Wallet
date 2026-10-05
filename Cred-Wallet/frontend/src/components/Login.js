import React, { useState } from "react";
import "./styles/Login.style.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Clear previous error
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      if (props.onSuccess) props.onSuccess();
      props.handleAlert("Logged in Successfully", "success");
    } else {
      setLoginError("Invalid email or password");
      props.handleAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      {loginError && (
        <div className="login-error">
          <img src="./wrong.gif" alt="wrong credentials" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="login-inner-container">
          <h1>Log In</h1>
          <div className="login-email">
            <input
              type="email"
              className="form-email-input"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder=""
            />
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>
          <div className="login-password">
            <input
              type="password"
              className="form-password-input"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              placeholder=""
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" onClick={props.onClose} className="close-btn">
            x
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
