"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  aboutBiography,
  soloExhibitions,
  groupExhibitions,
  charityEvents,
  awardsAndRecognitions,
  collections,
  artCampsAndWorkshops,
  groupByYear,
  YearGroup
} from "./aboutData";

interface ArchiveSectionProps {
  idPrefix: string;
  title: string;
  yearGroups: YearGroup[];
  collapsible?: boolean;
}

const YEAR_FONT_STYLE: React.CSSProperties = {
  fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif',
};

function renderWithYearFont(text: string): React.ReactNode {
  if (!text) return text;
  const yearRegex = /\b(?:19|20)\d{2}(?:[-–—](?:(?:19|20)\d{2}|\d{2}))?\b/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = yearRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedText = match[0];

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(
      <span
        key={matchIndex}
        style={YEAR_FONT_STYLE}
        className="about-year"
      >
        {matchedText}
      </span>
    );

    lastIndex = matchIndex + matchedText.length;
  }

  if (lastIndex === 0) return text;

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function ArchiveSection({
  idPrefix,
  title,
  yearGroups,
  collapsible = true
}: ArchiveSectionProps) {
  const [expandAll, setExpandAll] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const handleToggleAll = () => {
    setExpandAll((prev) => !prev);
    setRenderKey((prev) => prev + 1);
  };

  return (
    <section
      id={idPrefix}
      aria-labelledby={`${idPrefix}-heading`}
      className="w-full pt-10 sm:pt-14 scroll-mt-32 sm:scroll-mt-36 text-left"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3 text-left">
        <h2
          id={`${idPrefix}-heading`}
          style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
          className="text-[17px] sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-left text-[#1B2A49]"
        >
          {title}
        </h2>

        {collapsible && yearGroups.length > 1 && (
          <button
            type="button"
            onClick={handleToggleAll}
            className="text-xs font-heading font-medium text-[#1B2A49] hover:underline cursor-pointer py-1 px-3 rounded-full border border-[#1B2A49]/20 hover:border-[#1B2A49] transition-colors"
            aria-label={expandAll ? `Collapse all years in ${title}` : `Expand all years in ${title}`}
          >
            {expandAll ? "Collapse All Years" : "Expand All Years"}
          </button>
        )}
      </div>

      {/* Year Groups List */}
      <div key={renderKey} className="space-y-4 w-full text-left">
        {yearGroups.map((group, idx) => {
          const isInitialOpen = expandAll || idx === 0;

          return (
            <details
              key={group.year}
              open={isInitialOpen}
              className="group border-b border-[#1B2A49]/15 pb-4 text-left transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] select-none text-left">
                <h3
                  style={group.year > 0 ? YEAR_FONT_STYLE : undefined}
                  className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A49] text-left inline-flex items-baseline gap-2.5"
                >
                  {group.year > 0 ? (
                    <span style={YEAR_FONT_STYLE} className="about-year">
                      {group.year}
                    </span>
                  ) : (
                    "Undated"
                  )}
                  <span className="text-xs font-normal text-[#38435C]/60 font-serif">
                    ({group.entries.length} {group.entries.length === 1 ? "entry" : "entries"})
                  </span>
                </h3>
                <span className="p-1 text-[#1B2A49]/70 group-open:rotate-180 transition-transform duration-200">
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </summary>

              <ul className="mt-3 space-y-3 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left w-full pl-0">
                {group.entries.map((entry, entryIdx) => (
                  <li key={entryIdx} className="flex items-start space-x-3 w-full text-left">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/40 mt-2.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="flex-1 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left">
                      {renderWithYearFont(entry.text)}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </section>
  );
}

const JUMP_SECTIONS = [
  { href: "#solo-exhibitions", label: "Solo Exhibitions" },
  { href: "#group-exhibitions", label: "Group Exhibitions" },
  { href: "#charity-auctions", label: "Charity Events & Auctions" },
  { href: "#awards-recognitions", label: "Awards & Recognitions" },
  { href: "#collections", label: "Collections" },
  { href: "#art-camps", label: "Art Camps & Workshops" },
];

export default function AboutClient() {
  const soloGroups = groupByYear(soloExhibitions);
  const groupGroups = groupByYear(groupExhibitions);
  const charityGroups = groupByYear(charityEvents);
  const awardGroups = groupByYear(awardsAndRecognitions);
  const campGroups = groupByYear(artCampsAndWorkshops);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-14 text-[#38435C] w-full text-left">
      {/* Screen-reader accessible H1 for SEO */}
      <h1 className="sr-only">About Prakash Bal Joshi</h1>

      {/* 1. CENTRED ARTIST PHOTOGRAPH (Preserved placement & proportion) */}
      <figure className="w-full flex flex-col items-center justify-center mb-10 sm:mb-14">
        <div className="relative max-w-[400px] w-full flex flex-col items-center">
          <div className="w-full flex justify-center">
            <Image
              src="/artworks/artist-portrait.jpg"
              alt="Prakash Bal Joshi"
              width={414}
              height={414}
              priority
              unoptimized
              className="w-auto h-auto max-w-full max-h-[500px] object-contain rounded-sm shadow-[0_4px_24px_rgba(27,42,73,0.06)]"
              sizes="(max-width: 640px) 90vw, 400px"
            />
          </div>
        </div>
      </figure>

      {/* 2. BIOGRAPHY SECTION: Structured with subheadings and comfortable spacing */}
      <article aria-labelledby="biography-heading" className="w-full text-left">
        <h2 id="biography-heading" className="sr-only">
          Biography of Prakash Bal Joshi
        </h2>

        <div className="w-full space-y-8 font-serif text-base sm:text-lg text-[#38435C] font-normal leading-relaxed text-left">
          {/* Subheading 1: Artistic Practice & Nature */}
          <div>
            <h3
              style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
              className="text-lg sm:text-xl font-bold text-[#1B2A49] tracking-tight mb-3 text-left"
            >
              Artistic Practice &amp; Natural Themes
            </h3>
            <div className="space-y-4 text-left">
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[0])}
              </p>
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[1])}
              </p>
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[2])}
              </p>
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[3])}
              </p>
            </div>
          </div>

          {/* Subheading 2: Journalism & Political Commentary */}
          <div>
            <h3
              style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
              className="text-lg sm:text-xl font-bold text-[#1B2A49] tracking-tight mb-3 text-left"
            >
              Journalism &amp; Political Commentary
            </h3>
            <p className="font-normal text-[#38435C] w-full">
              {renderWithYearFont(aboutBiography[4])}
            </p>
          </div>

          {/* Subheading 3: Marathi Literature & Fiction */}
          <div>
            <h3
              style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
              className="text-lg sm:text-xl font-bold text-[#1B2A49] tracking-tight mb-3 text-left"
            >
              Marathi Literature &amp; Fiction
            </h3>
            <p className="font-normal text-[#38435C] w-full">
              Writing in Marathi, Joshi brings a similar attentiveness to the complexities of everyday life, exploring strained relationships, changing values and women’s empowerment among middle-class communities in rural and urban India. His fifteen-story collection,{" "}
              <Link
                href="/media?tab=books"
                className="underline text-[#1B2A49] hover:text-[#253961] font-medium"
                title="View in Media Books"
              >
                Mirror in the Hall and Other Stories
              </Link>{" "}
              (Ratna Books), translated by Smita Karandikar from the Marathi <em>Arsa Baithakitalaa Aani Itar Katha</em>, examines these concerns through intimate human narratives, each accompanied by an author sketch. His other books include{" "}
              <Link
                href="/media?tab=books"
                className="underline text-[#1B2A49] hover:text-[#253961] font-medium"
                title="View in Media Books"
              >
                Maitrinichi Goshta
              </Link>
              , a collection of short stories, and{" "}
              <Link
                href="/media?tab=books"
                className="underline text-[#1B2A49] hover:text-[#253961] font-medium"
                title="View in Media Books"
              >
                Gateway
              </Link>
              , a sketch-illustrated portrait of urban life in Mumbai.
            </p>

            {/* Featured Reviewer Quote */}
            <blockquote className="my-6 border-l-2 border-[#1B2A49] pl-4 sm:pl-6 py-1 italic text-[#1B2A49] font-serif text-lg sm:text-xl leading-relaxed bg-[#1B2A49]/[0.02]">
              <p className="mb-2">
                &ldquo;Prakash is a versatile genius who also happens to be a painter.&rdquo;
              </p>
              <footer className="text-sm not-italic text-[#38435C] font-normal">
                &mdash; Sumit Paul,{" "}
                <a
                  href="https://www.freepressjournal.in/book-reviews/holding-a-mirror-to-the-readers-selves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1B2A49] inline-flex items-center gap-1 font-medium"
                >
                  <span>Free Press Journal</span>
                  <ExternalLink size={12} className="inline opacity-70" />
                </a>
              </footer>
            </blockquote>
          </div>

          {/* Subheading 4: Creative Vision & Roles */}
          <div>
            <h3
              style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
              className="text-lg sm:text-xl font-bold text-[#1B2A49] tracking-tight mb-3 text-left"
            >
              Creative Vision &amp; Current Roles
            </h3>
            <div className="space-y-4 text-left">
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[7])}
              </p>
              <p className="font-normal text-[#38435C] w-full">
                {renderWithYearFont(aboutBiography[8])}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 3. SECTION JUMP MENU */}
      <nav
        aria-label="About page section navigation"
        className="my-10 sm:my-14 py-4 px-4 sm:px-6 bg-white/70 border border-[#1B2A49]/15 rounded-sm shadow-2xs w-full text-left"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 mb-3 border-b border-[#1B2A49]/10">
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49]">
            Archive Navigation
          </span>
          <span className="text-xs text-[#38435C]/70 font-serif italic">
            Jump directly to section
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {JUMP_SECTIONS.map((sec) => (
            <a
              key={sec.href}
              href={sec.href}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-heading font-medium tracking-wide text-[#1B2A49] bg-[#E9ECEF] hover:bg-[#1B2A49] hover:text-[#E9ECEF] transition-colors"
            >
              {sec.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 4. SOLO EXHIBITIONS */}
      <ArchiveSection
        idPrefix="solo-exhibitions"
        title="Solo Exhibitions"
        yearGroups={soloGroups}
      />

      {/* 5. GROUP EXHIBITIONS */}
      <ArchiveSection
        idPrefix="group-exhibitions"
        title="Group Exhibitions"
        yearGroups={groupGroups}
      />

      {/* 6. CHARITY EVENTS AND AUCTIONS */}
      <ArchiveSection
        idPrefix="charity-auctions"
        title="Charity Events &amp; Auctions"
        yearGroups={charityGroups}
      />

      {/* 7. AWARDS AND RECOGNITIONS */}
      <ArchiveSection
        idPrefix="awards-recognitions"
        title="Awards &amp; Recognitions"
        yearGroups={awardGroups}
      />

      {/* 8. COLLECTIONS */}
      <section
        id="collections"
        aria-labelledby="collections-heading"
        className="w-full pt-10 sm:pt-14 scroll-mt-32 sm:scroll-mt-36 text-left"
      >
        <div className="mb-6 text-left">
          <h2
            id="collections-heading"
            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
            className="text-[17px] sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-left whitespace-nowrap text-[#1B2A49]"
          >
            Collections
          </h2>
        </div>

        <ul className="space-y-3 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left w-full pl-0">
          {collections.map((col, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-3 w-full text-left"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/40 mt-2.5 shrink-0" aria-hidden="true" />
              <span className="flex-1 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left">
                {renderWithYearFont(col)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. ART CAMPS AND WORKSHOPS */}
      <ArchiveSection
        idPrefix="art-camps"
        title="Art Camps &amp; Workshops"
        yearGroups={campGroups}
      />
    </div>
  );
}
