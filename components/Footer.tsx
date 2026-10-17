"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { artistData } from "@/data/artist";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-20 border-t border-[#1B2A49]/12 bg-[#E9ECEF] text-[#38435C] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Wordmark & Statement (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-[0.1em] text-[#1B2A49]">
              {artistData.diacriticName}
            </h2>
            <p className="font-body text-sm leading-relaxed text-[#38435C] max-w-sm">
              Contemporary Indian abstract expressionism rooted in the fluid
              metaphor of rivers, memory, and spontaneous consciousness.
            </p>
            <p className="text-xs uppercase tracking-wider text-[#1B2A49]/70 pt-1 font-heading">
              Studio &middot; Mumbai, India
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="eyebrow-label text-[#1B2A49] mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 font-heading text-xs uppercase tracking-wider">
              <li>
                <Link
                  href="/works"
                  className="gallery-link hover:text-[#1B2A49]"
                >
                  Selected Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="gallery-link hover:text-[#1B2A49]"
                >
                  About the Artist
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitions"
                  className="gallery-link hover:text-[#1B2A49]"
                >
                  Exhibition History
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="gallery-link hover:text-[#1B2A49]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Enquiries (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="eyebrow-label text-[#1B2A49] mb-3">
              Studio Enquiries
            </h3>
            <p className="font-body text-sm text-[#38435C] leading-relaxed">
              For acquisitions, curatorial collaborations, and appointments:
            </p>
            <a
              href={`mailto:${artistData.contact.email}`}
              className="inline-block font-heading text-sm font-semibold text-[#1B2A49] underline decoration-[#1B2A49]/30 underline-offset-4 hover:decoration-[#1B2A49] transition-all"
            >
              {artistData.contact.email}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1B2A49]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#38435C]/75 gap-3">
          <p>
            &copy; {currentYear} {artistData.name}. All artwork copyrights reserved by the artist.
          </p>
          <p className="text-[11px] text-[#38435C]/60">
            Portfolio &middot; Editorial Design
          </p>
        </div>
      </div>
    </footer>
  );
}
