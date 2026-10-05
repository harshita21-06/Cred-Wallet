import React from "react";
import "./styles/About.style.css";

const About = () => (
  <div className="about-container">
    <h1 className="about-title">About Cred Wallet</h1>
    <p className="about-intro">
      <strong>Cred Wallet</strong> is a modern web application crafted to help
      you securely manage and organize all your credit and debit cards in one
      convenient place. With a focus on security, usability, and performance,
      Cred Wallet delivers a seamless experience for storing, editing, and
      validating your card details.
    </p>
    <h2 className="about-section-title">Key Features</h2>
    <ul className="about-features">
      <li>Automated card type detection</li>
      <li>Secure authentication powered by JWT</li>
      <li>Intuitive, responsive UI built with React and Context API</li>
      <li>Advanced validation of card inputs</li>
    </ul>
    <h2 className="about-section-title">About the Developer</h2>
    <p className="about-developer">
      <strong>Ayush Aryan</strong> is a passionate full-stack developer with a
      strong foundation in data structures and algorithms. With extensive
      experience in the MERN stack, Ayush is dedicated to building robust,
      scalable, and user-friendly web solutions. He has solved over 500 coding
      problems on platforms like LeetCode and GFG, and is currently working at{" "}
      <strong>CarTrade Tech Ltd.</strong>
    </p>
    <p>
      Ayush’s commitment to quality and innovation is reflected in every aspect
      of Cred Wallet, ensuring users enjoy both convenience and security in
      their digital card management.
    </p>
    <p className="about-footer">
      Experience the next generation of card management with{" "}
      <strong>Cred Wallet</strong>.
    </p>
  </div>
);

export default About;
