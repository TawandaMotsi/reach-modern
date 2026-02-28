import { NextResponse } from "next/server";
import { knowledgeBase } from "@/app/lib/knowledgeBase";

function findAnswer(message: string): string {
  const lower = message.toLowerCase();

  // Contact information
  if (lower.includes("phone") || lower.includes("call") || lower.includes("number")) {
    return `You can call us 24/7 at ${knowledgeBase.company.phone}. Our office hours are ${knowledgeBase.company.hours}.`;
  }
  if (lower.includes("email") || lower.includes("mail")) {
    return `Email us at ${knowledgeBase.company.email} for general inquiries or ${knowledgeBase.company.recruitmentEmail} for recruitment.`;
  }
  if (lower.includes("address") || lower.includes("location") || lower.includes("where")) {
    return `We're located at ${knowledgeBase.company.address}. We provide services across the whole of the UK.`;
  }
  if (lower.includes("contact") || lower.includes("reach")) {
    return `Contact us:\n📞 ${knowledgeBase.company.phone} (24/7)\n📧 ${knowledgeBase.company.email}\n📍 ${knowledgeBase.company.address}`;
  }

  // Care services
  if (lower.includes("children") || lower.includes("young people")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Children"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("domiciliary") || lower.includes("home care") || lower.includes("daily")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Domiciliary"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("live-in") || lower.includes("live in")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Live-in"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("hospital")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Hospital"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("respite")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Respite"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("end of life") || lower.includes("palliative")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("End of Life"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("supported living")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Supported"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("specialist")) {
    const service = knowledgeBase.careServices.find(s => s.name.includes("Specialist"));
    return `${service?.name}: ${service?.description}`;
  }
  if (lower.includes("service") || lower.includes("care")) {
    return `We offer 8 care services:\n${knowledgeBase.careServices.map(s => `• ${s.name}`).join("\n")}\n\nWhich would you like to know more about?`;
  }

  // Employment
  if (lower.includes("work") || lower.includes("job") || lower.includes("career") || lower.includes("employ") || lower.includes("recruit")) {
    return `Join our team! Benefits:\n${knowledgeBase.employment.benefits.slice(0, 4).map(b => `• ${b}`).join("\n")}\n\nApplication process: ${knowledgeBase.employment.process.map(p => p).join(" → ")}\n\nCall ${knowledgeBase.company.phone} or visit our Work For Us page.`;
  }
  if (lower.includes("pay") || lower.includes("salary") || lower.includes("wage")) {
    return `We offer some of the best pay rates in the region, paid weekly to your bank. Competitive rates for all positions. Contact us for specific rates.`;
  }
  if (lower.includes("benefit")) {
    return `Employment benefits:\n${knowledgeBase.employment.benefits.map(b => `• ${b}`).join("\n")}`;
  }
  if (lower.includes("apply") || lower.includes("register")) {
    return `To apply: ${knowledgeBase.employment.process.map(p => p).join("\n")}\n\nRegister online at our website or call ${knowledgeBase.company.phone}.`;
  }

  // Staffing
  if (lower.includes("staff") || lower.includes("nurse") || lower.includes("carer")) {
    return `We provide qualified staff including:\n${knowledgeBase.staffing.roles.slice(0, 6).map(r => `• ${r}`).join("\n")}\n\nAll staff undergo rigorous vetting and training. Available 24/7.`;
  }
  if (lower.includes("specialty") || lower.includes("speciality") || lower.includes("condition")) {
    return `Our staff specialize in:\n${knowledgeBase.staffing.specialties.slice(0, 5).map(s => `• ${s}`).join("\n")}\n...and more. Contact us for specific needs.`;
  }

  // About
  if (lower.includes("about") || lower.includes("who are you") || lower.includes("company")) {
    return `${knowledgeBase.about.mission}\n\nWe have ${knowledgeBase.about.experience}\n\nBased in ${knowledgeBase.company.address.split(",")[0]}, serving the whole UK.`;
  }
  if (lower.includes("experience") || lower.includes("qualified")) {
    return knowledgeBase.about.experience;
  }

  // Assessment
  if (lower.includes("assessment") || lower.includes("evaluate") || lower.includes("consultation")) {
    return `We offer FREE, no-obligation care assessments. A member of our team will visit you to understand your needs and preferences. Call ${knowledgeBase.company.phone} to book.`;
  }

  // Pricing
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("charge")) {
    return `Our pricing is tailored to your specific care needs. We offer competitive rates and flexible payment options. Contact us for a free assessment and personalized quote at ${knowledgeBase.company.phone}.`;
  }

  // Hours
  if (lower.includes("hour") || lower.includes("open") || lower.includes("available")) {
    return `We provide 24/7 care services. Office hours: ${knowledgeBase.company.hours}. Call ${knowledgeBase.company.phone} anytime.`;
  }

  // Default
  return `I can help you with:\n• Care services (domiciliary, live-in, respite, etc.)\n• Employment opportunities\n• Staffing services\n• Contact information\n• Booking assessments\n\nWhat would you like to know? Or call us at ${knowledgeBase.company.phone}.`;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = findAnswer(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
