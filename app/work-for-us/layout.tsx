import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work For Us | Reach Healthcare Solutions",
  description: "Join the Reach Healthcare Solutions team. We're looking for passionate nurses, care assistants, and support workers across the UK.",
  openGraph: { title: "Work For Us | Reach Healthcare Solutions", description: "Join the Reach Healthcare Solutions team. We're looking for passionate nurses, care assistants, and support workers across the UK.", url: "https://www.reachhealthcaresolutions.co.uk/work-for-us" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
