"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import router from "next/router";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  otherRole: string;
};

function RegistrationForm() {
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", role: "Select Job Role", otherRole: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (form.role === "Other" && !form.otherRole.trim()) e.otherRole = "Please specify your role";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    border: `1.5px solid ${errors[name as keyof FormData] ? "#e55353" : focused === name ? "#0984e3" : "#dde4ee"}`,
    borderRadius: 10,
    background: "#f9fbfe",
    fontFamily: "sans-serif",
    fontSize: "0.92rem",
    color: "#1a2a3a",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#5a6a82",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    marginBottom: 6,
    fontFamily: "sans-serif",
  };

  if (submitted) return (
    router.push("/application")
  );

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {(["firstName", "lastName"] as const).map((field, i) => (
          <div key={field}>
            <label style={labelStyle}>{i === 0 ? "First Name" : "Last Name"} <span style={{ color: "#e55" }}>*</span></label>
            <input
              type="text"
              placeholder={i === 0 ? "Jane" : "Smith"}
              value={form[field]}
              onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(er => ({ ...er, [field]: "" })); }}
              onFocus={() => setFocused(field)}
              onBlur={() => setFocused(null)}
              style={fieldStyle(field)}
            />
            {errors[field] && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: 4, fontFamily: "sans-serif" }}>{errors[field]}</p>}
          </div>
        ))}
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email <span style={{ color: "#e55" }}>*</span></label>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          style={fieldStyle("email")}
        />
        {errors.email && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: 4, fontFamily: "sans-serif" }}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>Phone <span style={{ color: "#e55" }}>*</span></label>
        <input
          type="tel"
          placeholder="+44 7700 900000"
          value={form.phone}
          onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })); }}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused(null)}
          style={fieldStyle("phone")}
        />
        {errors.phone && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: 4, fontFamily: "sans-serif" }}>{errors.phone}</p>}
      </div>

      {/* Role Select */}
      <div>
        <label style={labelStyle}>Role Applying For</label>
        <select
          value={form.role}
          onChange={e => { setForm(f => ({ ...f, role: e.target.value, otherRole: "" })); }}
          onFocus={() => setFocused("role")}
          onBlur={() => setFocused(null)}
          style={{ ...fieldStyle("role"), appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235a6a82' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40 }}
        >
          <option value="Select Job Role">Select Job Role</option>
          <option value="Registered Nurse">Registered Nurse</option>
          <option value="Healthcare Assistant">Healthcare Assistant</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Other Role - conditionally shown */}
      {form.role === "Other" && (
        <div style={{ animation: "fadeSlide 0.3s ease" }}>
          <label style={labelStyle}>Please specify your role <span style={{ color: "#e55" }}>*</span></label>
          <input
            type="text"
            placeholder="Enter your job role"
            value={form.otherRole}
            onChange={e => { setForm(f => ({ ...f, otherRole: e.target.value })); setErrors(er => ({ ...er, otherRole: "" })); }}
            onFocus={() => setFocused("otherRole")}
            onBlur={() => setFocused(null)}
            style={fieldStyle("otherRole")}
          />
          {errors.otherRole && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: 4, fontFamily: "sans-serif" }}>{errors.otherRole}</p>}
        </div>
      )}

      <p style={{ fontSize: "0.72rem", color: "#99aabb", fontFamily: "sans-serif", margin: 0 }}>
        <span style={{ color: "#e55" }}>*</span> Mandatory fields
      </p>

      <button
        type="submit"
        style={{ alignSelf: "flex-start", background: "#0984e3", color: "#fff", border: "none", borderRadius: 50, padding: "14px 44px", fontWeight: 700, fontSize: "0.92rem", fontFamily: "sans-serif", cursor: "pointer", boxShadow: "0 6px 22px rgba(9,132,227,0.32)", transition: "transform 0.2s, background 0.2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#076bbf"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0984e3"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
      >
        Continue →
      </button>

      <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </form>
  );
}

