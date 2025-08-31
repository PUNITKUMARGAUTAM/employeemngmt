// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="ems-header">
      <div className="ems-header__left" onClick={() => navigate("/")}>
        <span className="ems-logo">EMS</span>
        <h1>Employee Management</h1>
      </div>

      <nav className="ems-nav">
        {!token ? (
          <>
            <Link to="/register" className="link-btn">Register</Link>
            <Link to="/login" className="link-btn primary">Login</Link>
          </>
        ) : (
          <button className="link-btn danger" onClick={logout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
