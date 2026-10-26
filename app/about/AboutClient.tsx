"use client";

import React from "react";
import Image from "next/image";
import {
  Landmark,
  Award,
  Calendar,
  Sparkles,
  HeartHandshake,
  Tent
} from "lucide-react";
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
  icon?: React.ReactNode;
  yearGroups: YearGroup[];
}

function ArchiveSection({
  idPrefix,
  title,
  icon,
  yearGroups
}: ArchiveSectionProps) {
  return (
    <section aria-labelledby={`${idPrefix}-heading`} className="w-full pt-10 sm:pt-14">
      {/* Section Header without count */}
      <div className="flex items-center space-x-2.5 text-[#1B2A49] mb-8">
        {icon}
        <h2 id={`${idPrefix}-heading`} className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-left">
          {title}
        </h2>
      </div>

      {/* Year Groups List: Fully displayed by default */}
      <div className="space-y-8 w-full">
        {yearGroups.map((group) => (
          <div key={group.year} className="w-full pb-6">
            {/* Simple Year Heading without count badge */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1B2A49] mb-4 text-left">
              {group.year > 0 ? group.year : "Undated"}
            </h3>

            {/* Complete Entries List */}
            <ul className="space-y-3 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left w-full">
              {group.entries.map((entry, idx) => (
                <li key={idx} className="flex items-start space-x-3 w-full">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1B2A49]/40 mt-2.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1 font-serif text-base text-[#38435C] font-normal leading-relaxed text-left">
                    {entry.text}
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

      {/* 2. CENTRED ARTIST PHOTOGRAPH & CAPTION (Independent wrapper) */}
      <figure className="w-full flex flex-col items-center justify-center mb-10 sm:mb-14">
        <div className="relative max-w-[440px] w-full flex flex-col items-center">
          <div className="w-full flex justify-center">
            <Image
              src="/artworks/artist-portrait.jpg"
              alt="Prakash Bal Joshi in his studio · Mumbai"
              width={896}
              height={1200}
              priority
              unoptimized
              className="w-auto h-auto max-w-full max-h-[580px] object-contain rounded-sm shadow-[0_4px_24px_rgba(27,42,73,0.06)]"
              sizes="(max-width: 640px) 90vw, 440px"
            />
          </div>
          <figcaption className="mt-3 text-xs text-[#38435C]/75 font-body text-center">
            Prakash Bal Joshi in his studio &middot; Mumbai
          </figcaption>
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
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* 4. SOLO EXHIBITIONS */}
      <ArchiveSection
        idPrefix="solo-exhibitions"
        title="Solo Exhibitions"
        icon={<Sparkles size={20} />}
        yearGroups={soloGroups}
      />

      {/* 5. GROUP EXHIBITIONS */}
      <ArchiveSection
        idPrefix="group-exhibitions"
        title="Group Exhibitions"
        icon={<Calendar size={20} />}
        yearGroups={groupGroups}
      />

      {/* 6. CHARITY EVENTS AND AUCTIONS */}
      <ArchiveSection
        idPrefix="charity-auctions"
        title="Charity Events &amp; Auctions"
        icon={<HeartHandshake size={20} />}
        yearGroups={charityGroups}
      />

      {/* 7. AWARDS AND RECOGNITIONS */}
      <ArchiveSection
        idPrefix="awards-recognitions"
        title="Awards &amp; Recognitions"
        icon={<Award size={20} />}
        yearGroups={awardGroups}
      />

      {/* 8. COLLECTIONS */}
      <section aria-labelledby="collections-heading" className="w-full pt-10 sm:pt-14">
        <div className="flex items-center space-x-2.5 text-[#1B2A49] mb-8">
          <Landmark size={20} />
          <h2 id="collections-heading" className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-left">
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
                {col}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. ART CAMPS AND WORKSHOPS */}
      <ArchiveSection
        idPrefix="art-camps"
        title="Art Camps &amp; Workshops"
        icon={<Tent size={20} />}
        yearGroups={campGroups}
      />

    </div>
  );
}
