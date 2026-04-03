import { Metadata } from "next";

export const metadata: Metadata = {
  title: "End of Life Care | Reach Healthcare Solutions",
  description: "Compassionate end-of-life care services providing dignity, comfort, and support for individuals and their families during the most difficult times.",
  openGraph: { title: "End of Life Care | Reach Healthcare Solutions", description: "Compassionate end-of-life care services providing dignity, comfort, and support for individuals and their families.", url: "https://www.reachhealthcaresolutions.co.uk/care-services/end-of-life" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
