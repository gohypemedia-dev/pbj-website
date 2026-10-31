import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { exhibitionsData } from "@/data/exhibitions";
import { artistData } from "@/data/artist";
import { Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: `Events & Exhibitions | ${artistData.diacriticName}`,
  description:
    "Chronological archive of solo exhibitions, museum selections, biennial presentations, and gallery events by Prakash Bal Joshi.",
};

export default function EventsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Header */}
      <div className="mb-8 pb-5 flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="eyebrow-label text-[#1B2A49] block text-center sm:text-left">
          Curatorial History &amp; Events
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5 text-center sm:text-left">
          Events &amp; Exhibitions
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-1.5 max-w-2xl leading-relaxed mx-auto sm:mx-0 text-center sm:text-left">
          A documented record of verified solo presentations, museum selections, gallery events, and international biennial collateral exhibitions.
        </p>
      </div>

      {/* Chronological Event / Exhibition Records */}
      <div>
        {exhibitionsData.map((exh) => (
          <article
            key={exh.id}
            className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-start group hover:bg-white/20 px-4 -mx-4 rounded-sm transition-colors text-center md:text-left"
          >
            {/* Col 1: Year & Exhibition Type (3 cols) */}
            <div className="md:col-span-3 space-y-1.5 flex flex-col items-center md:items-start">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#1B2A49] block">
                {exh.year}
              </span>
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-[0.14em] text-[#38435C]/80">
                {exh.type}
              </span>
            </div>

            {/* Col 2: Title, Venue & Location (4 cols) */}
            <div className="md:col-span-4 space-y-1.5 flex flex-col items-center md:items-start">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B2A49] leading-snug">
                {exh.title}
              </h2>
              <p className="font-serif italic text-base text-[#38435C]/90">
                {exh.venue}
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-1.5 text-xs text-[#38435C]/80 font-body">
                <MapPin size={13} className="text-[#1B2A49]" />
                <span>
                  {exh.city}, {exh.country}
                </span>
              </div>
              {exh.dates && (
                <div className="flex items-center justify-center md:justify-start space-x-1.5 text-xs text-[#38435C]/70 font-body">
                  <Calendar size={13} className="text-[#1B2A49]" />
                  <span>{exh.dates}</span>
                </div>
              )}
            </div>

            {/* Col 3: Curatorial Narrative & Notes (5 cols) */}
            <div className="md:col-span-5 space-y-2 font-body text-base text-[#38435C] leading-relaxed max-w-[65ch] mx-auto md:mx-0 text-center md:text-left">
              <p>{exh.description}</p>
              {exh.curatorialHighlight && (
                <p className="text-xs font-serif text-[#1B2A49] italic border-l-0 md:border-l-2 border-[#1B2A49]/30 pt-2 md:pt-0 pl-0 md:pl-3 text-center md:text-left">
                  {exh.curatorialHighlight}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Inquiries Footer Callout */}
      <div className="mt-10 p-6 sm:p-7 bg-white/30 border border-[#1B2A49]/10 rounded-sm flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(27,42,73,0.03)] text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-serif text-xl font-medium text-[#1B2A49]">
            Archival &amp; Curatorial Research
          </h3>
          <p className="font-body text-base text-[#38435C] mt-1 max-w-[60ch]">
            Complete catalogs, past exhibition press folios, and loan agreements are available upon request for accredited museum curators.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center shrink-0 w-full sm:w-auto"
        >
          Contact Studio
        </Link>
      </div>
    </div>
  );
}
