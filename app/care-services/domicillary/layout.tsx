import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domiciliary Care | Reach Healthcare Solutions",
  description: "Professional domiciliary care services delivered in the comfort of your own home. Tailored support for daily living, personal care, and medication management.",
  openGraph: { title: "Domiciliary Care | Reach Healthcare Solutions", description: "Professional domiciliary care services delivered in the comfort of your own home.", url: "https://www.reachhealthcaresolutions.co.uk/care-services/domicillary" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
