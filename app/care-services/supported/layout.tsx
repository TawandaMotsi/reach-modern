import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supported Living | Reach Healthcare Solutions",
  description: "Supported living services helping individuals with learning disabilities, mental health needs, and physical disabilities live independently.",
  openGraph: { title: "Supported Living | Reach Healthcare Solutions", description: "Supported living services helping individuals with learning disabilities, mental health needs, and physical disabilities live independently.", url: "https://www.www.reach-healthcare.com/care-services/supported" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
