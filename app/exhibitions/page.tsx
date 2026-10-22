import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { exhibitionsData } from "@/data/exhibitions";
import { artistData } from "@/data/artist";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Exhibitions | ${artistData.diacriticName}`,
  description:
    "Chronological archive of verified solo and museum exhibitions by Prakash Bal Joshi across Venice, Basel, Lisbon, Las Vegas, Izmir, and Mumbai."
};

export default function ExhibitionsPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Header */}
      <div className="mb-8 pb-5">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block">
          Curatorial History &amp; Museum Records
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5">
          Exhibition History
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-1.5 max-w-2xl leading-relaxed">
          A documented record of verified solo presentations, museum selections, and international biennial collateral exhibitions from 2006 to the present.
        </p>
      </div>

      {/* Chronological Exhibition Records */}
      <div className="divide-y divide-[#1B2A49]/15">
        {exhibitionsData.map((exh) => (
          <article
            key={exh.id}
            className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-start group hover:bg-white/20 px-4 -mx-4 rounded-sm transition-colors"
          >
            {/* Col 1: Year & Exhibition Type (3 cols) */}
            <div className="md:col-span-3 space-y-1.5">
              <span className="font-display text-4xl sm:text-5xl font-bold text-[#1B2A49] block">
                {exh.year}
              </span>
              <span className="inline-block text-xs font-heading font-semibold uppercase tracking-[0.14em] text-[#38435C]/80">
                {exh.type}
              </span>
            </div>

            {/* Col 2: Title, Venue & Location (4 cols) */}
            <div className="md:col-span-4 space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B2A49] leading-snug">
                {exh.title}
              </h2>
              <p className="font-serif italic text-base text-[#38435C]/90">
                {exh.venue}
              </p>
              <div className="flex items-center space-x-1.5 text-xs text-[#38435C]/80 font-body">
                <MapPin size={13} className="text-[#1B2A49]" />
                <span>
                  {exh.city}, {exh.country}
                </span>
              </div>
              {exh.dates && (
                <div className="flex items-center space-x-1.5 text-xs text-[#38435C]/70 font-body">
                  <Calendar size={13} className="text-[#1B2A49]" />
                  <span>{exh.dates}</span>
                </div>
              )}
            </div>

            {/* Col 3: Curatorial Narrative & Notes (5 cols) */}
            <div className="md:col-span-5 space-y-2 font-body text-base text-[#38435C] leading-relaxed max-w-[65ch]">
              <p>{exh.description}</p>
              {exh.curatorialHighlight && (
                <p className="text-xs font-serif text-[#1B2A49] italic border-l-2 border-[#1B2A49]/30 pl-3">
                  {exh.curatorialHighlight}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Inquiries Footer Callout */}
      <div className="mt-10 p-6 sm:p-7 bg-white/30 border border-[#1B2A49]/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(27,42,73,0.03)]">
        <div>
          <h3 className="font-serif text-xl font-medium text-[#1B2A49]">
            Archival &amp; Curatorial Research
          </h3>
          <p className="font-body text-base text-[#38435C] mt-1 max-w-[60ch]">
            Complete catalogs, past exhibition press folios, and loan agreements are available upon request for accredited museum curators.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center shrink-0"
        >
          Contact Studio
        </Link>
      </div>
    </div>
  );
}
