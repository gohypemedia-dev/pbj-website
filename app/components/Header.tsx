"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { artistData } from "@/data/artist";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/works", label: "Works" },
    { href: "/about", label: "About" },
    { href: "/exhibitions", label: "Exhibitions" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className={`${pathname === "/" ? "home-header" : ""} sticky top-0 z-40 bg-[#E9ECEF]/95 backdrop-blur-sm border-b border-[#1B2A49]/10 transition-colors`}>
      <div className="header-inner max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Artist Wordmark */}
        <Link
          href="/"
          className="header-brand group inline-flex items-center gap-3 sm:gap-4 text-left focus-visible:ring-1 focus-visible:ring-[#1B2A49]"
          aria-label={`${artistData.name} - Home`}
        >
          <span className="brand-monogram" aria-hidden="true">
            {Array.from("PBJ").map((letter) => <span key={letter} data-brand-letter>{letter}</span>)}
          </span>
          <span className="header-brand-copy flex flex-col">
          <span className="artist-wordmark text-[#1B2A49] transition-opacity group-hover:opacity-80">
            {artistData.diacriticName}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-[#38435C]/80 font-sans">
            Mumbai &middot; Contemporary Abstraction
          </span>
          </span>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav
          className="header-navigation hidden md:flex items-center space-x-8 lg:space-x-12"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm uppercase tracking-[0.15em] transition-colors py-1 relative ${
                  isActive
                    ? "text-[#1B2A49] font-bold"
                    : "text-[#38435C] hover:text-[#1B2A49]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#1B2A49]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1B2A49] hover:bg-[#1B2A49]/5 rounded focus:outline-none focus:ring-2 focus:ring-[#1B2A49]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-20 z-50 bg-[#E9ECEF] px-8 py-12 flex flex-col justify-between md:hidden border-t border-[#1B2A49]/10 animate-in fade-in duration-200"
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-2xl uppercase tracking-[0.12em] border-b border-[#1B2A49]/10 pb-4 flex items-center justify-between ${
                    isActive ? "text-[#1B2A49] font-bold" : "text-[#38435C]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-xs uppercase tracking-widest text-[#1B2A49]">
                      Current
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#1B2A49]/15">
            <p className="eyebrow-label mb-2">Studio Enquiries</p>
            <p className="font-serif text-lg text-[#1B2A49]">
              {artistData.contact.email}
            </p>
            <p className="text-sm text-[#38435C] mt-1">
              Mumbai, India &middot; Studio visits by prior appointment
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
