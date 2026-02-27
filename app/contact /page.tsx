"use client";

import { useEffect, useRef, useState } from "react";

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

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.message.trim()) e.message = "Please enter a message";
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
    padding: "12px 16px",
    border: `1.5px solid ${errors[name] ? "#e55353" : focused === name ? "#0984e3" : "#dde4ee"}`,
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
    <div style={{ textAlign: "center", padding: "56px 24px" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#eaf7f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M4 13L10 19L22 7" stroke="#22bb6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <h3 style={{ color: "#083a5e", fontFamily: "'Georgia',serif", fontSize: "1.4rem", marginBottom: 10 }}>Message sent!</h3>
      <p style={{ color: "#667", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "sans-serif", maxWidth: 320, margin: "0 auto" }}>
        Thank you for reaching out. A member of our team will be in touch with you shortly.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {(["firstName", "lastName"] as const).map((field, i) => (
          <div key={field}>
            <label style={labelStyle}>{i === 0 ? "First Name" : "Surname"} <span style={{ color: "#e55" }}>*</span></label>
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

      {/* Email + Phone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {(["email", "phone"] as const).map((field, i) => (
          <div key={field}>
            <label style={labelStyle}>{i === 0 ? "Email Address" : "Phone Number"} <span style={{ color: "#e55" }}>*</span></label>
            <input
              type={i === 0 ? "email" : "tel"}
              placeholder={i === 0 ? "jane@example.com" : "+44 7700 900000"}
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

      {/* Message */}
      <div>
        <label style={labelStyle}>Message <span style={{ color: "#e55" }}>*</span></label>
        <textarea
          rows={6}
          placeholder="Tell us how we can help you…"
          value={form.message}
          onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 120 }}
        />
        {errors.message && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: 4, fontFamily: "sans-serif" }}>{errors.message}</p>}
      </div>

      <p style={{ fontSize: "0.72rem", color: "#99aabb", fontFamily: "sans-serif", margin: 0 }}>
        <span style={{ color: "#e55" }}>*</span> Mandatory fields
      </p>

      <button
        type="submit"
        style={{ alignSelf: "flex-start", background: "#0984e3", color: "#fff", border: "none", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.9rem", fontFamily: "sans-serif", cursor: "pointer", boxShadow: "0 6px 22px rgba(9,132,227,0.32)", transition: "transform 0.2s, background 0.2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#076bbf"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0984e3"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
      >
        Send Message →
      </button>
    </form>
  );
}

function InfoCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "22px 22px", background: "#fff", borderRadius: 16, boxShadow: "0 2px 18px rgba(9,100,200,0.07)", border: "1px solid #eaf0f8" }}>
      <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "#eaf4fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.09em", textTransform: "uppercase", color: "#083a5e", fontFamily: "sans-serif" }}>{label}</p>
        <div style={{ color: "#556677", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.85 }}>{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#f4f8fc", color: "#1a2a3a", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", background: "linear-gradient(135deg, #062e4f 0%, #0a5a8c 55%, #0984e3 100%)", padding: "130px 24px 90px", textAlign: "center", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 480, height: 480, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "15%", width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14, fontFamily: "sans-serif" }}>
            TO FIND OUT HOW WE CAN HELP YOU
          </p>
          <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, marginBottom: 22, letterSpacing: "-0.02em" }}>
            Contact Us
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.95rem, 2vw, 1.08rem)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px", fontFamily: "sans-serif" }}>
            Our friendly staff are on hand 24/7 to offer any kind of assistance, whether that&apos;s a chat about your staffing requirements or to answer any questions you may have about our recruitment process.
          </p>
          <a
            href="tel:02034415474"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.13)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 50, padding: "13px 32px", textDecoration: "none", fontFamily: "sans-serif", fontWeight: 700, fontSize: "1.15rem", backdropFilter: "blur(8px)", transition: "background 0.2s, transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.22)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.13)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M16.5 12.9v2.1a1.4 1.4 0 0 1-1.5 1.4A13.85 13.85 0 0 1 9 14.56a13.65 13.65 0 0 1-4.2-4.2A13.85 13.85 0 0 1 2.99 4.5 1.4 1.4 0 0 1 4.38 3h2.1a1.4 1.4 0 0 1 1.4 1.2 9 9 0 0 0 .49 1.97 1.4 1.4 0 0 1-.32 1.48L7.09 8.57a11.2 11.2 0 0 0 4.2 4.2l.93-.93a1.4 1.4 0 0 1 1.47-.32 9 9 0 0 0 1.97.49A1.4 1.4 0 0 1 16.5 12.9z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            0203 441 5474
          </a>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

          {/* Left: Info Cards + Map */}
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <InfoCard
                label="Head Office"
                icon={<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#0984e3" strokeWidth="1.5" /><path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" stroke="#0984e3" strokeWidth="1.5" /></svg>}
              >
                <p style={{ margin: 0 }}>Business Design Centre Suite 145A,<br />52 Upper Street, Islington,<br />London, England, N1 0QH</p>
              </InfoCard>

              <InfoCard
                label="Call Us 24/7"
                icon={<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M18.5 14.9v2.1a1.4 1.4 0 0 1-1.5 1.4A13.85 13.85 0 0 1 11 16.56a13.65 13.65 0 0 1-4.2-4.2A13.85 13.85 0 0 1 4.99 6.5 1.4 1.4 0 0 1 6.38 5h2.1a1.4 1.4 0 0 1 1.4 1.2 9 9 0 0 0 .49 1.97 1.4 1.4 0 0 1-.32 1.48L9.09 10.57a11.2 11.2 0 0 0 4.2 4.2l.93-.93a1.4 1.4 0 0 1 1.47-.32 9 9 0 0 0 1.97.49A1.4 1.4 0 0 1 18.5 14.9z" stroke="#0984e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              >
                <a href="tel:02034415474" style={{ color: "#0984e3", textDecoration: "none", fontWeight: 600 }}>0203 441 5474</a>
              </InfoCard>

              <InfoCard
                label="Email Us"
                icon={<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#0984e3" strokeWidth="1.5" /><polyline points="1,4 10,11 19,4" stroke="#0984e3" strokeWidth="1.5" /></svg>}
              >
                <a href="mailto:info@reach-healthcare.com" style={{ color: "#0984e3", textDecoration: "none", display: "block" }}>info@reach-healthcare.com</a>
                <a href="mailto:recruitment@reach-healthcare.com" style={{ color: "#0984e3", textDecoration: "none", display: "block" }}>recruitment@reach-healthcare.com</a>
              </InfoCard>

              <InfoCard
                label="Office Hours"
                icon={<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#0984e3" strokeWidth="1.5" /><path d="M10 5v5l3 3" stroke="#0984e3" strokeWidth="1.5" strokeLinecap="round" /></svg>}
              >
                <p style={{ margin: 0 }}>Monday – Friday: 9:00am – 5:00pm<br />Saturday: Closed<br />Sunday: Closed</p>
              </InfoCard>

              {/* Google Maps link card */}
              <a
                href="https://maps.google.com/?q=Business+Design+Centre+52+Upper+Street+Islington+London+N1+0QH"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 22px", background: "#fff", borderRadius: 16, boxShadow: "0 2px 18px rgba(9,100,200,0.07)", border: "1px solid #eaf0f8", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(9,100,200,0.14)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 18px rgba(9,100,200,0.07)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C7.13 2 4 5.13 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" fill="#ea4335" opacity="0.15" stroke="#ea4335" strokeWidth="1.4" /><circle cx="11" cy="9" r="3" fill="#ea4335" /></svg>
                </div>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.78rem", color: "#083a5e", fontFamily: "sans-serif", letterSpacing: "0.04em" }}>View on Google Maps</p>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "#88a0b8", fontFamily: "sans-serif" }}>Get directions to our office →</p>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Right: Contact Form */}
          <FadeIn delay={100}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "38px 34px", boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
              <div style={{ marginBottom: 28 }}>
                <p style={{ margin: "0 0 6px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0984e3", fontFamily: "sans-serif" }}>
                  Get In Touch
                </p>
                <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#083a5e", lineHeight: 1.2 }}>
                  Send us a message
                </h2>
                <p style={{ margin: 0, color: "#8899bb", fontSize: "0.88rem", lineHeight: 1.65, fontFamily: "sans-serif" }}>
                  Fill in the form below and one of our friendly team will be in touch soon.
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, #0984e3 0%, transparent 100%)", marginBottom: 28, opacity: 0.2 }} />

              <ContactForm />
            </div>
          </FadeIn>

        </div>
      </section>

    </main>
  );
}
