"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getImagePath } from "../lib/utils";

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

export default function WorkForUsPage() {
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

        <div style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Looking to Join a Reliable Agency?
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto 32px" }}>
            If you are a nurse, support worker or carer, looking to join a great reliable agency that supplies work in various locations.
          </p>
          <Link
            href="/register"
            style={{ display: "inline-block", background: "#fff", color: "#0984e3", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.95rem", fontFamily: "sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(0,0,0,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 22px rgba(0,0,0,0.15)"; }}
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>
                Looking For Reliable Agency Work?
              </h2>
              <p style={{ color: "#666", maxWidth: 640, margin: "0 auto", lineHeight: 1.65, fontSize: "1rem" }}>
                Reach Healthcare Solutions is recruiting for care positions across the whole of the UK.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10" stroke="white" strokeWidth="2"/></svg>, title: "Better Pay", desc: "Reach Healthcare Solutions offers some of the best pay rates in the region, paid weekly to your bank." },
              { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Flexible Working Hours and Shift Patterns", desc: "Choose the hours and flexible shift patterns that suit you with varied and rewarding work." },
              { icon: <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Diverse Experience", desc: "Working in various locations across the region, gives you the opportunity to gain diverse industry experience." },
              { icon: <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: "Work Close to Home", desc: "We will always give you the option to work closest to home." },
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #e4edf7", borderRadius: 16, padding: "32px 24px", boxShadow: "0 2px 12px rgba(9,132,227,0.06)", textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(9,132,227,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(9,132,227,0.06)"; }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0984e3", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#fff" }}>
                    {benefit.icon}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12, fontFamily: "sans-serif" }}>{benefit.title}</h3>
                  <div style={{ height: 2, width: 40, background: "#0984e3", margin: "0 auto 16px" }} />
                  <p style={{ margin: 0, lineHeight: 1.7, color: "#555", fontSize: "0.92rem", fontFamily: "sans-serif" }}>{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / IMAGE ── */}
      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                Join our growing team
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444", marginBottom: 16 }}>
                Reach Healthcare Solutions is fuelled by its commitment to its service users. We are constantly receiving enquiries from potential service users requiring home care. At Reach Healthcare Solutions, we stand behind our values and are always looking to hire motivated individuals to join our team.
              </p>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                Despite the current Covid-19 situation, we are proud to continue expanding and recruit new staff. As a Reach Healthcare Solutions employee, you will benefit from a thorough orientation and training program and you will learn new techniques to help you cater to the needs of all types of patients.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src={getImagePath("/images/iStock-1062430518.jpg")}
                alt="Healthcare professionals"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>
                Joining Reach Healthcare Solutions Is Simple
              </h2>
              <p style={{ color: "#666", maxWidth: 640, margin: "0 auto", lineHeight: 1.65 }}>
                We take you through an easy three step application process, which won&apos;t take much of your time.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32, marginBottom: 48 }}>
            {[
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, title: "Apply", desc: "Register online, through post or in person." },
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "Attend Interview", desc: "Meeting to discuss experience and qualifications. Establish proof of identity, and professional photo id." },
              { icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Start Working", desc: "Once DBS and reference checks are done and accepted, your staff profile can be published and start working." },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e8f4fd", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#0984e3" }}>
                    {step.icon}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 10, fontFamily: "sans-serif" }}>{step.title}</h3>
                  <p style={{ margin: 0, lineHeight: 1.7, color: "#555", fontSize: "0.9rem", fontFamily: "sans-serif" }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div style={{ textAlign: "center" }}>
              <Link
                href="/register"
                style={{ display: "inline-block", background: "#0984e3", color: "#fff", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.95rem", fontFamily: "sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(9,132,227,0.32)", transition: "transform 0.2s, background 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#076bbf"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0984e3"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                Join Reach Healthcare
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
