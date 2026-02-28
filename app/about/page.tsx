"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const promises = [
  "Ensure our service users are supported by highly competent, caring and compatible carers.",
  "Be flexible to your circumstances, needs and current home life.",
  "Ensure a smooth transition through effective and timely administrative processes.",
  "Support both our service users and their families pursue a life that is as full and interesting as possible.",
  "Offer continuity of care after discharge.",
];

const objectives = [
  "Facilitate a safe, comfortable and stress-free transition from an acute setting to the comfort of home.",
  "Provide a smooth and timely transition to the identified long-term care provider.",
  "Encourage service users and their representatives to be actively involved in formulating bespoke care plans.",
  "Ensure that service users are treated with respect, privacy, dignity and safeguarded from harm and abuse.",
  "Ensure that our service is provided in a non-discriminatory way, whilst respecting the right to informed choice.",
  "Ensure the service users' needs and values are respected in relation to culture, religion, sexuality, race, and disabilities.",
  "Observe a rigorous recruitment process that ensures skilled and professional staff are engaged.",
  "Ensure our employees have up-to-date training that is both robust and evidence based.",
  "Provide safe, timely and accurate records of care and documentation.",
  "Make sure all health and safety procedures are always followed as per company policies.",
  "Ensure that the quality of service provided is of the highest standards.",
  "All care will meet the CQC fundamentals of care standards.",
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
              src="/iStock-503206195-1024x821-1.jpg"
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
                src="/iStock-857895554-1024x716.jpg"
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
                src="/6-1-scaled.jpg"
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {objectives.map((obj, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div style={{
                  background: "#fff",
                  border: "1px solid #e4edf7",
                  borderRadius: 12,
                  padding: "20px 22px",
                  boxShadow: "0 2px 12px rgba(9,132,227,0.06)",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}>
                  <span style={{ flexShrink: 0, fontFamily: "sans-serif", fontWeight: 700, color: "#0984e3", fontSize: "0.8rem", marginTop: 2, background: "#e8f4fd", borderRadius: 6, padding: "2px 7px" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ margin: 0, lineHeight: 1.65, color: "#444", fontSize: "0.92rem" }}>{obj}</p>
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
