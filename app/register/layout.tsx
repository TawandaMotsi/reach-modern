import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Reach Healthcare Solutions",
  description: "Register with Reach Healthcare Solutions to access care services or begin your journey as a healthcare professional with us.",
  openGraph: { title: "Register | Reach Healthcare Solutions", description: "Register with Reach Healthcare Solutions to access care services or begin your journey as a healthcare professional with us.", url: "https://www.reachhealthcaresolutions.co.uk/register" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
