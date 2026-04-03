import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Staffing | Reach Healthcare Solutions",
  description: "Reliable healthcare staffing solutions for NHS trusts, private hospitals, and care homes. We supply qualified nurses, HCAs, and support workers.",
  openGraph: { title: "Healthcare Staffing | Reach Healthcare Solutions", description: "Reliable healthcare staffing solutions for NHS trusts, private hospitals, and care homes.", url: "https://www.www.reach-healthcare.com/staffing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
