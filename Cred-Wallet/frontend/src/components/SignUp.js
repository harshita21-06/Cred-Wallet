import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Signup.style.css";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      if (props.onSuccess) props.onSuccess();
      props.handleAlert("Account Successfully created", "success");
    } else {
      props.handleAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="signup-inner-container">
          <h1>Sign In</h1>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              maxLength={20}
              onChange={(e) => {
                // Only allow a-z and A-Z, max 20 chars
                const value = e.target.value
                  .replace(/[^a-zA-Z ]/g, "")
                  .slice(0, 20);
                onChange({
                  target: { name: "name", value },
                });
              }}
              id="name"
              name="name"
              aria-describedby="emailHelp"
              placeholder=""
            />
            <label htmlFor="name" className="form-name">
              Name
            </label>
          </div>
          <div className="signup-email">
            <input
              type="email"
              className="form-email-input"
              // value={credentials.email}
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
          <div className="signup-password">
            <input
              type="password"
              className="form-password-input"
              // value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              required
              minLength={5}
              placeholder=""
            />
            <label htmlFor="password" className="form-email-input">
              Password
            </label>
          </div>
          <div className="signup-confirm-password">
            <input
              type="password"
              className="form-confirm-password-input"
              // value={credentials.password}
              onChange={onChange}
              name="cpassword"
              id="cpassword"
              required
              minLength={5}
              placeholder=""
            />
            <label htmlFor="cpassword" className="form-confirm-password">
              Confirm Password
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

export default SignUp;
