import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img src="/header.png" alt="header" className="header-img" />

      <div className="header-contents">
        <h2> Smart <br/> Care...</h2>
        <p>
          Enter your symptoms and let MedCare guide you with smart predictions
          and trusted medical insights.
        </p>
        <Link to="/chatbot">
          <button>Start Symptom Check →</button>
        </Link>
  
      </div>
    </div>
  );
}

export default Header;
