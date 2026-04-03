import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Services | Reach Healthcare Solutions",
  description: "Specialist home care services including domiciliary, live-in, respite, end-of-life, hospital, and children's care across the UK.",
  openGraph: { title: "Care Services | Reach Healthcare Solutions", description: "Specialist home care services including domiciliary, live-in, respite, end-of-life, hospital, and children's care across the UK.", url: "https://www.www.reach-healthcare.com/care-services" },
};

export default function CareServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
