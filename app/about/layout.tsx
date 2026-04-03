import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Reach Healthcare Solutions",
  description: "Learn about Reach Healthcare Solutions — our mission, values, and commitment to delivering outstanding care and staffing services across the UK.",
  openGraph: { title: "About Us | Reach Healthcare Solutions", description: "Learn about Reach Healthcare Solutions — our mission, values, and commitment to delivering outstanding care and staffing services across the UK.", url: "https://www.reachhealthcaresolutions.co.uk/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
