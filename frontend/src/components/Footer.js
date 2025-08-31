// src/components/Footer.js
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ems-footer">
      © {new Date().getFullYear()} Employee Management System • Built with MERN
    </footer>
  );
}
