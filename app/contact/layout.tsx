import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Reach Healthcare Solutions",
  description: "Get in touch with Reach Healthcare Solutions. Our friendly team is available to help with care enquiries, staffing needs, and general questions.",
  openGraph: { title: "Contact Us | Reach Healthcare Solutions", description: "Get in touch with Reach Healthcare Solutions. Our friendly team is available to help with care enquiries and staffing needs.", url: "https://www.reachhealthcaresolutions.co.uk/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
