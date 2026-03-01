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
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function LiveInCarePage() {
  const benefits = [
    { icon: "🏠", title: "Stay at Home", desc: "Remain in the comfort and familiarity of your own home" },
    { icon: "👥", title: "One-to-One Care", desc: "Dedicated carer providing personalized attention" },
    { icon: "💰", title: "Cost Effective", desc: "Often more affordable than residential care homes" },
    { icon: "👨‍👩‍👧", title: "Couples Care", desc: "Ideal solution for couples who want to stay together" },
    { icon: "🕐", title: "24/7 Support", desc: "Round-the-clock care and assistance when needed" },
    { icon: "🎯", title: "Tailored Care", desc: "Care plans designed around your specific needs" },
  ];

  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf9f7", color: "#2c2c2c", overflowX: "hidden" }}>
      <Header />

      <section style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "linear-gradient(135deg, #0a4d7c 0%, #0984e3 60%, #38b6ff 100%)", padding: "100px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 24 }}>Live-in Care</h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto 32px" }}>
            We believe that moving people away from their own homes where they've lived for many years is not always the best solution. Live-in care provides full-time support in the comfort of your own home.
          </p>
          <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#0984e3", borderRadius: 50, padding: "14px 40px", fontWeight: 700, fontSize: "0.95rem", fontFamily: "sans-serif", textDecoration: "none", boxShadow: "0 6px 22px rgba(0,0,0,0.15)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 22px rgba(0,0,0,0.15)"; }}>
            Get in Touch
          </Link>
        </div>
      </section>

      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>A Popular Alternative to Residential Care</h2>
              <p style={{ lineHeight: 1.85, color: "#444", marginBottom: 16 }}>
                Live-in care is a popular and viable alternative to residential care, especially for couples. Your carer will live in your home and provide support tailored to your needs, allowing you to maintain your independence and lifestyle.
              </p>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                This type of care is ideal for those who need regular support but want to remain in familiar surroundings with their belongings, memories, and community connections intact.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img src={getImagePath("/images/iStock-842108572.jpg")} alt="Live-in Care" style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>Benefits of Live-in Care</h2>
              <p style={{ color: "#666", maxWidth: 580, margin: "0 auto", lineHeight: 1.65 }}>Personalized care in the comfort of your own home</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {benefits.map((benefit, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(9,132,227,0.06)", border: "1px solid #e4edf7", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(9,132,227,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(9,132,227,0.06)"; }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 18 }}>{benefit.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12, fontFamily: "sans-serif" }}>{benefit.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7, fontFamily: "sans-serif" }}>{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #083a5e 0%, #0984e3 100%)", padding: "80px 24px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, marginBottom: 14 }}>Find Out More About Live-in Care</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65 }}>Contact us to discuss how live-in care can help you or your loved one.</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 44px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "1rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>Contact Us</Link>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
