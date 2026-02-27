"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

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
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Reach Healthcare Logo"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;

            const baseClasses = "px-4 py-2 rounded-lg font-medium transition";

            const activeClasses =
              "bg-cyan-500 text-white hover:bg-cyan-600";
            const normalClasses =
              "text-gray-800 hover:text-cyan-600";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClasses} ${isActive ? activeClasses : normalClasses}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Social Icons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.facebook.com/Reach-Healthcare-Solutions-174194090977414/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-current"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <a
            href="https://twitter.com/_Reachcare"
            target="_blank"
            rel="noopener noreferrer"
            className="text-current"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/reach-healthcare-solutions/about/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-current"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}