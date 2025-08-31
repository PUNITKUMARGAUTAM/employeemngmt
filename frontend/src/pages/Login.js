import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="auth-wrap">
        <form className="auth-card" onSubmit={submit}>
          <h2>Login</h2>
          <input name="email" placeholder="Email" onChange={handle} required />
          <input name="password" type="password" placeholder="Password" onChange={handle} required />
          <button type="submit" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
          <p className="muted">New here? <Link to="/register">Create an account</Link></p>
        </form>
      </main>
      <Footer />
    </>
  );
}
