import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Care | Reach Healthcare Solutions",
  description: "Dedicated hospital and clinical care staffing solutions. We supply experienced nurses and healthcare assistants to hospitals and NHS trusts.",
  openGraph: { title: "Hospital Care | Reach Healthcare Solutions", description: "Dedicated hospital and clinical care staffing solutions. We supply experienced nurses and healthcare assistants to hospitals and NHS trusts.", url: "https://www.www.reach-healthcare.com/care-services/hospital" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
