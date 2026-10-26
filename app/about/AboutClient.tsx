"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, Landmark, Award, Calendar, Sparkles, HeartHandshake, Tent } from "lucide-react";
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

interface ExpandableSectionProps {
  idPrefix: string;
  title: string;
  icon?: React.ReactNode;
  yearGroups: YearGroup[];
  totalCount: number;
  initiallyExpandedYears?: number[];
  unitLabel?: string;
}

function ExpandableYearSection({
  idPrefix,
  title,
  icon,
  yearGroups,
  totalCount,
  initiallyExpandedYears = [],
  unitLabel = "exhibitions"
}: ExpandableSectionProps) {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(
    () => new Set(initiallyExpandedYears)
  );

  const allYears = yearGroups.map((g) => g.year);
  const isAllExpanded = allYears.every((yr) => expandedYears.has(yr));

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedYears(new Set());
    } else {
      setExpandedYears(new Set(allYears));
    }
  };

  return (
    <section aria-labelledby={`${idPrefix}-heading`} className="pt-10 sm:pt-14 border-t border-[#1B2A49]/15">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6">
        <div className="flex items-center space-x-2.5 text-[#1B2A49]">
          {icon}
          <h2 id={`${idPrefix}-heading`} className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#38435C]/70">
            ({totalCount})
          </span>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-heading font-semibold uppercase tracking-widest text-[#1B2A49] hover:underline self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] rounded-xs px-1 py-0.5"
          aria-label={isAllExpanded ? `Collapse all years in ${title}` : `Expand all years in ${title}`}
        >
          {isAllExpanded ? "Collapse All Years" : "Expand All Years"}
        </button>
      </div>

      {/* Year Groups List */}
      <div className="divide-y divide-[#1B2A49]/12">
        {yearGroups.map((group) => {
          const isOpen = expandedYears.has(group.year);
          const panelId = `${idPrefix}-panel-${group.year}`;
          const btnId = `${idPrefix}-btn-${group.year}`;

          return (
            <div key={group.year} className="py-3 sm:py-4">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleYear(group.year)}
                className="w-full flex items-center justify-between text-left py-2 px-1 hover:bg-[#1B2A49]/5 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49]"
              >
                <div className="flex items-baseline space-x-4">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A49]">
                    {group.year > 0 ? group.year : "Undated"}
                  </span>
                  <span className="font-body text-xs text-[#38435C]/75 uppercase tracking-wider">
                    {group.entries.length} {group.entries.length === 1 ? unitLabel.replace(/s$/, "") : unitLabel}
                  </span>
                </div>

                <div className="text-[#1B2A49]/70 flex items-center space-x-1">
                  <span className="text-xs uppercase tracking-widest font-heading font-medium hidden sm:inline">
                    {isOpen ? "Hide" : "View"}
                  </span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isOpen && (
                <div id={panelId} role="region" aria-labelledby={btnId} className="pt-2 pb-3 pl-2 sm:pl-4">
                  <ul className="space-y-3 font-serif text-base text-[#38435C] leading-relaxed">
                    {group.entries.map((entry, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/40 mt-2.5 shrink-0" aria-hidden="true" />
                        <span className="flex-1">{entry.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-14 text-[#38435C]">
      {/* Top Breadcrumb & Heading */}
      <div className="mb-10 pb-6 border-b border-[#1B2A49]/12 flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3 mx-auto sm:mx-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] rounded-xs"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block text-center sm:text-left">
          Curatorial Biography &amp; Practice
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B2A49] mt-1.5 text-center sm:text-left">
          About Prakash Bal Joshi
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-[#38435C] mt-2 text-center sm:text-left mx-auto sm:mx-0">
          Visual Artist, Journalist &amp; Marathi Writer
        </p>
      </div>

      {/* 1. BIOGRAPHY SECTION */}
      <article aria-labelledby="biography-heading" className="space-y-6">
        <h2 id="biography-heading" className="sr-only">
          Biography of Prakash Bal Joshi
        </h2>

        {/* Introductory Row: Photograph beside Opening Paragraphs on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Artist Photograph (5 cols desktop, full width mobile) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[3/4] w-full max-w-[440px] mx-auto lg:max-w-none overflow-hidden rounded-sm bg-[#1B2A49]/5 shadow-[0_4px_24px_rgba(27,42,73,0.06)]">
              <Image
                src="/artworks/artist-portrait.jpg"
                alt="Prakash Bal Joshi in his studio · Mumbai"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs text-[#38435C]/75 font-body text-center lg:text-left">
              Prakash Bal Joshi in his studio &middot; Mumbai
            </p>
          </div>

          {/* Opening Biography Paragraphs (7 cols desktop) */}
          <div className="lg:col-span-7 space-y-5 font-serif text-base sm:text-lg text-[#38435C] leading-relaxed">
            <p className="text-lg sm:text-xl text-[#1B2A49] font-medium leading-relaxed">
              {aboutBiography[0]}
            </p>
            <p>{aboutBiography[1]}</p>
            <p>{aboutBiography[2]}</p>
            <p>{aboutBiography[3]}</p>
          </div>
        </div>

        {/* Continuing Biography Paragraphs: Flowing naturally below introductory portrait area */}
        <div className="pt-2 max-w-4xl space-y-5 font-serif text-base sm:text-lg text-[#38435C] leading-relaxed">
          <p>{aboutBiography[4]}</p>
          <p>{aboutBiography[5]}</p>
          <p className="italic text-[#1B2A49] font-medium border-l-2 border-[#1B2A49]/35 pl-4 my-4">
            {aboutBiography[6]}
          </p>
          <p>{aboutBiography[7]}</p>
          <p className="text-[#1B2A49] font-medium">{aboutBiography[8]}</p>
        </div>
      </article>

      {/* 2. SOLO EXHIBITIONS (11 entries) */}
      <ExpandableYearSection
        idPrefix="solo-exhibitions"
        title="Solo Exhibitions"
        icon={<Sparkles size={20} />}
        yearGroups={soloGroups}
        totalCount={soloExhibitions.length}
        initiallyExpandedYears={[2024, 2017]}
        unitLabel="exhibitions"
      />

      {/* 3. GROUP EXHIBITIONS (85 entries) */}
      <ExpandableYearSection
        idPrefix="group-exhibitions"
        title="Group Exhibitions"
        icon={<Calendar size={20} />}
        yearGroups={groupGroups}
        totalCount={groupExhibitions.length}
        initiallyExpandedYears={[2025, 2024]}
        unitLabel="exhibitions"
      />

      {/* 4. CHARITY EVENTS AND AUCTIONS (4 entries) */}
      <ExpandableYearSection
        idPrefix="charity-auctions"
        title="Charity Events &amp; Auctions"
        icon={<HeartHandshake size={20} />}
        yearGroups={charityGroups}
        totalCount={charityEvents.length}
        initiallyExpandedYears={[2022, 2021, 2017, 2009]}
        unitLabel="events"
      />

      {/* 5. AWARDS AND RECOGNITIONS (12 entries) */}
      <ExpandableYearSection
        idPrefix="awards-recognitions"
        title="Awards &amp; Recognitions"
        icon={<Award size={20} />}
        yearGroups={awardGroups}
        totalCount={awardsAndRecognitions.length}
        initiallyExpandedYears={[2025, 2024, 2022, 2021]}
        unitLabel="awards"
      />

      {/* 6. COLLECTIONS (7 entries) */}
      <section aria-labelledby="collections-heading" className="pt-10 sm:pt-14 border-t border-[#1B2A49]/15">
        <div className="flex items-center space-x-2.5 text-[#1B2A49] mb-6">
          <Landmark size={20} />
          <h2 id="collections-heading" className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            Collections
          </h2>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#38435C]/70">
            ({collections.length})
          </span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl font-serif text-base sm:text-lg text-[#38435C] leading-relaxed">
          {collections.map((col, idx) => (
            <li
              key={idx}
              className="py-2.5 px-3.5 border-b border-[#1B2A49]/10 flex items-start space-x-3"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/50 mt-2.5 shrink-0" aria-hidden="true" />
              <span>{col}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. ART CAMPS AND WORKSHOPS (7 entries) */}
      <ExpandableYearSection
        idPrefix="art-camps"
        title="Art Camps &amp; Workshops"
        icon={<Tent size={20} />}
        yearGroups={campGroups}
        totalCount={artCampsAndWorkshops.length}
        initiallyExpandedYears={[2025, 2022, 2017, 2016]}
        unitLabel="camps"
      />

      {/* 8. STUDIO CONTACT SECTION */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-white/30 border border-[#1B2A49]/12 rounded-sm flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(27,42,73,0.03)] text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start max-w-[65ch]">
          <p className="font-heading text-xs uppercase tracking-wider text-[#1B2A49] font-bold mb-1">
            Studio Archive &amp; Appointments
          </p>
          <p className="font-serif text-base text-[#38435C] leading-relaxed">
            Studio visits in Mumbai are arranged by prior appointment for curators, collectors, and researchers.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center shrink-0 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B2A49]"
        >
          Contact Studio
        </Link>
      </div>
    </div>
  );
}
