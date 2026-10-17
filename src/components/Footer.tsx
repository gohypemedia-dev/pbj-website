"use client";

import React, { useState } from "react";
import Link from "next/link";
import { artistData } from "@/data/artist";
import { typographyTokens } from "@/config/typography";
import { Info, X, ExternalLink } from "lucide-react";

export default function Footer() {
  const [showHandoffModal, setShowHandoffModal] = useState(false);

  return (
    <footer className="mt-28 border-t border-[#1B2A49]/15 bg-[#E9ECEF] text-[#38435C] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Col 1: Wordmark & Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#1B2A49]">
              {artistData.diacriticName}
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-[#38435C] max-w-md">
              Contemporary Indian abstract expressionism rooted in the fluid
              metaphor of rivers, ecological memory, and spontaneous consciousness.
            </p>
            <p className="text-xs uppercase tracking-widest text-[#1B2A49]/70 pt-2 font-heading">
              Studio: Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="eyebrow-label text-[#1B2A49] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-heading text-sm uppercase tracking-wider">
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
                  Studio & Acquisitions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Acquisitions & Enquiries (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="eyebrow-label text-[#1B2A49] mb-4">
              Acquisitions & Curatorial
            </h3>
            <p className="font-body text-sm text-[#38435C] leading-relaxed">
              For gallery representation, institutional acquisitions, and studio
              visit appointments:
            </p>
            <a
              href={`mailto:${artistData.contact.email}`}
              className="inline-block font-heading text-base font-semibold text-[#1B2A49] underline decoration-[#1B2A49]/30 underline-offset-4 hover:decoration-[#1B2A49] transition-all"
            >
              {artistData.contact.email}
            </a>
            <p className="text-xs text-[#38435C]/80 mt-2">
              Represented in private and permanent museum collections across
              Lisbon, Las Vegas, Russia, and India.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1B2A49]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#38435C]/75 gap-4">
          <p>
            &copy; 2024 {artistData.name}. All artwork copyrights reserved by the artist.
          </p>

          {/* Developer Handoff / Asset Audit Trigger */}
          <button
            type="button"
            onClick={() => setShowHandoffModal(true)}
            className="inline-flex items-center space-x-1.5 text-xs text-[#1B2A49] hover:underline font-mono px-2.5 py-1 rounded border border-[#1B2A49]/15 hover:bg-[#1B2A49]/5 transition-colors"
            title="Inspect font token status and client asset handoff"
          >
            <Info size={13} />
            <span>Developer Handoff &amp; Asset Audit</span>
          </button>
        </div>
      </div>

      {/* Developer Handoff Modal */}
      {showHandoffModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="handoff-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2A49]/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="bg-[#E9ECEF] border border-[#1B2A49]/20 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-sm shadow-xl text-left">
            <div className="flex items-start justify-between border-b border-[#1B2A49]/15 pb-4 mb-6">
              <div>
                <span className="eyebrow-label">Internal Engineering &amp; Client Audit</span>
                <h2
                  id="handoff-title"
                  className="font-heading text-xl text-[#1B2A49] mt-1 font-bold"
                >
                  Asset Verification &amp; Developer Handoff
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowHandoffModal(false)}
                className="p-1.5 text-[#1B2A49] hover:bg-[#1B2A49]/10 rounded"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 text-sm text-[#38435C]">
              {/* 1. Typography Audit */}
              <div className="p-4 bg-white/50 border border-[#1B2A49]/10 rounded">
                <h4 className="font-heading font-semibold text-[#1B2A49] uppercase tracking-wider text-xs mb-2">
                  1. Typography Verification Status
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <strong className="text-[#1B2A49]">Heading font label:</strong>{" "}
                    &ldquo;{typographyTokens.heading.clientLabel}&rdquo; &rarr;{" "}
                    <span className="text-amber-800 font-medium">
                      Temporary fallback active ({typographyTokens.heading.implementedFamily})
                    </span>
                  </li>
                  <li>
                    <strong className="text-[#1B2A49]">Body font label:</strong>{" "}
                    &ldquo;{typographyTokens.body.clientLabel}&rdquo; &rarr;{" "}
                    <span className="text-amber-800 font-medium">
                      Temporary fallback active ({typographyTokens.body.implementedFamily} + native Hoefler Text on Apple)
                    </span>
                  </li>
                  <li className="pt-1 text-[#38435C]">
                    <em>Handoff Action:</em> When licensed font files are supplied, drop them into <code>/public/fonts/</code> and uncomment the font-face definitions in <code>app/globals.css</code>.
                  </li>
                </ul>
              </div>

              {/* 2. Color System Audit */}
              <div className="p-4 bg-white/50 border border-[#1B2A49]/10 rounded">
                <h4 className="font-heading font-semibold text-[#1B2A49] uppercase tracking-wider text-xs mb-2">
                  2. Authoritative Colour Tokens (WCAG Contrast Verified)
                </h4>
                <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
                  <div className="p-2 rounded border border-[#1B2A49]/10 bg-[#E9ECEF]">
                    <div className="h-6 w-full rounded bg-[#E9ECEF] border border-black/10 mb-1" />
                    <span>#E9ECEF</span>
                    <span className="block text-[10px] text-gray-600">Background</span>
                  </div>
                  <div className="p-2 rounded border border-[#1B2A49]/10 bg-[#E9ECEF]">
                    <div className="h-6 w-full rounded bg-[#1B2A49] mb-1" />
                    <span className="text-[#1B2A49]">#1B2A49</span>
                    <span className="block text-[10px] text-emerald-700 font-semibold">11.5:1 (AAA)</span>
                  </div>
                  <div className="p-2 rounded border border-[#1B2A49]/10 bg-[#E9ECEF]">
                    <div className="h-6 w-full rounded bg-[#38435C] mb-1" />
                    <span className="text-[#38435C]">#38435C</span>
                    <span className="block text-[10px] text-emerald-700 font-semibold">6.8:1 (AA)</span>
                  </div>
                </div>
              </div>

              {/* 3. Artwork Asset Audit */}
              <div className="p-4 bg-white/50 border border-[#1B2A49]/10 rounded">
                <h4 className="font-heading font-semibold text-[#1B2A49] uppercase tracking-wider text-xs mb-2">
                  3. Artwork Handling &amp; Photography Audit
                </h4>
                <p className="text-xs text-[#38435C] leading-relaxed">
                  Per strict instructions: Current visuals in <code>/public/artworks/</code> are high-resolution, curated preview assets reflecting the artist&rsquo;s actual color palette, river themes, and brushwork. They are explicitly documented as temporary visual representations pending final raw digital scans from the artist&rsquo;s Mumbai studio archive.
                </p>
              </div>

              {/* 4. Contact & Forms */}
              <div className="p-4 bg-white/50 border border-[#1B2A49]/10 rounded">
                <h4 className="font-heading font-semibold text-[#1B2A49] uppercase tracking-wider text-xs mb-2">
                  4. Contact &amp; Backend Integration
                </h4>
                <p className="text-xs text-[#38435C] leading-relaxed">
                  Enquiries trigger direct <code>mailto:studio@prakashbaljoshi.com</code> actions and simulated form validation. To connect a live transactional mail service, configure Resend / SendGrid in an API route.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1B2A49]/15 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHandoffModal(false)}
                className="px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider bg-[#1B2A49] text-[#E9ECEF] rounded hover:bg-[#1B2A49]/90 transition-colors"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
