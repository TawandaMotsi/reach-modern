# Reach Healthcare Solutions — Architecture & Workflow

## Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Inline styles + Tailwind CSS v4
- **Email:** Nodemailer (GoDaddy/300media SMTP)
- **Hosting:** Vercel (free tier)
- **Domain:** reach-healthcare.com (DNS managed via 300media)
- **Repo:** GitHub → auto-deploys to Vercel on push to `main`

---

## Deployment Flow

```
Local code change
      ↓
git push → GitHub (main branch)
      ↓
Vercel detects push → builds automatically
      ↓
Live at reach-healthcare.com
```

---

## DNS Wiring (300media → Vercel)

| Type  | Name  | Value                                  |
|-------|-------|----------------------------------------|
| A     | @     | *Vercel A record IP*                   |
| A     | *     | *Vercel A record IP*                   |
| CNAME | www   | *Vercel CNAME value*                   |

> Get the exact values from Vercel → Project Settings → Domains.

Traffic hits Vercel's servers, not 300media's WordPress hosting.

---

## Project Structure

```
app/
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout (wraps all pages, includes Chatbot)
├── globals.css               # Global styles
├── about/page.tsx
├── care-services/
│   ├── page.tsx              # Care services overview
│   ├── domicillary/page.tsx
│   ├── live-in/page.tsx
│   ├── respite/page.tsx
│   ├── end-of-life/page.tsx
│   ├── hospital/page.tsx
│   ├── supported/page.tsx
│   ├── specialist/page.tsx
│   └── children/page.tsx
├── staffing/page.tsx
├── work-for-us/page.tsx
├── contact/page.tsx
├── register/page.tsx
├── application/page.tsx
├── applicationform/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Chatbot.tsx           # Floating chatbot widget
├── api/
│   ├── chat/route.ts         # Chatbot API (keyword matching)
│   └── submit-application/route.ts  # Sends application email
└── lib/
    ├── knowledgeBase.ts      # Static data for chatbot responses
    └── utils.ts              # getImagePath helper
```

---

## Application Form Flow

```
User fills /applicationform
      ↓
POST /api/submit-application
      ↓
Nodemailer → SMTP (smtp.reach-healthcare.com)
      ↓
Email delivered to EMAIL_TO address
```

### Required Environment Variables (set in Vercel dashboard)

| Variable         | Description                        |
|------------------|------------------------------------|
| `EMAIL_HOST`     | `smtp.reach-healthcare.com`        |
| `EMAIL_USER`     | Sending email address              |
| `EMAIL_PASSWORD` | Email account password             |
| `EMAIL_TO`       | Recipient for application emails   |

---

## Chatbot Flow

```
User types message in Chatbot widget
      ↓
POST /api/chat  { message: "..." }
      ↓
findAnswer() — keyword matching against knowledgeBase.ts
      ↓
Returns plain text response (no LLM)
```

---

## To Roll Back to WordPress

1. In 300media DNS, change A records back to the original 300media IP
2. Delete the `www` CNAME pointing to Vercel
3. WordPress site resumes within 30 mins
