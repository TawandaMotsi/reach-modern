import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now | Reach Healthcare Solutions",
  description: "Start your application to join Reach Healthcare Solutions as a nurse, care assistant, or support worker.",
  openGraph: { title: "Apply Now | Reach Healthcare Solutions", description: "Start your application to join Reach Healthcare Solutions as a nurse, care assistant, or support worker.", url: "https://www.reachhealthcaresolutions.co.uk/application" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
