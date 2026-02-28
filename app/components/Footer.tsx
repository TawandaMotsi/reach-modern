import React from "react";
import Link from "next/link";
import { getImagePath } from "../lib/utils";

export default function Footer() {
  return (
    <footer style={{ fontFamily: "sans-serif" }}>

      {/* ── Pre-footer CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #083a5e 0%, #0984e3 100%)", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, marginBottom: 14, fontFamily: "'Georgia', serif" }}>
          Ready to get started?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65, fontSize: "1rem" }}>
          Our friendly team is always available to help. Get in touch today and let us find the right care solution for you.
        </p>
        <Link
          href="/contact"
          style={{ display: "inline-block", background: "#fff", color: "#0a4d7c", fontWeight: 700, padding: "14px 44px", borderRadius: 50, textDecoration: "none", fontSize: "1rem", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Contact Us
        </Link>
      </section>

      {/* ── Main Footer ── */}
      <section style={{ background: "#05263f", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* Social icons row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 48 }}>
            {[
              { label: "Facebook", href: "https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { label: "Twitter / X", href: "https://twitter.com/_Reachcare", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/reach-healthcare-solutions/about/?viewAsMember=true", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            ].map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#38b6ff"; e.currentTarget.style.color = "#38b6ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                {svg}
              </a>
            ))}
          </div>

          {/* Four columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>

            {/* Logo + Tagline */}
            <div>
              <img
                src={getImagePath("/logo-mono.png")}
                alt="Reach Healthcare Solutions"
                style={{ width: 80, marginBottom: 14, filter: "brightness(0) invert(1) opacity(0.85)" }}
              />
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                Quality Staffing and Compassionate Care
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Contact Information
              </h4>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", lineHeight: 2 }}>
                <p>T: <a href="tel:02034415474" style={{ color: "inherit", textDecoration: "none" }}>0203 441 5474</a></p>
                <p>E: <a href="mailto:info@reach-healthcare.com" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>info@reach-healthcare.com</a></p>
                <p>E: <a href="mailto:recruitment@reach-healthcare.com" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>recruitment@reach-healthcare.com</a></p>
              </div>
            </div>

            {/* Office Address */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Office Address
              </h4>
              <address style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", lineHeight: 2, fontStyle: "normal" }}>
                Design Centre Suite 145A,<br />
                52 Upper Street, Islington,<br />
                London, England,<br />
                N1 0QH
              </address>
            </div>

            {/* Office Hours */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Office Hours
              </h4>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", lineHeight: 2 }}>
                <p>Monday – Friday: 9am – 5pm</p>
                <p>Saturday: Closed</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* CQC Rating card */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 36, marginBottom: 36, display: "flex", justifyContent: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center", maxWidth: 520 }}>
              {/* CQC logo placeholder (uses external widget in production) */}
              <div style={{ background: "#004b8d", borderRadius: 8, padding: "8px 14px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.05em" }}>CQC</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>regulated</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#fff" }}>Reach Healthcare Solutions Limited</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>CQC Overall Rating</p>
                <p style={{ margin: "2px 0 0", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ background: "#3aaa35", color: "#fff", fontWeight: 700, padding: "2px 12px", borderRadius: 20, fontSize: "0.82rem" }}>Good</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>23 June 2022</span>
                </p>
                <a
                  href="https://www.cqc.org.uk/location/1-9829549374"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38b6ff", fontSize: "0.78rem", textDecoration: "none", display: "inline-block", marginTop: 4 }}
                >
                  See the report →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", margin: 0 }}>
              Copyright © 2026 Reach Healthcare Solutions Limited, Registration Number: 11888752
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: 0 }}>
              {[
                { label: "Downloads", href: "/downloads" },
                { label: "Access Webmail", href: "https://webmail.300media.co.uk/" },
                { label: "Website Designed by Care Agency Media", href: "http://careagencymedia.co.uk/" },
              ].map(({ label, href }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>}
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#38b6ff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                    {label}
                  </a>
                </React.Fragment>
              ))}
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: 0 }}>
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms and Conditions", href: "/terms-conditions" },
                { label: "Request Personal Data", href: "/gdpr-request-personal-data" },
              ].map(({ label, href }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>}
                  <a href={href} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#38b6ff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                    {label}
                  </a>
                </React.Fragment>
              ))}
            </p>
          </div>

        </div>
      </section>

    </footer>
  );
}
