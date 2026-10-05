import React, { useState } from "react";
import Hero from "./Hero";
import Features from "./Features";

const Landing = ({ onLoginClick, onSignupClick }) => {
  return (
    // <div
    //   className="landing-container"
    //   style={{
    //     minHeight: "80vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     color: "#fff",
    //   }}
    // >
    //   <h1>Welcome to Cred Wallet</h1>
    //   <p style={{ maxWidth: 500, textAlign: "center", margin: "20px 0" }}>
    //     Manage all your cards securely in one place. Please login or sign up to
    //     continue.
    //   </p>
    //   <div style={{ display: "flex", gap: "20px" }}>
    //     <button className="login-btn" onClick={onLoginClick}>
    //       Login
    //     </button>
    //     <button className="signup-btn" onClick={onSignupClick}>
    //       Sign Up
    //     </button>
    //   </div>
    // </div>
    <>
    <Hero onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
    <Features/>
    </>
  );
};

export default Landing;
