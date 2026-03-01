"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getImagePath } from "../../lib/utils";
import Link from "next/link";

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

export default function ChildrenYoungPeoplePage() {
  const services = [
    { icon: "🏥", title: "Medical Appointments", text: "Attending medical appointments" },
    { icon: "🍽️", title: "Personal Care", text: "Help with personal care, meals and feeding" },
    { icon: "🧩", title: "ASD Support", text: "Support for those with an ASD diagnosis" },
    { icon: "🎒", title: "Morning Routine", text: "Getting ready for school or college in the mornings" },
    { icon: "📚", title: "School Support", text: "One-to-one support at school" },
    { icon: "🎨", title: "Social Activities", text: "Shopping trips, social or cultural events, leisure and sport" },
    { icon: "🏠", title: "Home Activities", text: "Activities at home" },
    { icon: "🌙", title: "Bedtime Routine", text: "Getting ready for bed" },
    { icon: "📅", title: "Daily Routines", text: "Supporting the family to establish daily routines" },
  ];

  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf9f7", color: "#2c2c2c", overflowX: "hidden" }}>
      <Header />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "420px",
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
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 24 }}>
            Children & Young People
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto 32px" }}>
            We focus on offering a quality child and young people friendly service, to those with both non-complex and complex health care needs in the comfort of their homes.
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-block", background: "#fff", color: "#0984e3", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.95rem", fontFamily: "sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(0,0,0,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 22px rgba(0,0,0,0.15)"; }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                Services for Children and Young People
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444", marginBottom: 16 }}>
                Our team has practical experience in dealing with challenging behaviours like self-harm, aggression, and absconding. We work with children and young people with a range of physical and mental health conditions.
              </p>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                We provide support and care plans for conditions including autism spectrum disorder, learning disabilities, complex medical needs, and behavioral challenges.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src={getImagePath("/images/iStock-524910948.jpg")}
                alt="Children and Young People Care"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>
                Our Services Include
              </h2>
              <p style={{ color: "#666", maxWidth: 580, margin: "0 auto", lineHeight: 1.65 }}>
                We provide comprehensive support tailored to each child's individual needs and preferences.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(9,132,227,0.06)", border: "1px solid #e4edf7", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(9,132,227,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(9,132,227,0.06)"; }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 18 }}>{service.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12, fontFamily: "sans-serif" }}>{service.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7, fontFamily: "sans-serif" }}>{service.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #083a5e 0%, #0984e3 100%)", padding: "80px 24px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, marginBottom: 14 }}>
            Find Out More About Our Children & Young People Services
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Get in touch with us to discuss how we can support your child or young person.
          </p>
          <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 44px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "1rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            Contact Us
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
