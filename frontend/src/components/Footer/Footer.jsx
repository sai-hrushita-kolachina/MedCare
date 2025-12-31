import React from "react";
import "./Footer.css";
import logo from "/logo.png"

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">
        <div className="footer-section footer-lift">
          <h2 className="footer-logo">
            <img src={logo} alt="MedCare Logo" className="footer-logo-img" />
          </h2>

          <p className="footer-desc footer-lift">
            MedCare is your trusted partner for online doctor appointments,
            symptom analysis using AI, teleconsultations, and instant session booking.
            <br />
            We ensure verified doctors and a seamless healthcare experience.
          </p>
        </div>

        <div className="footer-section ">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/chatbot">Chatbot</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-contact">+91 55263 06343 </p>
          <p className="footer-contact">medcare.support@gmail.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 MedCare — All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
