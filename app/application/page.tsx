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

const checklist = [
  { label: "Your NI number", required: true },
  { label: "ID Photo", required: true },
  { label: "Passport / Visa Number", required: true },
  { label: "Copy or picture of Passport / ID", required: true },
  { label: "Proof of address document", required: true },
  { label: "2 Employment References", required: true },
  { label: "Proof of education – Certificate copies", required: true },
  { label: "Your GP / Doctor's Details", required: true },
  { label: "Current DBS number (if you have one)", required: false },
];

export default function ApplyingOnlinePage() {
  return (
    <main style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#f4f8fc", color: "#1a2a3a", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", background: "linear-gradient(135deg, #062e4f 0%, #0a5a8c 55%, #0984e3 100%)", padding: "120px 24px 80px", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14, fontFamily: "sans-serif" }}>
            Step 2 of 2
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 18, letterSpacing: "-0.02em" }}>
            Applying Online
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.95rem, 2vw, 1.05rem)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto", fontFamily: "sans-serif" }}>
            Please take a moment to make sure you have everything ready before starting your application.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 88px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

          {/* Left: Before you start */}
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Heading card */}
              <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 18px rgba(9,100,200,0.07)", border: "1px solid #eaf0f8" }}>
                <p style={{ margin: "0 0 6px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00b1ca", fontFamily: "sans-serif" }}>
                  Read before you begin
                </p>
                <h2 style={{ margin: "0 0 16px", fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#083a5e", lineHeight: 1.2 }}>
                  Before you start
                </h2>
                <p style={{ color: "#556677", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 14 }}>
                  Please take time to check whether you are ready to apply for registration. Make sure you have everything on the checklist — some items are required, and the form will not allow you to proceed without them.
                </p>
                <p style={{ color: "#556677", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 0 }}>
                  Note that you can save your application progress and continue later.
                </p>
              </div>

              {/* Progress indicator */}
              <div style={{ background: "linear-gradient(135deg, #eaf4fd, #f0f8ff)", borderRadius: 16, padding: "20px 22px", border: "1px solid #cce4f7" }}>
                <p style={{ margin: "0 0 14px", fontWeight: 700, fontSize: "0.78rem", color: "#083a5e", fontFamily: "sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Application progress
                </p>
                {[
                  { label: "Quick Registration", done: true },
                  { label: "Review Checklist", done: false, active: true },
                  { label: "Full Application Form", done: false },
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < 2 ? 10 : 0 }}>
                    <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: step.done ? "#0984e3" : step.active ? "#fff" : "#e4edf7", border: `2px solid ${step.done ? "#0984e3" : step.active ? "#0984e3" : "#d0dae8"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {step.done
                        ? <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M2 6.5L5 9.5L11 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : <div style={{ width: 8, height: 8, borderRadius: "50%", background: step.active ? "#0984e3" : "transparent" }} />}
                    </div>
                    <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "0.88rem", fontWeight: step.active ? 700 : 400, color: step.done ? "#0984e3" : step.active ? "#083a5e" : "#99aabb" }}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/application"
                style={{ display: "block", background: "#0984e3", color: "#fff", borderRadius: 50, padding: "16px 36px", textDecoration: "none", fontFamily: "sans-serif", fontWeight: 700, fontSize: "1rem", textAlign: "center", boxShadow: "0 6px 24px rgba(9,132,227,0.32)", transition: "background 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#076bbf"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0984e3"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                Proceed to Application Form →
              </a>

              <p style={{ textAlign: "center", margin: 0, fontFamily: "sans-serif", fontSize: "0.78rem", color: "#99aabb" }}>
                Need help?{" "}
                <a href="tel:02034415474" style={{ color: "#0984e3", textDecoration: "none", fontWeight: 600 }}>Call us on 0203 441 5474</a>
              </p>

            </div>
          </FadeIn>

          {/* Right: Checklist */}
          <FadeIn delay={100}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 36px rgba(9,100,200,0.1)", border: "1px solid #e4edf7" }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{ margin: "0 0 6px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0984e3", fontFamily: "sans-serif" }}>
                  Documents & information
                </p>
                <h2 style={{ margin: "0 0 8px", fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 700, color: "#083a5e", lineHeight: 1.2 }}>
                  Checklist of things you need before you start
                </h2>
                <p style={{ margin: 0, color: "#8899bb", fontSize: "0.82rem", fontFamily: "sans-serif", lineHeight: 1.5 }}>
                  Items marked <span style={{ color: "#e55353", fontWeight: 700 }}>required</span> must be provided. You cannot proceed without them.
                </p>
              </div>

              <div style={{ height: 1, background: "linear-gradient(90deg, #0984e3, transparent)", marginBottom: 22, opacity: 0.2 }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {checklist.map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#f7fafd", border: "1px solid #eaf0f8", transition: "box-shadow 0.2s" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: item.required ? "#e8f4fd" : "#f0faf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.required
                          ? <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7L5.5 10.5L12 3" stroke="#0984e3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          : <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7L5.5 10.5L12 3" stroke="#22bb6e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "0.88rem", color: "#334455", fontWeight: 500, lineHeight: 1.4 }}>
                        {item.label}
                      </p>
                    </div>
                    <span style={{ flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: item.required ? "#0984e3" : "#22bb6e", background: item.required ? "#e8f4fd" : "#f0faf5", borderRadius: 50, padding: "3px 10px", fontFamily: "sans-serif", border: `1px solid ${item.required ? "#cce4f7" : "#c3f0d5"}` }}>
                      {item.required ? "Required" : "Optional"}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28, padding: "16px 18px", borderRadius: 14, background: "linear-gradient(135deg, #fff8e1, #fff3cd)", border: "1px solid #ffe082" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                      <path d="M9 1.5L16.5 15H1.5L9 1.5z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M9 7v3.5M9 12.5v.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "0.82rem", color: "#78560a", lineHeight: 1.6 }}>
                    <strong>Save your progress:</strong> You can save the application at any point and return to complete it later using the link sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </main>
  );
}
