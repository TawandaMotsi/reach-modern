"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getImagePath } from "../lib/utils";

const promises = [
  "Ensure our service users are supported by highly competent, caring and compatible carers.",
  "Be flexible to your circumstances, needs and current home life.",
  "Ensure a smooth transition through effective and timely administrative processes.",
  "Support both our service users and their families pursue a life that is as full and interesting as possible.",
  "Offer continuity of care after discharge.",
];

const objectives = [
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, text: "Facilitate a safe, comfortable and stress-free transition from an acute setting to the comfort of home." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text: "Provide a smooth and timely transition to the identified long-term care provider." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: "Encourage service users and their representatives to be actively involved in formulating bespoke care plans." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: "Ensure that service users are treated with respect, privacy, dignity and safeguarded from harm and abuse." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>, text: "Ensure that our service is provided in a non-discriminatory way, whilst respecting the right to informed choice." },
  { icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, text: "Ensure the service users' needs and values are respected in relation to culture, religion, sexuality, race, and disabilities." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>, text: "Observe a rigorous recruitment process that ensures skilled and professional staff are engaged." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, text: "Ensure our employees have up-to-date training that is both robust and evidence based." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, text: "Provide safe, timely and accurate records of care and documentation." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, text: "Make sure all health and safety procedures are always followed as per company policies." },
  { icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, text: "Ensure that the quality of service provided is of the highest standards." },
  { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, text: "All care will meet the CQC fundamentals of care standards." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf9f7", color: "#2c2c2c", overflowX: "hidden" }}>
      <Header />
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #0a4d7c 0%, #0984e3 60%, #38b6ff 100%)",
          padding: "100px 24px 80px",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.18em", fontSize: "0.78rem", textTransform: "uppercase", marginBottom: 20, fontFamily: "'Trebuchet MS', sans-serif" }}>
            {/* About Us */}
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Providing exceptional care<br />in community settings
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto" }}>
            Reach Healthcare Solutions is a specialist domiciliary care provider that works with individuals and families to reach their potential — maintaining dignity and improving quality of life.
          </p>
        </div>
      </section>

      {/* ── INTRO SPLIT ── */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
        <FadeIn>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
            <img
              src={getImagePath("/iStock-503206195-1024x821-1.jpg")}
              alt="Care worker with patient"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div>
            <span style={{ display: "inline-block", background: "#e8f4fd", color: "#0984e3", fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20, fontFamily: "sans-serif" }}>
              Our Story
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 700, marginBottom: 20, lineHeight: 1.25, color: "#0a4d7c" }}>
              Born from experience, built with purpose
            </h2>
            <p style={{ lineHeight: 1.85, color: "#444", fontSize: "1rem" }}>
              Reach Healthcare Solutions is a service provider based in London and the surrounding areas. Born out of the frustration of fractured services observed over the years for families with children with complex healthcare needs.
            </p>
            <p style={{ lineHeight: 1.85, color: "#444", fontSize: "1rem", marginTop: 16 }}>
              As a group of registered nurses with over <strong>40 years of combined experience</strong>, we have cared for children and adults with various disabilities and complex care needs, gaining first-hand experience of managing care in the home.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── TEAL DIVIDER ── */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #0984e3, #38b6ff, transparent)", maxWidth: 400, margin: "0 auto 0" }} />

      {/* ── HOME CARE SPLIT (reversed) ── */}
      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                There's no place like home
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                The service we provide allows our service users — whether children or young adults suffering from chronic or disabling conditions — to continue living in the comfort of their own homes. We understand that for most service users and their families, there really is no place like home.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src={getImagePath("/iStock-857895554-1024x716.jpg")}
                alt="Family at home"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BESPOKE CARE SPLIT ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src={getImagePath("/6-1-scaled.jpg")}
                alt="Professional care"
                style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 380 }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                A bespoke, individually tailored service
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                Our highly trained staff provide an excellent quality service, supported by expert guidance from our senior team and experienced registered nurses. We offer a flexible and reasonable approach to suit your needs and routines.
              </p>
              <p style={{ lineHeight: 1.85, color: "#444", marginTop: 16 }}>
                We are committed to providing staff with a comprehensive programme of training and support — and we aim to include service users on the recruitment panel wherever reasonably possible.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROMISES ── */}
      <section style={{ background: "#0a4d7c", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
                We promise to…
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Our commitments to every service user and family we support.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {promises.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#38b6ff", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.88)", lineHeight: 1.65, fontSize: "0.97rem" }}>{p}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── AIMS & OBJECTIVES ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>
                Our aims and objectives
              </h2>
              <p style={{ color: "#666", maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
                At Reach Healthcare Solutions, every aspect of our service is guided by these principles.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {objectives.map((obj, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div style={{
                  background: "#fff",
                  border: "1px solid #e4edf7",
                  borderRadius: 12,
                  padding: "24px",
                  boxShadow: "0 2px 12px rgba(9,132,227,0.06)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(9,132,227,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(9,132,227,0.06)"; }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e8f4fd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 0 16px 0", color: "#0984e3" }}>
                    {obj.icon}
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.65, color: "#444", fontSize: "0.92rem", fontFamily: "sans-serif" }}>{obj.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <p style={{ textAlign: "center", marginTop: 48, fontSize: "1.1rem", color: "#0984e3", fontStyle: "italic" }}>
              We at Reach Healthcare Solutions are here for you.
            </p>
          </FadeIn>
        </div>
      </section>
        <Footer />
    </main>
  );
}
