// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeEdit from "./pages/EmployeeEdit";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Update (protected) */}
        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
