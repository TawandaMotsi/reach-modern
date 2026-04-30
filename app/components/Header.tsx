"use client";

import Link from "next/link";
import Image from "next/image";
import { getImagePath } from "../lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/care-services", label: "Care Services" },
    { href: "/staffing", label: "Staffing Services" },
    { href: "/work-for-us", label: "Work For Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/register", label: "Register" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        <Link href="/" className="flex items-center">
          <Image src={getImagePath("/logo.png")} alt="Reach Healthcare Logo" width={80} height={80} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`px-4 py-2 rounded-lg font-medium transition ${isActive ? "bg-cyan-500 text-white hover:bg-cyan-600" : "text-gray-800 hover:text-cyan-600"}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/" target="_blank" rel="noopener noreferrer" className="text-current">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>

          <a href="https://www.linkedin.com/company/reach-healthcare-solutions/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-current">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="https://www.instagram.com/reachhcs" target="_blank" rel="noopener noreferrer" className="text-current">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.523.99 4.088 4.088 0 0 1 .99 1.524c.163.46.349 1.26.403 2.43.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.99 1.523 4.088 4.088 0 0 1-1.524.99c-.46.163-1.26.349-2.43.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.523-.99 4.088 4.088 0 0 1-.99-1.524c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 0 1 .99-1.523A4.088 4.088 0 0 1 5.15 2.636c.46-.163 1.26-.349 2.43-.403C8.845 2.175 9.225 2.163 12 2.163M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.882 5.882 0 0 0-2.126 1.384A5.882 5.882 0 0 0 .63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.913a5.882 5.882 0 0 0 1.384 2.126A5.882 5.882 0 0 0 4.14 23.37c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.913-.558a5.882 5.882 0 0 0 2.126-1.384 5.882 5.882 0 0 0 1.384-2.126c.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.913a5.882 5.882 0 0 0-1.384-2.126A5.882 5.882 0 0 0 19.86.63c-.763-.297-1.636-.5-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-800" aria-label="Toggle menu">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden bg-white border-t shadow-lg">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block px-6 py-3 font-medium border-b ${isActive ? "bg-cyan-500 text-white" : "text-gray-800 hover:bg-gray-50"}`}>
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-6 px-6 py-4">
            <a href="https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/" target="_blank" rel="noopener noreferrer" className="text-gray-800">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>

            <a href="https://www.linkedin.com/company/reach-healthcare-solutions/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-800">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="https://www.instagram.com/reachhcs" target="_blank" rel="noopener noreferrer" className="text-gray-800">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.523.99 4.088 4.088 0 0 1 .99 1.524c.163.46.349 1.26.403 2.43.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.99 1.523 4.088 4.088 0 0 1-1.524.99c-.46.163-1.26.349-2.43.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.523-.99 4.088 4.088 0 0 1-.99-1.524c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 0 1 .99-1.523A4.088 4.088 0 0 1 5.15 2.636c.46-.163 1.26-.349 2.43-.403C8.845 2.175 9.225 2.163 12 2.163M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.882 5.882 0 0 0-2.126 1.384A5.882 5.882 0 0 0 .63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.913a5.882 5.882 0 0 0 1.384 2.126A5.882 5.882 0 0 0 4.14 23.37c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.913-.558a5.882 5.882 0 0 0 2.126-1.384 5.882 5.882 0 0 0 1.384-2.126c.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.913a5.882 5.882 0 0 0-1.384-2.126A5.882 5.882 0 0 0 19.86.63c-.763-.297-1.636-.5-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}