import React, { useState, useContext } from "react";
import "./adminLogin.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { adminLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (email === "admin@gmail.com" && password === "admin123") {
      adminLogin({
        email,
        token: "dummy-token",
      });

      navigate("/add-doctor");
      return;
    }

    //if wrong credentials
    setError("Invalid admin credentials");
  };

  return (
    <div className="admin-login-container">
      <div className="admin-card">

        <h2>Admin Login</h2>
        <p className="admin-sub">MedCare Admin Panel</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="admin-error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default AdminLogin;