// ── Checklist Item ────────────────────────────────────────────────────────
function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
      <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#e8f4fd", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="#0984e3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p style={{ margin: 0, color: "#445566", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  return (
    <main style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#f4f8fc", color: "#1a2a3a", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", background: "linear-gradient(135deg, #062e4f 0%, #0a5a8c 55%, #0984e3 100%)", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14, fontFamily: "sans-serif" }}>
            Join our team
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.02em" }}>
            Register With Us
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", lineHeight: 1.8, maxWidth: 500, margin: "0 auto", fontFamily: "sans-serif" }}>
            Let&apos;s get started — this won&apos;t take long. Complete the quick registration form below to begin your application.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          <Header />
          {/* Left: Info Panel */}
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Photo */}
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 32px rgba(9,100,200,0.12)" }}>
                <img
                  src="https://reach-healthcare-com.300media.co.uk/wp-content/uploads/2020/08/iStock-909965082.jpg"
                  alt="Healthcare professional"
                  style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Text block */}
              <div style={{ background: "#fff", borderRadius: 20, padding: "28px 26px", boxShadow: "0 2px 18px rgba(9,100,200,0.07)", border: "1px solid #eaf0f8" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#083a5e", marginBottom: 12, lineHeight: 1.3 }}>
                  Let&apos;s get started:<br />this won&apos;t take long
                </h2>
                <p style={{ color: "#556677", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 16 }}>
                  To start the conversation please complete the quick registration form. You will then proceed with the full application form.
                </p>
                <p style={{ color: "#556677", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 24 }}>
                  If you have any questions or face any problems, please don&apos;t hesitate to contact our recruitment team.
                </p>

                <CheckItem text="Quick 2-minute registration" />
                <CheckItem text="Dedicated recruitment support team" />
                <CheckItem text="Flexible shifts to suit your lifestyle" />
                <CheckItem text="Competitive rates of pay" />
                <CheckItem text="Ongoing training and development" />
              </div>

              {/* Contact nudge */}
              <div style={{ background: "linear-gradient(135deg, #083a5e, #0984e3)", borderRadius: 16, padding: "22px 24px", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M18.5 14.9v2.1a1.4 1.4 0 0 1-1.5 1.4A13.85 13.85 0 0 1 11 16.56a13.65 13.65 0 0 1-4.2-4.2A13.85 13.85 0 0 1 4.99 6.5 1.4 1.4 0 0 1 6.38 5h2.1a1.4 1.4 0 0 1 1.4 1.2 9 9 0 0 0 .49 1.97 1.4 1.4 0 0 1-.32 1.48L9.09 10.57a11.2 11.2 0 0 0 4.2 4.2l.93-.93a1.4 1.4 0 0 1 1.47-.32 9 9 0 0 0 1.97.49A1.4 1.4 0 0 1 18.5 14.9z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontFamily: "sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>Need help?</p>
                  <a href="tel:02034415474" style={{ color: "#fff", fontFamily: "sans-serif", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none" }}>
                    0203 441 5474
                  </a>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* Right: Registration Form */}
          <FadeIn delay={100}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "38px 34px", boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
              <div style={{ marginBottom: 28 }}>
                <p style={{ margin: "0 0 6px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0984e3", fontFamily: "sans-serif" }}>
                  Step 1 of 2
                </p>
                <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#083a5e", lineHeight: 1.2 }}>
                  Quick Registration
                </h2>
                <p style={{ margin: 0, color: "#8899bb", fontSize: "0.88rem", lineHeight: 1.65, fontFamily: "sans-serif" }}>
                  Fill in your details below and we&apos;ll get the process started.
                </p>
              </div>

              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                {[1, 2].map(n => (
                  <div key={n} style={{ flex: 1, height: 4, borderRadius: 99, background: n === 1 ? "#0984e3" : "#e4edf7" }} />
                ))}
              </div>

              <RegistrationForm />
            </div>
          </FadeIn>

        </div>
      </section>
      <Footer />
    </main>
  );
}
