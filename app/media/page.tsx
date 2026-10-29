import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import { exhibitionsData } from "@/data/exhibitions";
import { ArrowLeft, Calendar, MapPin, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Media & Events | ${artistData.diacriticName}`,
  description:
    "Press coverage, newspaper features, critical reviews, and chronological exhibition history of Prakash Bal Joshi.",
};

const pressArticles = [
  {
    publication: "European Cultural Centre / Venice Biennale Collateral",
    year: "2019",
    title: "Personal Structures: The Flow of Memory and Water",
    quote:
      "“Prakash Bal Joshi’s canvases evoke the timeless journey of rivers—transforming ecological grief into contemplative luminous spaces.”",
    author: "Venice Biennale Contemporary Review",
  },
  {
    publication: "The Times of India",
    year: "2021",
    title: "From Newsprint to Canvas: The Contemplative Journey of Prakash Bal Joshi",
    quote:
      "“A master of spontaneous abstraction who views painting as an extension of lifelong social inquiry and spiritual quietude.”",
    author: "Culture & Arts Desk",
  },
  {
    publication: "Lisbon Art Chronicle",
    year: "2023",
    title: "Rivers of the Subcontinent: Flowing Memories at Colorida Art Gallery",
    quote:
      "“Joshi’s palette carries a rare authenticity—fluid glazes that mirror the ancient currents of the Saraswati and Ganges.”",
    author: "Helena Ribeiro",
  },
  {
    publication: "Seba Contemporary Archive, Turkey",
    year: "2022",
    title: "Unseen Currents: Asian Abstract Expressionism on the Aegean Coast",
    quote:
      "“Bold, intuitive brushwork that transcends geographical boundaries to touch universal human memory.”",
    author: "Curatorial Review",
  },
  {
    publication: "The Hindu",
    year: "2018",
    title: "Water As An Archival Medium",
    quote:
      "“A poignant visual meditation on climate reality, rivers, and the fragility of our urban water systems.”",
    author: "Arts & Culture Feature",
  },
];

export default function MediaPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Header */}
      <header className="mb-10 pb-6 flex flex-col items-center sm:items-start text-center sm:text-left border-b border-[#1B2A49]/10">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3 mx-auto sm:mx-0 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block text-center sm:text-left">
          Press Coverage, Exhibitions &amp; Archival Records
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5 text-center sm:text-left">
          Media
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-2 max-w-2xl leading-relaxed mx-auto sm:mx-0 text-center sm:text-left">
          Documented reviews, newspaper features, curatorial events, and international exhibition history of Prakash Bal Joshi.
        </p>

        {/* Section Quick Jump Links */}
        <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <a
            href="#newspaper-features"
            className="inline-flex items-center px-4 py-2 border border-[#1B2A49]/20 bg-white/60 hover:bg-white text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            <span>Newspaper Features</span>
          </a>
          <a
            href="#events"
            className="inline-flex items-center px-4 py-2 border border-[#1B2A49]/20 bg-white/60 hover:bg-white text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            <span>Events &amp; Exhibitions</span>
          </a>
          <a
            href="#media-resources"
            className="inline-flex items-center px-4 py-2 border border-[#1B2A49]/20 bg-white/60 hover:bg-white text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            <span>Press Kit &amp; Inquiries</span>
          </a>
        </div>
      </header>

      {/* 1. SECTION: Newspaper Features */}
      <section
        id="newspaper-features"
        aria-label="Newspaper Features"
        className="scroll-mt-24 mb-16"
      >
        <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="eyebrow-label text-[#1B2A49] block">
            Press Coverage &amp; Critical Reception
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1B2A49] mt-1">
            Newspaper Features
          </h2>
          <p className="font-body text-base text-[#38435C] mt-1.5 max-w-2xl leading-relaxed">
            Selected press features, critical essays, and reviews from major publications documenting Joshi&rsquo;s painting practice and exhibitions.
          </p>
        </div>

        <div className="divide-y divide-[#1B2A49]/10">
          {pressArticles.map((article) => (
            <article
              key={article.title}
              className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-start hover:bg-white/20 px-4 -mx-4 rounded-sm transition-colors text-center md:text-left"
            >
              <div className="md:col-span-3 space-y-1 flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading text-xs uppercase tracking-widest text-[#1B2A49]/80 font-semibold block">
                  {article.publication}
                </span>
                <span className="font-serif italic text-sm text-[#38435C]/80 block">
                  {article.year}
                </span>
              </div>
              <div className="md:col-span-9 space-y-2.5 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#1B2A49] leading-snug">
                  {article.title}
                </h3>
                <blockquote className="font-body text-base text-[#38435C] italic leading-relaxed md:border-l-2 border-[#1B2A49]/30 py-2 md:py-0.5 md:pl-4 text-center md:text-left">
                  {article.quote}
                </blockquote>
                <p className="text-xs font-heading uppercase tracking-wider text-[#38435C]/70">
                  — {article.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. SECTION: Events */}
      <section
        id="events"
        aria-label="Events and Exhibitions"
        className="scroll-mt-24 mb-16 pt-10 border-t border-[#1B2A49]/10"
      >
        <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="eyebrow-label text-[#1B2A49] block">
            Curatorial History &amp; Events
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1B2A49] mt-1">
            Events
          </h2>
          <p className="font-body text-base text-[#38435C] mt-1.5 max-w-2xl leading-relaxed">
            Chronological archive of verified solo presentations, museum selections, international biennial collateral exhibitions, and gallery events.
          </p>
        </div>

        <div className="divide-y divide-[#1B2A49]/10">
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
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B2A49] leading-snug">
                  {exh.title}
                </h3>
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
      </section>

      {/* 3. SECTION: Media Resources & Inquiries */}
      <section
        id="media-resources"
        aria-label="Media Resources and Press Kit"
        className="scroll-mt-24 pt-10 border-t border-[#1B2A49]/10"
      >
        <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="eyebrow-label text-[#1B2A49] block">
            Communications &amp; Archival Inquiries
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] mt-1">
            Media Resources &amp; Curatorial Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Press Kit */}
          <div className="p-6 sm:p-7 bg-white/40 border border-[#1B2A49]/10 rounded-sm space-y-3 flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-heading uppercase tracking-widest text-[#1B2A49] font-semibold block">
                Media Resources
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1B2A49]">
                Press Kit &amp; Assets
              </h3>
              <p className="font-body text-sm text-[#38435C] leading-relaxed">
                High-resolution artist portraits, selected artwork transparency files for publications, and artist CV are available upon verified request.
              </p>
            </div>
            <div className="pt-2 w-full flex justify-center sm:justify-start">
              <a
                href={`mailto:${artistData.contact.email}?subject=Press%20Kit%20Request%20-%20Prakash%20Bal%20Joshi`}
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-[#1B2A49] hover:opacity-75 transition-opacity font-semibold"
              >
                <Mail size={14} />
                <span>Request Press Kit</span>
              </a>
            </div>
          </div>

          {/* Card 2: Interviews */}
          <div className="p-6 sm:p-7 bg-white/40 border border-[#1B2A49]/10 rounded-sm space-y-3 flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-heading uppercase tracking-widest text-[#1B2A49] font-semibold block">
                Journalist &amp; Critic Inquiries
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1B2A49]">
                Interviews &amp; Media Requests
              </h3>
              <p className="font-body text-sm text-[#38435C] leading-relaxed">
                For press interviews, feature rights, studio photo sessions, or exhibition catalog reproduction permissions, contact studio communications.
              </p>
            </div>
            <div className="pt-2 w-full flex justify-center sm:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-widest text-[#1B2A49] hover:opacity-75 transition-opacity font-semibold"
              >
                <span>Contact Studio</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 3: Curatorial & Loan Requests */}
          <div className="p-6 sm:p-7 bg-white/40 border border-[#1B2A49]/10 rounded-sm space-y-3 flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-heading uppercase tracking-widest text-[#1B2A49] font-semibold block">
                Archival Inquiries
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1B2A49]">
                Curatorial Research &amp; Loans
              </h3>
              <p className="font-body text-sm text-[#38435C] leading-relaxed">
                Complete catalogs, past exhibition press folios, and institutional loan agreements are available for accredited museum curators and researchers.
              </p>
            </div>
            <div className="pt-2 w-full flex justify-center sm:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-widest text-[#1B2A49] hover:opacity-75 transition-opacity font-semibold"
              >
                <span>Curatorial Inquiries</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
