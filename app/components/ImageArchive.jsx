"use client";

import React from "react";
import Image from "next/image";
import { worksArtworksData } from "@/works/worksData";

const getWork = (id) => worksArtworksData.find((a) => a.id === id);

export default function ImageArchive({ onOpenArtwork }) {
  const groups = [
    {
      key: "abstraction",
      title: "The Abstraction Series",
      description: "Explorations of colour fields, spontaneous gesture, and non-representational form.",
      label: "Abstraction",
      items: [
        getWork("pbj-abstraction-316-2026"),
        getWork("pbj-abstraction-315-2026"),
        getWork("pbj-abstraction-307-2024"),
        getWork("pbj-abstraction-313-2024"),
        getWork("pbj-abstraction-314-2024"),
        getWork("pbj-abstraction-308-2024"),
        getWork("pbj-abstraction-305-2024"),
        getWork("pbj-abstraction-191-2011"),
        getWork("pbj-abstraction-206-2013"),
        getWork("pbj-abstraction-235-2018"),
      ].filter(Boolean)
    },
    {
      key: "thematic",
      title: "Themes, Memory & Consciousness",
      description: "Works examining the flow of rivers, urban complexities, inner mindscapes, and artificial intelligence.",
      label: "Thematic Work",
      items: [
        getWork("river-returns-75-2021"),
        getWork("artificial-intelligence-9-2018"),
        getWork("river-returns-42-2021"),
        getWork("mindscape-7-2016"),
        getWork("artificial-intelligence-10-2019"),
        getWork("artificial-intelligence-9-2019"),
        getWork("shadow-of-a-city-2010"),
        getWork("dream-of-death-2008"),
        getWork("supernatural-2009"),
        getWork("untitled-mixed-media"),
        getWork("untitled-2013"),
        getWork("untitled-2012"),
      ].filter(Boolean)
    }
  ];

  const renderArtwork = (item) => (
    <figure key={item.id}>
      <button
        type="button"
        onClick={() => onOpenArtwork ? onOpenArtwork(item) : null}
        className="block w-full border border-[var(--border-strong)] bg-transparent cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49]"
        aria-label={`Enlarge ${item.title}${item.year ? ` (${item.year})` : ""}`}
      >
        <Image
          src={item.image}
          alt={`${item.title}${item.year ? ` (${item.year})` : ""} - ${item.medium} by ${item.artist}`}
          width={item.width}
          height={item.height}
          loading="lazy"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-auto block object-contain"
        />
      </button>
      <figcaption className="archive-caption text-xs mt-2 text-[#38435C]">
        <strong className="text-[#1B2A49]">{item.title}</strong>
        {item.year && <span>, {item.year}</span>}
        <span>. {item.medium}</span>
        {item.dimensions && <span>, {item.dimensions}</span>}
      </figcaption>
    </figure>
  );

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.key} className="space-y-4">
          <header>
            <span className="eyebrow-label text-xs uppercase tracking-wider text-[#1B2A49] block mb-1">
              {group.label}
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#1B2A49]">
              {group.title}
            </h3>
            <p className="font-serif italic text-sm text-[#38435C] mt-1 max-w-2xl">
              {group.description}
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {group.items.map(renderArtwork)}
          </div>
        </section>
      ))}
    </div>
  );
}
