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

export default function CareServicesPage() {
  const services = [
    { img: "/images/iStock-524910948.jpg", title: "Children & Young People", desc: "Our team has practical experience in dealing with challenging behaviours like…", href: "/children-young-people/" },
    { img: "/images/iStock-888167478.jpg", title: "Domiciliary Care", desc: "Unforeseen circumstances can make the simplest activities of daily living challenging…", href: "/domiciliary-care/" },
    { img: "/images/iStock-842108572.jpg", title: "Live-in Care", desc: "We believe that moving people away from their own homes where they've lived for many…", href: "/live-in-care/" },
    { img: "/images/iStock-477715817.jpg", title: "Hospital to Home", desc: "One of the leading causes of hospital readmission or slow post-hospitalisation…", href: "/hospital-to-home/" },
    { img: "/images/shutterstock_168769925.jpg", title: "Respite Care", desc: "Respite Care is temporary care, which provides family caregivers relief from the full-time…", href: "/respite-care/" },
    { img: "/images/iStock-532529087.jpg", title: "End of Life", desc: "We can provide comforting, end-of-life care for your loved one and assist the family during…", href: "/end-of-life/" },
    { img: "/images/iStock-1149278960.jpg", title: "Supported Living", desc: "Here at Reach Healthcare Solutions, we believe in enjoying a life that is full of purpose and realising…", href: "/supported-living/" },
    { img: "/images/IMG-20210120-WA0015.jpg", title: "Specialist Care", desc: "Reach Healthcare Solutions is a specialist care provider providing service for adult clients…", href: "/specialist-care/" },
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
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: 32 }}>
            Care Services
          </h1>
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

      {/* ── INTRO ── */}
      <section style={{ background: "#f0f7ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <FadeIn>
            <div>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.3 }}>
                Our Care Services
              </h2>
              <p style={{ lineHeight: 1.85, color: "#444" }}>
                Reach Healthcare Solutions provides personal care services allowing our clients to maintain their lifestyle in the comfort and familiarity of their homes. Our professional and trustworthy carers ensure you or your loved one is healthy and safe, by providing assistance with many personal care activities ranging from a few hours to 24-hours a day.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src="/images/iStock-509245916.jpg"
                alt="Care Services"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES CARDS ── */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(9,132,227,0.06)", border: "1px solid #e4edf7", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(9,132,227,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(9,132,227,0.06)"; }}
                >
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img src={service.img} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12, fontFamily: "sans-serif" }}>{service.title}</h3>
                    <p style={{ margin: "0 0 20px", lineHeight: 1.7, color: "#555", fontSize: "0.9rem", fontFamily: "sans-serif" }}>{service.desc}</p>
                    <a
                      href={service.href}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#0984e3", fontWeight: 600, fontSize: "0.88rem", fontFamily: "sans-serif", textDecoration: "none", transition: "gap 0.2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = "12px"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = "8px"}
                    >
                      Read More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
