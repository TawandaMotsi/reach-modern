import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Children & Young People Care | Reach Healthcare Solutions",
  description: "Specialist care and support services for children and young people with medical, emotional, and complex healthcare needs.",
  openGraph: { title: "Children & Young People Care | Reach Healthcare Solutions", description: "Specialist care and support services for children and young people with medical, emotional, and complex healthcare needs.", url: "https://www.www.reach-healthcare.com/care-services/children" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
