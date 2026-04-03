import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function getKnowledge(): string {
  return readFileSync(join(process.cwd(), "public/knowledge.md"), "utf-8");
}

function findAnswer(message: string): string {
  const lower = message.toLowerCase();
  const kb = getKnowledge();

  // Extract a relevant section from the markdown by heading
  const sectionMap: { keywords: string[]; heading: string }[] = [
    { keywords: ["phone", "call", "number", "email", "address", "location", "contact", "where"], heading: "## Company Overview" },
    { keywords: ["children", "young people"], heading: "### Children & Young People" },
    { keywords: ["domiciliary", "home care", "daily"], heading: "### Domiciliary Care" },
    { keywords: ["live-in", "live in"], heading: "### Live-In Care" },
    { keywords: ["hospital"], heading: "### Hospital to Home" },
    { keywords: ["respite"], heading: "### Respite Care" },
    { keywords: ["end of life", "palliative"], heading: "### End of Life Care" },
    { keywords: ["supported living"], heading: "### Supported Living" },
    { keywords: ["specialist"], heading: "### Specialist Care" },
    { keywords: ["service", "care"], heading: "## Care Services" },
    { keywords: ["staff", "nurse", "carer", "roles", "specialty"], heading: "## Staffing Services" },
    { keywords: ["work", "job", "career", "employ", "recruit", "apply", "benefit", "pay", "salary"], heading: "## Working With Us" },
    { keywords: ["about", "who", "company", "mission", "experience"], heading: "## About Us" },
    { keywords: ["promise", "objective", "standard", "cqc"], heading: "## Our Promises" },
    { keywords: ["faq", "question", "cost", "price", "fee", "dbs", "check", "area", "cover", "quick", "urgent", "hour", "open", "available", "assessment", "book"], heading: "## Frequently Asked Questions" },
  ];

  for (const { keywords, heading } of sectionMap) {
    if (keywords.some(k => lower.includes(k))) {
      const section = extractSection(kb, heading);
      if (section) return section;
    }
  }

  return `I can help with:\n• Care services\n• Staffing\n• Employment opportunities\n• Contact information\n• Booking a free assessment\n\nWhat would you like to know? Or call us at 0203 441 5474.`;
}

function extractSection(md: string, heading: string): string {
  const lines = md.split("\n");
  const start = lines.findIndex(l => l.startsWith(heading));
  if (start === -1) return "";

  const headingLevel = heading.match(/^#+/)?.[0].length ?? 2;
  const end = lines.findIndex((l, i) => i > start && l.match(/^#{1,${headingLevel}}\s/));

  const section = lines.slice(start, end === -1 ? undefined : end).join("\n").trim();
  // Strip markdown formatting for plain chat display
  return section
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/- /g, "• ")
    .trim();
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = findAnswer(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
