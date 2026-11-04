"use client";

import React from "react";
import Image from "next/image";
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
  yearGroups
}: ArchiveSectionProps) {
  return (
    <section aria-labelledby={`${idPrefix}-heading`} className="w-full pt-10 sm:pt-14">
      {/* Section Header as plain text */}
      <div className="mb-8 text-left">
        <h2
          id={`${idPrefix}-heading`}
          style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
          className="text-[17px] sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-left whitespace-nowrap text-[#1B2A49]"
        >
          {title}
        </h2>
      </div>

      {/* Year Groups List: Fully displayed by default */}
      <div className="space-y-8 w-full">
        {yearGroups.map((group) => (
          <div key={group.year} className="w-full pb-6">
            {/* Simple Year Heading */}
            <h3
              style={group.year > 0 ? YEAR_FONT_STYLE : undefined}
              className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A49] mb-4 text-left"
            >
              {group.year > 0 ? (
                <span style={YEAR_FONT_STYLE} className="about-year">
                  {group.year}
                </span>
              ) : (
                "Undated"
              )}
            </h3>

            {/* Complete Entries List */}
            <ul className="space-y-3 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left w-full">
              {group.entries.map((entry, idx) => (
                <li key={idx} className="flex items-start space-x-3 w-full">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/40 mt-2.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left">
                    {renderWithYearFont(entry.text)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutClient() {
  const soloGroups = groupByYear(soloExhibitions);
  const groupGroups = groupByYear(groupExhibitions);
  const charityGroups = groupByYear(charityEvents);
  const awardGroups = groupByYear(awardsAndRecognitions);
  const campGroups = groupByYear(artCampsAndWorkshops);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-14 text-[#38435C] w-full">
      {/* Screen-reader accessible H1 for SEO */}
      <h1 className="sr-only">About Prakash Bal Joshi</h1>

      {/* 2. CENTRED ARTIST PHOTOGRAPH (Independent wrapper) */}
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

      {/* 3. BIOGRAPHY SECTION: Full width, left-aligned, regular font-weight: 400 */}
      <article aria-labelledby="biography-heading" className="w-full">
        <h2 id="biography-heading" className="sr-only">
          Biography of Prakash Bal Joshi
        </h2>
        <div className="w-full space-y-6 font-serif text-base sm:text-lg text-[#38435C] font-normal leading-relaxed text-left">
          {aboutBiography.map((paragraph, idx) => (
            <p key={idx} className="font-normal text-[#38435C] w-full">
              {renderWithYearFont(paragraph)}
            </p>
          ))}
        </div>
      </article>

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
      <section aria-labelledby="collections-heading" className="w-full pt-10 sm:pt-14">
        <div className="mb-8 text-left">
          <h2
            id="collections-heading"
            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
            className="text-[17px] sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-left whitespace-nowrap text-[#1B2A49]"
          >
            Collections
          </h2>
        </div>

        <ul className="space-y-3 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left w-full">
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
