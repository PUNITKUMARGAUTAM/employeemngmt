import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/emp/getById/${id}`);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          position: res.data.position || "",
          salary: res.data.salary || 0
        });
      } catch (e) {
        console.error(e);
        alert("Failed to load employee");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/emp/updateByid/${id}`, { ...form, salary: Number(form.salary || 0) });
      alert("Updated");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Update failed");
    }
  };

  if (loading) return (<><Header /><main className="ems-container"><div className="loading">Loading...</div></main><Footer/></>);

  return (
    <>
      <Header />
      <main className="ems-container">
        <section className="card">
          <h3>Edit Employee</h3>
          <form className="emp-form" onSubmit={save}>
            <input name="name" value={form.name} onChange={handle} placeholder="Name" required/>
            <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required/>
            <input name="position" value={form.position} onChange={handle} placeholder="Position" required/>
            <input name="salary" type="number" value={form.salary} onChange={handle} placeholder="Salary" required/>
            <button type="submit">Save Changes</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
