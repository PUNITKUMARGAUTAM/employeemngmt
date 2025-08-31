import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/auth/register", form);
      alert("Registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="auth-wrap">
        <form className="auth-card" onSubmit={submit}>
          <h2>Create Account</h2>
          <input name="username" placeholder="Username" onChange={handle} required />
          <input name="email" placeholder="Email" type="email" onChange={handle} required />
          <input name="password" type="password" placeholder="Password" onChange={handle} required />
          <button type="submit" disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
          <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </main>
      <Footer />
    </>
  );
}
