import React, { useState } from "react";
import "./authModel.css";
import {
  notifyLoginSuccess,
  notifyLoginFail,
  notifyRegisterSuccess,
  notifyRegisterFail
} from "../../utils/toast";

export default function AuthModal({ show, setShow }) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      notifyRegisterSuccess();   
      setIsSignup(false);        
    } else {
      notifyRegisterFail();      
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      const token = data.token?.toString().replaceAll('"', "");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user-updated"));

      notifyLoginSuccess();  
      setShow(false);        
    } else {
      notifyLoginFail();   
    }
  };

  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        onSubmit={isSignup ? handleSignup : handleLogin}
        autoComplete="on"
      >
        <div className="login-popup-title">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <span className="close-icon" onClick={() => setShow(false)}>
            ✕
          </span>
        </div>

        <div className="login-popup-inputs">
          {isSignup && (
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          {isSignup ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {isSignup ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsSignup(false)}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setIsSignup(true)}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}
