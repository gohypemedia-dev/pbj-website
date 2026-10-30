"use client";

import React from "react";
import Image from "next/image";
import { worksArtworksData } from "@/works/worksData";

export default function ImageArchive({ onOpenArtwork }) {
  const groups = [
    {
      key: "abstraction",
      title: "The Abstraction Series",
      description: "Explorations of colour fields, spontaneous gesture, and non-representational form.",
      label: "Abstraction",
      items: [
        worksArtworksData[0],  // PBJ Abstraction 316 (2026)
        worksArtworksData[1],  // PBJ Abstraction 315 (2026)
        worksArtworksData[2],  // PBJ Abstraction 307 (2024)
        worksArtworksData[4],  // PBJ Abstraction 313 (2024)
        worksArtworksData[5],  // PBJ Abstraction 314 (2024)
        worksArtworksData[6],  // PBJ Abstraction 308 (2024)
        worksArtworksData[10], // PBJ Abstraction 305 (2024)
        worksArtworksData[14], // PBJ Abstraction 191 (2011)
        worksArtworksData[17], // PBJ Abstraction 235 (2018)
      ]
    },
    {
      key: "thematic",
      title: "Themes, Memory & Consciousness",
      description: "Works examining the flow of rivers, urban complexities, inner mindscapes, and artificial intelligence.",
      label: "Thematic Work",
      items: [
        worksArtworksData[8],  // River Returns 75 (2021)
        worksArtworksData[3],  // Artificial Intelligence 9 (2018)
        worksArtworksData[9],  // River Returns 42 (2021)
        worksArtworksData[11], // Mindscape 7 (2016)
        worksArtworksData[7],  // Artificial Intelligence 10 (2019)
        worksArtworksData[18], // Artificial Intelligence 9 (2019)
        worksArtworksData[13], // Shadow of a City (2010)
        worksArtworksData[12], // Dream of Death (2008)
        worksArtworksData[16], // Supernatural (2009)
        worksArtworksData[15], // Untitled (Mixed media)
        worksArtworksData[19], // Untitled (2013)
        worksArtworksData[20], // Untitled (2012)
      ]
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
          sizes="(max-width: 767px) 42vw, 22vw"
          className="w-full h-auto block"
        />
      </button>
      <figcaption className="mt-2 text-xs font-body text-[var(--text-body)]">
        <span className="font-medium text-[var(--text-heading)]">{item.title}</span>
        {item.year && <span className="opacity-70 ml-1.5">({item.year})</span>}
      </figcaption>
    </figure>
  );

  return (
    <section className="image-archive" aria-label="Curated artwork series and thematic archive">
      {groups.map((group) => (
        <div className="archive-group" key={group.key}>
          <div className="archive-heading">
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <div className="archive-grid">
            {group.items.slice(0, 4).map(renderArtwork)}
          </div>
          <details className="archive-more">
            <summary>
              View the full series <span>({group.items.length} works)</span>
            </summary>
            <div className="archive-grid">
              {group.items.slice(4).map(renderArtwork)}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
}
