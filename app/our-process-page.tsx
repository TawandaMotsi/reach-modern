"use client";

export default function OurProcessPage() {
  const steps = [
    {
      num: "1",
      title: "Call us",
      desc: "In confidence and with no obligation to discuss your needs and concerns.",
    },
    {
      num: "2",
      title: "Free assessment",
      desc: "A detailed telephone assessment will be carried out, and where possible a home visit, to discuss yours or your loved ones' requirements.",
    },
    {
      num: "3",
      title: "Begin care",
      desc: "Reach Healthcare Solutions will match you with the best carer to meet your needs for the exact hours you need.",
    },
    {
      num: "4",
      title: "Ongoing support",
      desc: "The Reach Healthcare Solutions team is always here for you to help with any advice or help you require.",
    },
  ];

  const capabilities = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Medication Reminders",
      desc: "Timely prompts to take medication, drink water, and other daily wellness needs.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <path d="M13 4v8l3 3M9 4v8l-3 3M12 21v-2M12 3v1"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      ),
      title: "Staying Active",
      desc: "Supporting to keep you healthy, from a simple walk to specific exercises as directed by your health care plan.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      ),
      title: "Meal Prep and Groceries",
      desc: "From shopping for groceries to planning and preparing healthy meals you'll love.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v3h-7V8zM5 17v2M19 17v2"/>
        </svg>
      ),
      title: "Transportation",
      desc: "Wherever you are going, a carer can accompany you as is appropriate.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: "Light Housekeeping",
      desc: "Doing dishes or laundry, taking out the trash, plus seasonal projects and organising.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <path d="M7 2v11a5 5 0 005 5 5 5 0 005-5V2"/><line x1="12" y1="2" x2="12" y2="12"/>
        </svg>
      ),
      title: "Personal Care and Hygiene",
      desc: "Assistance with dressing, bathing, or toileting. Always respectful and professional.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: "Companionship",
      desc: "Doing activities, building friendships, fellowship or just talking.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Check-in Visits",
      desc: "A skilled care advisor can be there in as little as 2 hours to check in on you or a loved one.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;500;700&display=swap');

        :root {
          --primary: #0170B9;
          --primary-dark: #1e73be;
          --teal: #00b1ca;
          --btn-gray: #7e817f;
          --text: #707070;
          --max-w: 1200px;
        }

        .op-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .op-page { font-family: 'Lato', sans-serif; color: var(--text); background: #fafafa; }

        /* ── HEADER ── */
        .op-header {
          position: sticky; top: 0; z-index: 100;
          background: #fff; border-bottom: 1px solid #dbdee0;
          padding: 10px 35px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .op-logo img { width: 110px; height: auto; }
        .op-nav { display: flex; gap: 28px; list-style: none; }
        .op-nav a {
          font-family: 'Lato', sans-serif; font-size: 15px;
          color: var(--text); text-decoration: none;
          padding: 6px 0; white-space: nowrap; transition: color 0.2s;
        }
        .op-nav a:hover, .op-nav a.active { color: var(--primary-dark); }
        .op-social { display: flex; gap: 10px; }
        .op-social a {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--primary); color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; font-size: 14px; transition: opacity 0.2s;
        }
        .op-social a:hover { opacity: 0.8; }

        /* ── HERO ── */
        .op-hero {
          background: linear-gradient(135deg, #0170B9 0%, #024f84 100%);
          padding: 80px 35px; text-align: center;
        }
        .op-hero h1 {
          font-family: 'Roboto', sans-serif; font-weight: 700;
          font-size: 38px; color: #fff; max-width: 800px;
          margin: 0 auto; line-height: 1.4;
          font-style: italic;
        }

        /* ── STEPS ── */
        .op-steps-section { background: #fff; padding: 60px 35px; }
        .op-steps-inner { max-width: var(--max-w); margin: 0 auto; }
        .op-steps-header { text-align: center; margin-bottom: 48px; }
        .op-steps-header h2 {
          font-family: 'Roboto', sans-serif; font-size: 32px; font-weight: 400;
          color: var(--text); margin-bottom: 14px;
        }
        .op-steps-header p { font-size: 17px; color: var(--text); line-height: 1.6; }
        .op-steps-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
        }
        .op-step {
          background: #f5f5f5; border-radius: 8px; padding: 28px 20px;
        }
        .op-step h3 {
          font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 400;
          color: var(--teal); margin-bottom: 12px;
        }
        .op-step p { font-size: 15px; line-height: 1.65; }

        /* ── CAPABILITIES ── */
        .op-caps-section {
          background: #f0f8ff; padding: 60px 35px;
        }
        .op-caps-inner { max-width: var(--max-w); margin: 0 auto; }
        .op-caps-header { text-align: center; margin-bottom: 48px; }
        .op-caps-header h2 {
          font-family: 'Roboto', sans-serif; font-size: 32px; font-weight: 400;
          color: var(--text); margin-bottom: 14px;
        }
        .op-caps-header p { font-size: 17px; line-height: 1.6; max-width: 720px; margin: 0 auto; }
        .op-caps-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
        }
        .op-cap-card {
          background: #fff; border-radius: 8px; padding: 28px 20px;
          text-align: center; transition: box-shadow 0.2s;
        }
        .op-cap-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .op-icon-circle {
          width: 68px; height: 68px; border-radius: 50%;
          background: var(--primary); color: #fff;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .op-cap-card h3 {
          font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 700;
          color: var(--text); margin-bottom: 10px;
        }
        .op-cap-card p { font-size: 14px; line-height: 1.65; }

        /* ── CTA BANNER ── */
        .op-cta {
          background: linear-gradient(135deg, #0170B9 0%, #024f84 100%);
          padding: 60px 35px; text-align: center;
        }
        .op-cta h3 {
          font-family: 'Roboto', sans-serif; font-size: 22px; font-weight: 400;
          color: rgba(255,255,255,0.9); margin-bottom: 16px; max-width: 680px; margin-left: auto; margin-right: auto;
        }
        .op-cta h2 {
          font-family: 'Roboto', sans-serif; font-size: 32px; font-weight: 500;
          color: #fff; margin-bottom: 28px;
        }
        .op-btn {
          display: inline-block;
          background: var(--btn-gray); color: #fff;
          padding: 15px 40px; border-radius: 50px;
          font-size: 16px; text-decoration: none;
          transition: opacity 0.2s;
        }
        .op-btn:hover { opacity: 0.85; }

        /* ── FOOTER ── */
        .op-footer { background: #111; padding: 48px 35px 24px; }
        .op-footer-top {
          max-width: var(--max-w); margin: 0 auto;
          display: flex; justify-content: center; gap: 16px; margin-bottom: 36px;
        }
        .op-footer-top a {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--primary); color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: opacity 0.2s;
        }
        .op-footer-top a:hover { opacity: 0.8; }
        .op-footer-grid {
          max-width: var(--max-w); margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
          padding-bottom: 32px; border-bottom: 1px solid #333;
        }
        .op-footer-grid img { width: 90px; height: auto; margin-bottom: 12px; }
        .op-footer-grid h3 { font-size: 16px; color: #fff; margin-bottom: 12px; }
        .op-footer-grid p, .op-footer-grid a {
          font-size: 14px; color: #aaa; text-decoration: none; line-height: 1.8;
        }
        .op-footer-grid a:hover { color: #fff; }
        .op-footer-bottom {
          max-width: var(--max-w); margin: 24px auto 0;
          text-align: center; font-size: 13px; color: #888; line-height: 2;
        }
        .op-footer-bottom a { color: #aaa; text-decoration: none; }
        .op-footer-bottom a:hover { color: #fff; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .op-steps-grid { grid-template-columns: repeat(2, 1fr); }
          .op-caps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .op-header { padding: 12px 20px; }
          .op-nav { display: none; }
          .op-hero h1 { font-size: 24px; }
          .op-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .op-steps-grid { grid-template-columns: 1fr; }
          .op-caps-grid { grid-template-columns: 1fr 1fr; }
          .op-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="op-page">

        {/* HEADER */}
        <header className="op-header">
          <div className="op-logo">
            <a href="/">
              <img
                src="https://reach-healthcare.com/wp-content/uploads/2019/12/Reach_Healthcare_Logo_Regular-165x141.png"
                alt="Reach Healthcare Solutions"
              />
            </a>
          </div>
          <nav>
            <ul className="op-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us/">About us</a></li>
              <li><a href="/care-services/" className="active">Care Services</a></li>
              <li><a href="/staffing/">Staffing Services</a></li>
              <li><a href="/work-for-us/">Work for us</a></li>
              <li><a href="/contact-us/">Contact Us</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </nav>
          <div className="op-social">
            <a href="https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/" target="_blank" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://twitter.com/_Reachcare" target="_blank" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/reach-healthcare-solutions/" target="_blank" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="op-hero">
          <h1>"Amazing, skilled care professionals are ready to help right when you need them".</h1>
        </section>

        {/* STEPS */}
        <section className="op-steps-section">
          <div className="op-steps-inner">
            <div className="op-steps-header">
              <h2>The Steps We Follow</h2>
              <p>
                The pathway below highlights the key stages that Reach Healthcare Solutions follow in order to
                provide you with a truly bespoke and high-quality care service.
              </p>
            </div>
            <div className="op-steps-grid">
              {steps.map((s) => (
                <div className="op-step" key={s.num}>
                  <h3>{s.num}. {s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="op-caps-section">
          <div className="op-caps-inner">
            <div className="op-caps-header">
              <h2>Reach Healthcare Solutions Can Help</h2>
              <p>
                At Reach Healthcare Solutions, we select the best, skilled carers in advance, so they are ready
                to provide the care you want, right when you need it.
              </p>
            </div>
            <div className="op-caps-grid">
              {capabilities.map((c) => (
                <div className="op-cap-card" key={c.title}>
                  <div className="op-icon-circle">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="op-cta">
          <h3>We are committed to providing care which we would like to receive ourselves</h3>
          <h2>Call us on 0203 441 5474</h2>
          <a href="/find-care" className="op-btn">Request A Visit</a>
        </section>

        {/* FOOTER */}
        <footer className="op-footer">
          <div className="op-footer-top">
            <a href="https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/" target="_blank" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://twitter.com/_Reachcare" target="_blank" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/reach-healthcare-solutions/" target="_blank" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <div className="op-footer-grid">
            <div>
              <img
                src="https://reach-healthcare.com/wp-content/uploads/2019/12/Reach_Healthcare_Logo_Mono-300x256.png"
                alt="Reach Healthcare"
              />
            </div>
            <div>
              <h3>Contact Information</h3>
              <p>T: 0203 441 5474<br />E: infor@reach-healthcare.com<br />E: recruitment@reach-healthcare.com</p>
            </div>
            <div>
              <h3>Office Address</h3>
              <p>Design Centre Suite 145A,<br />52 Upper Street, Islington,<br />London, England, N1 0QH</p>
            </div>
            <div>
              <h3>Office Hours</h3>
              <p>Monday – Friday 9am–5pm<br />Saturday: Closed<br />Sunday: Closed</p>
            </div>
          </div>
          <div className="op-footer-bottom">
            <p>Copyright © 2026 Reach Healthcare Solutions Limited, Registration Number: 11888752</p>
            <p>
              <a href="/downloads/">Downloads</a> | <a href="/privacy-policy/">Privacy Policy</a> |{" "}
              <a href="/terms-conditions/">Terms and Conditions</a> |{" "}
              <a href="/gdpr-request-personal-data/">Request Personal Data</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
