import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "./components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reach Healthcare Solutions | Quality Care & Staffing Services",
  description: "Professional healthcare staffing and home care services. We provide nurses, care assistants, and support workers for children, young people, and adults.",
  openGraph: {
    title: "Reach Healthcare Solutions | Quality Care & Staffing Services",
    description: "Professional healthcare staffing and home care services. We provide nurses, care assistants, and support workers for children, young people, and adults.",
    url: "https://www.reach-healthcare.com",
    siteName: "Reach Healthcare Solutions",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
