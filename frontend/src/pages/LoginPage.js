// src/pages/LoginPage.js
import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password }); // ✅ fixed endpoint
      localStorage.setItem("token", res.data.token); // Save token
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Check your credentials.";
      console.error("Login error:", errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>
        <button className="ghost-button" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>

      <div className="login-right">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
