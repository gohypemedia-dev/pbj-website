"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body & document scroll when mobile menu is open, handle focus
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Focus close button on open
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu and restores focus to hamburger button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Automatically close mobile menu if resized to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/works", label: "Works", description: "Selected Paintings & Series" },
    { href: "/about", label: "About", description: "Biography & Philosophy" },
    { href: "/exhibitions", label: "Exhibitions", description: "Venice, Basel, Mumbai" },
    { href: "/contact", label: "Contact", description: "Studio Visits & Inquiries" }
  ];

  return (
    <>
      <header
        className={`${
          pathname === "/" ? "home-header" : ""
        } sticky top-0 z-40 bg-[#E9ECEF]/95 backdrop-blur-sm border-b border-[#1B2A49]/10 transition-colors`}
      >
        <div className="header-inner max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-12 h-16 sm:h-18 lg:h-20 flex items-center justify-between flex-nowrap">
          {/* Left: Artist Wordmark */}
          <Link
            href="/"
            className="header-brand group inline-flex items-center text-left focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:outline-none rounded-xs flex-shrink min-w-0"
            aria-label={`${artistData.name} - Home`}
          >
            <span className="artist-wordmark text-[#1B2A49] transition-opacity group-hover:opacity-80 truncate font-display font-bold">
              {artistData.diacriticName}
            </span>
          </Link>

          {/* Right: Desktop Navigation (hidden below 1024px) */}
          <nav
            className="header-navigation hidden lg:flex items-center space-x-7 xl:space-x-10"
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

          {/* Mobile/Tablet Menu Button (visible below 1024px, min 44x44px touch area) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-sm text-[#1B2A49] hover:bg-[#1B2A49]/10 active:bg-[#1B2A49]/15 transition-colors focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:outline-none flex-shrink-0 ml-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop Overlay (outside header to avoid stacking context issues) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="mobile-drawer-backdrop fixed inset-0 bg-[#1B2A49]/35 backdrop-blur-xs"
            onClick={() => {
              setMobileMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            data-lenis-prevent
            className="mobile-drawer-panel fixed top-0 right-0 bottom-0 w-full max-w-[340px] sm:max-w-[380px] bg-[#E9ECEF] shadow-xl flex flex-col justify-between border-l border-[#1B2A49]/10 overflow-hidden"
          >
            {/* Drawer Top Bar */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-[#1B2A49]/10 flex-shrink-0 bg-[#E9ECEF]">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#1B2A49]/80 font-semibold">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="min-w-[44px] min-h-[44px] w-11 h-11 -mr-2 flex items-center justify-center rounded-sm text-[#1B2A49] hover:bg-[#1B2A49]/8 active:bg-[#1B2A49]/12 transition-colors focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:outline-none"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between space-y-10">
              {/* Natural editorial navigation links */}
              <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation Links">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between py-2 transition-all ${
                        isActive
                          ? "text-[#1B2A49] font-medium"
                          : "text-[#38435C]/85 hover:text-[#1B2A49]"
                      }`}
                    >
                      <span className="font-serif text-2xl sm:text-3xl tracking-[0.02em] flex items-center gap-3">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A49]" aria-hidden="true" />
                        )}
                        <span>{link.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-heading uppercase tracking-widest text-[#1B2A49]">
                          Current
                        </span>
                      )}
                    </Link>
                  );
                })}

                <div className="pt-4">
                  <Link
                    href="/works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.18em] text-[#1B2A49] hover:opacity-70 transition-opacity py-2 border-b border-[#1B2A49]/30"
                  >
                    <span>View all paintings</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </nav>

              {/* Studio Colophon Details */}
              <div className="pt-8 border-t border-[#1B2A49]/10 space-y-2">
                <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-[#1B2A49]/70 font-semibold">
                  Studio &amp; Archive
                </p>
                <a
                  href={`mailto:${artistData.contact.email}`}
                  className="font-serif text-base text-[#1B2A49] hover:underline block truncate"
                >
                  {artistData.contact.email}
                </a>
                <p className="text-xs text-[#38435C]/75 font-serif leading-relaxed">
                  Mumbai, India &middot; Studio visits by prior appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
