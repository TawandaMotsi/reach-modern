"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  cv: File | null;
};

export default function ApplicationFormPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    cv: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#f4f8fc", color: "#1a2a3a" }}>
      <Header />
      
      <section style={{ background: "linear-gradient(135deg, #062e4f 0%, #0a5a8c 55%, #0984e3 100%)", padding: "120px 24px 80px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: 0 }}>Application Form</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem", opacity: 0.9 }}>Join our team at Reach Healthcare Solutions</p>
      </section>

      <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        {!showForm ? (
          <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: 20, boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#062e4f" }}>Ready to Apply?</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#556677", lineHeight: 1.8 }}>
              Click below to proceed with your application to join our healthcare team.
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{ display: "inline-block", background: "#0984e3", color: "#fff", borderRadius: 50, padding: "16px 36px", border: "none", fontFamily: "sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 6px 24px rgba(9,132,227,0.32)", transition: "background 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#076bbf"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#0984e3"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Proceed to Application Form →
            </button>
          </div>
        ) : submitted ? (
          <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: 20, boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
            <h2 style={{ color: "#0984e3", marginBottom: "1rem" }}>Thank You!</h2>
            <p>Your application has been submitted successfully. We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "40px", borderRadius: 20, boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>First Name *</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Last Name *</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Phone *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Job Role *</label>
              <select
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              >
                <option value="">Select Job Role</option>
                <option value="healthcare-assistant">Healthcare Assistant</option>
                <option value="support-worker">Support Worker</option>
                <option value="nurse">Nurse</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Upload CV</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setForm({ ...form, cv: e.target.files?.[0] || null })}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: 4, fontSize: "1rem" }}
              />
            </div>

            <button
              type="submit"
              style={{ width: "100%", padding: "16px", background: "#0984e3", color: "#fff", border: "none", borderRadius: 50, fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(9,132,227,0.32)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#076bbf"}
              onMouseLeave={e => e.currentTarget.style.background = "#0984e3"}
            >
              Submit Application
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
