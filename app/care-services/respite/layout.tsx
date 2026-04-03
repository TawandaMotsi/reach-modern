import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Respite Care | Reach Healthcare Solutions",
  description: "Short-term respite care services giving family carers a well-deserved break while ensuring your loved one receives quality care.",
  openGraph: { title: "Respite Care | Reach Healthcare Solutions", description: "Short-term respite care services giving family carers a well-deserved break while ensuring your loved one receives quality care.", url: "https://www.www.reach-healthcare.com/care-services/respite" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
