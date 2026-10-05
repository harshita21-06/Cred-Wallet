import React from "react";
import "./styles/Demo.style.css";

const Demo = () => (
  <div className="demo-container">
    <h1 className="demo-title">Demo</h1>
    <div className="demo-content">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/NpzvOmZT2x4?si=xCjyVZS_YrQ40TfW&amp;controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        // allowFullScreen
      ></iframe>
      <h1 className="demo-title">Cred Wallet Demo</h1>
      <p className="demo-description">
        Explore the features of{" "}
        <span className="demo-highlight">Cred Wallet</span> with this
        interactive demo. Follow the steps below to experience how easy and
        secure it is to manage your cards:
      </p>
      <ol className="demo-steps">
        <li>
          <span className="demo-highlight">Sign Up</span> or{" "}
          <span className="demo-highlight">Log In</span> to your account to get
          started.
        </li>
        <li>
          <span className="demo-highlight">Add a Card</span> by entering your
          card details. The app will automatically detect the card type and
          validate your input.
        </li>
        <li>
          <span className="demo-highlight">View, Edit, or Delete</span> your
          saved cards. All changes are instantly reflected in your secure vault.
        </li>
        <li>
          <span className="demo-highlight">
            Experience Real-Time Validation
          </span>{" "}
          and issuer-based card styling as you interact with your cards.
        </li>
        <li>
          <span className="demo-highlight">Log Out</span> securely when you are
          done.
        </li>
      </ol>
      <p className="demo-footer">
        Ready to try? Use the navigation bar to explore all features!
      </p>
    </div>
  </div>
);

export default Demo;
