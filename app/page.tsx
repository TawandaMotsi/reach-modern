"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { getImagePath } from "@/app/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


const heroSlides = [
  { heading: "Children and young people", description: "We provide services for those with medical, emotional and complex health care needs", buttonText: "Find out more", href: "/care-services" },
  { heading: "Home care your family will love", buttonText: "Find out more", href: "/care-services" },
  { heading: "We are recruiting", description: "Nurses, Care assistants and support workers", buttonText: "Apply now", href: "/register" },
  { heading: "Carefully selected and vetted trained staff", buttonText: "Find out more", href: "/staffing" },
  { heading: "Quality care always", buttonText: "Get in touch", href: "/contact" },
];

const careServices = [
  { icon: "🕐", title: "Daily Visiting Care", desc: "Support with daily activities to maintain your independence at home. Personal care, medication, shopping, meal preparation." },
  { icon: "👨‍👩‍👧", title: "Children & Young People", desc: "We provide support and care plans for a range of physical and mental health and medical conditions." },
  { icon: "🏠", title: "Live-in Care", desc: "Full-time care in the comfort of your own home. A popular and viable alternative to residential care, especially for couples." },
  { icon: "💙", title: "Respite Care", desc: "We are always there to step in when you need to make time for yourself from caring for your loved ones." },
];

