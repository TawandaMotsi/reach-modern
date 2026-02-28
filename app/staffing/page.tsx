"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
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

export default function StaffingPage() {
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
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 820, position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Our Staff
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, maxWidth: 720, margin: "0 auto 32px" }}>
            As an organisation we know how the little things make a huge difference and that&apos;s why we have searched out the best staffing team with versatile and transferable skills. Everyone who works for Reach Healthcare Solutions is highly qualified, professional and flexible to meeting our clients&apos; exact needs.
          </p>
          <a
            href="/contact"
            style={{ display: "inline-block", background: "#fff", color: "#0984e3", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.95rem", fontFamily: "sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(0,0,0,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 22px rgba(0,0,0,0.15)"; }}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* ── RECRUITMENT & VETTING ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>
                Recruitment and Vetting
              </h2>
              <p style={{ color: "#666", maxWidth: 720, margin: "0 auto", lineHeight: 1.65, fontSize: "1.05rem" }}>
                Our Reach Healthcare Solutions head office is home to a dedicated recruitment and vetting team who ensure that our staff go through vigorous checks to safeguard you and your loved ones.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "24-Hour Availability", desc: "No matter what time of the day, week or year you need assistance, our account managers are always on hand to deal with any problems or last-minute requests." },
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>, title: "Fully Managed Service", desc: "Using our service can take some of the stress off your organisation both physically and financially. Reach Healthcare Solutions will provide regular reports, assessments and specific client-focused training, whilst responding to needs." },
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: "Precise Profiling", desc: "To make sure our staff are the perfect fit for your requirements, we profile all our clients in advance so we can match them against our extensive staff database. We'll discuss exactly what you need, from staff qualifications through to shift patterns." },
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, title: "Spot Checks", desc: "To make sure our staff are continuously meeting our high standards, we cooperate with our clients to perform regular spot checks for quality and consistency." },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #e4edf7", borderRadius: 16, padding: "32px 24px", boxShadow: "0 2px 12px rgba(9,132,227,0.06)", textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(9,132,227,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(9,132,227,0.06)"; }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e8f4fd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#0984e3" }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12, fontFamily: "sans-serif" }}>{feature.title}</h3>
                  <p style={{ margin: 0, lineHeight: 1.7, color: "#555", fontSize: "0.92rem", fontFamily: "sans-serif" }}>{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAFF DATABASE ── */}
      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                Reach Healthcare Solutions staff database
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444", marginBottom: 20 }}>
                We have an extensive team of dedicated staff from diverse backgrounds who possess a multitude of skills and experience which include the following:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Specialist Registered Nurses", "Registered General Nurses", "Senior Support Workers", "Home Care Managers", "Healthcare Assistants", "Paediatric Nurses", "Support Workers", "Senior Carers", "Carers"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "center", fontFamily: "sans-serif", fontSize: "0.92rem", color: "#555" }}>
                    <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#0984e3" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src="/images/iStock-185084694.jpg"
                alt="Healthcare staff"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src="/images/iStock-487536797.jpg"
                alt="Healthcare specialities"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                Reach Healthcare Solutions staff specialities
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444", marginBottom: 20 }}>
                We have a huge number of staff in our database covering a variety of specialities including the following:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Spinal injuries", "Motor neuron and neuro-muscular disorders", "Endocrine disorders", "Complex Respiratory disorders and airway management including ventilation support", "Gastrointestinal disorders", "Mobility", "Medication management", "Catheter management", "Complex epilepsy management", "Parenteral and enteral feeding"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "sans-serif", fontSize: "0.92rem", color: "#555" }}>
                    <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#0984e3", marginTop: 6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
