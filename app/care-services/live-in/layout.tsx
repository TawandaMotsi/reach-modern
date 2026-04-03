import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live-In Care | Reach Healthcare Solutions",
  description: "Round-the-clock live-in care services providing continuous support and companionship in your own home.",
  openGraph: { title: "Live-In Care | Reach Healthcare Solutions", description: "Round-the-clock live-in care services providing continuous support and companionship in your own home.", url: "https://www.reachhealthcaresolutions.co.uk/care-services/live-in" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