const pillars = [
  { title: "Professional & Reliable", desc: "From the services we provide, to our staff and to the experience of our clientele, we stand for quality.", href: "/staffing" },
  { title: "Quality Personnel Service", desc: "We recruit and deliver our services nationwide, supplying staff to all areas and specialities.", href: "/staffing" },
  { title: "Our Service Standards", desc: "Reach Healthcare Solutions is your industry specialist recruiter for the care and health industry.", href: "/staffing" },
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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(c => (c + 1) % heroSlides.length); setFade(true); }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <section style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", background: "linear-gradient(135deg, #083a5e 0%, #0a5a8c 40%, #0984e3 100%)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 780, padding: "120px 40px 80px", zIndex: 1 }}>
        <div style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: 20, fontFamily: "sans-serif" }}>
            Reach Healthcare Solutions
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em", fontFamily: "'Georgia', serif" }}>
            {slide.heading}
          </h1>
          {slide.description && (
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              {slide.description}
            </p>
          )}
          {!slide.description && <div style={{ marginBottom: 36 }} />}
          <Link href={slide.href} style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 36px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.95rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            {slide.buttonText}
          </Link>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 48 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 200); }} style={{ width: i === current ? 28 : 10, height: 10, borderRadius: 5, background: i === current ? "#fff" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", overflow: "hidden" }}>
        <img src={getImagePath("/iStock-842108572-1024x683.jpg")} alt="Care" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0a5a8c 0%, transparent 60%)" }} />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf9f7", color: "#2c2c2c", overflowX: "hidden" }}>
    <Header />
    
      <HeroSlider /> 

      {/* Quick links bar */}
      <section style={{ background: "#0a4d7c" }}>
      
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { label: "Looking for Care?", href: "/care-services" },
            { label: "Looking for Work?", href: "/work-for-us" },
            { label: "Looking for Staff?", href: "/staffing" },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ display: "block", padding: "20px 28px", textAlign: "center", color: "#fff", textDecoration: "none", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.88rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              {item.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* Get to Know Us */}
      <section style={{ padding: "80px 24px", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <span style={{ display: "inline-block", background: "#e8f4fd", color: "#0984e3", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20, fontFamily: "sans-serif" }}>
            Who We Are
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.25 }}>
            Get to Know Us
          </h2>
          <p style={{ lineHeight: 1.85, color: "#555", fontSize: "1.05rem", maxWidth: 720, margin: "0 auto 32px" }}>
            We specialise in the supply of care services to children, young people, and adults in a variety of community settings — promoting independence, maintaining dignity and improving quality of life. We work with Social Care, Clinical Commissioning Groups, Private Clients, and more.
          </p>
          <Link href="/about" style={{ display: "inline-block", background: "#0984e3", color: "#fff", fontWeight: 700, padding: "13px 36px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
            Learn More About Us
          </Link>
        </FadeIn>
      </section>

      {/* Three Pillars */}
      <section style={{ background: "#f0f7ff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "36px 28px", boxShadow: "0 4px 20px rgba(9,132,227,0.07)", textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e8f4fd", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0984e3" }} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 14, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ lineHeight: 1.7, color: "#555", fontSize: "0.92rem", flex: 1 }}>{p.desc}</p>
                <Link href={p.href} style={{ display: "inline-block", marginTop: 24, color: "#0984e3", fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
                  Read more →
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Care Services */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>Domiciliary Care Services</h2>
              <p style={{ color: "#666", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>We are committed to providing care which we would like to receive ourselves.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 22 }}>
            {careServices.map((s, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div style={{ background: "#fff", border: "1px solid #e4edf7", borderRadius: 16, padding: "32px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(9,132,227,0.06)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(9,132,227,0.12)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 16px rgba(9,132,227,0.06)"; }}>
                  <div style={{ fontSize: "2.4rem", marginBottom: 18 }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0a4d7c", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={200}>
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <Link href="/care-services" style={{ display: "inline-block", background: "#0984e3", color: "#fff", fontWeight: 700, padding: "14px 40px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.95rem" }}>
                View All Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Free Assessment */}
      <section style={{ background: "linear-gradient(135deg, #083a5e 0%, #0984e3 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
              <img src={getImagePath("/iStock-842108572-1024x683.jpg")} alt="Care assessment" style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.72rem", fontFamily: "sans-serif", marginBottom: 16 }}>Getting Started</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, marginBottom: 20, lineHeight: 1.25 }}>
                Get a free, no obligation care assessment
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: 16 }}>
                Request a member of our team to visit you and carry out a full assessment of your care needs. This gives us an opportunity to get to know you and understand your personal preferences and support requirements.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 32, fontStyle: "italic" }}>
                No need to worry — we will come out and have a chat about your needs.
              </p>
              <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 36px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.95rem", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                Book Assessment
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Working for Reach */}
      <section style={{ padding: "80px 24px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 52, alignItems: "center" }}>
          <FadeIn>
            <div>
              <span style={{ display: "inline-block", background: "#e8f4fd", color: "#0984e3", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20, fontFamily: "sans-serif" }}>
                Careers
              </span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 700, color: "#0a4d7c", marginBottom: 20, lineHeight: 1.25 }}>
                Working for Reach Healthcare Solutions
              </h2>
              <p style={{ lineHeight: 1.8, color: "#555", marginBottom: 28 }}>
                Here at Reach Healthcare Solutions, we recruit professional nursing and support staff and supply them to an extensive range of clients within the healthcare industry.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { title: "Flexible positions", desc: "Part-time and full-time positions with flexible shifts or temporary employment across hospitals, care homes, and healthcare environments." },
                  { title: "Excellent rates of pay", desc: "Competitive pay rates to ensure our staff stay happy and are able to deliver the best possible service to every client." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#0984e3", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div>
                      <p style={{ fontWeight: 700, color: "#0a4d7c", marginBottom: 4, fontSize: "0.95rem" }}>{item.title}</p>
                      <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                <Link href="/register" style={{ display: "inline-block", background: "#0984e3", color: "#fff", fontWeight: 700, padding: "13px 32px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.9rem" }}>Register Today</Link>
                <Link href="/work-for-us" style={{ display: "inline-block", background: "transparent", color: "#0984e3", fontWeight: 700, padding: "13px 32px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.9rem", border: "2px solid #0984e3" }}>Find Out More</Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img src={getImagePath("/iStock-503206195-1024x821-1.jpg")} alt="Healthcare staff" style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 420 }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section style={{ background: "#0a4d7c", padding: "64px 24px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, marginBottom: 14 }}>Ready to get started?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Our friendly team is always available to help. Get in touch today and let us find the right care solution for you.
          </p>
          <a href="/contact-us" style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 44px", borderRadius: 50, textDecoration: "none", fontFamily: "sans-serif", fontSize: "1rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            Contact Us
          </a>
        </FadeIn>
      </section> */}
      <Footer />
    </main>
  );
}
