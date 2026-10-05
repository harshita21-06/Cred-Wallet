import React from "react";
import { Link} from "react-router-dom";
import "./styles/Footer.style.css";

const Footer = () => {
  return (<div className="footer-wrapper">
        <div className="footer-container">
            <div className="footer-logo">
              <Link className="footer-brand" to="/"></Link>
              <p className="footer-description">Cred Wallet is your secure digital vault for managing , accessing and protecting all your credit</p>
            </div>
            <div className="contact-container">
              <a href="https://www.facebook.com/ayush.aryan.90834/" className="contact-icon">
                <img src="./twitter.jpg" alt="twitter-logo"/>
              </a>
              <a href="https://www.linkedin.com/in/ayush-aryan-8305861a2/" className="contact-icon">
                <img src="./linkedin.png" alt="linkedin-logo"/>
              </a>
              <a href="https://github.com/aryanayush012" className="contact-icon">
                <img src="./github.png" alt="github-logo"/>
              </a>
            </div>
            <div className="call-to-action">
              <button type="button" className="call-button" onClick={() => window.location.href = "tel:+917808936924"}>
                Call Us
              </button>
              <button type="button" className="email-button" onClick={() => window.location.href = "mailto:aryanayush012@gmail.com"}>
                Email
              </button>
            </div>
        </div>
              <p className="copyright">
                All Rights Reserved ©️ Ayush Aryan
              </p>
        </div>
  );
};

export default Footer;