// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    if (!token) return; // not logged in; hide list
    try {
      setLoading(true);
      const res = await API.get("/emp/getAll");
      setEmployees(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Could not fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []); // eslint-disable-line

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/emp/createEmp", {
        ...form,
        salary: Number(form.salary || 0),
      });
      setForm({ name: "", email: "", position: "", salary: "" });
      fetchEmployees();
      alert("Employee created");
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Create failed");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await API.delete(`/emp/deleteById/${id}`);
      fetchEmployees();
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Header />

      <main className="ems-container">
        <section className="hero">
          <div className="hero-text">
            <h2>Welcome to Punit EMS Dashboard</h2>
            <p>Manage employees quickly — add, list, update and delete.</p>
          </div>
          <div className="hero-actions">
            {!token ? (
              <>
                <button onClick={() => navigate("/register")} className="cta">Register</button>
                <button onClick={() => navigate("/login")} className="cta outline">Login</button>
              </>
            ) : (
              <>
                <button onClick={() => document.getElementById("add-form").scrollIntoView({behavior:"smooth"})} className="cta">Add Employee</button>
                <button onClick={() => document.getElementById("list-table").scrollIntoView({behavior:"smooth"})} className="cta outline">All Employees</button>
              </>
            )}
          </div>
        </section>

        {token && (
          <>
            <section className="card" id="add-form">
              <h3>Add Employee</h3>
              <form className="emp-form" onSubmit={handleAdd}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
                <input name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} required />
                <button type="submit">Create</button>
              </form>
            </section>

            <section className="card" id="list-table">
              <div className="list-head">
                <h3>All Employees</h3>
                <button onClick={fetchEmployees} className="ghost">Refresh</button>
              </div>

              {loading ? (
                <div className="loading">Loading...</div>
              ) : employees.length === 0 ? (
                <div className="empty">No employees yet. Add your first!</div>
              ) : (
                <div className="table-wrap">
                  <table className="emp-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th style={{width: 140}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(emp => (
                        <tr key={emp._id}>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.position}</td>
                          <td>₹ {emp.salary}</td>
                          <td className="actions">
                            <button onClick={() => navigate(`/employees/${emp._id}`)}>Edit</button>
                            <button className="danger" onClick={() => del(emp._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
