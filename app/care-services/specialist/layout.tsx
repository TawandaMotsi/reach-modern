import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specialist Care | Reach Healthcare Solutions",
  description: "Specialist care services for individuals with complex health needs, including neurological conditions, physical disabilities, and mental health support.",
  openGraph: { title: "Specialist Care | Reach Healthcare Solutions", description: "Specialist care services for individuals with complex health needs, including neurological conditions and physical disabilities.", url: "https://www.reachhealthcaresolutions.co.uk/care-services/specialist" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
