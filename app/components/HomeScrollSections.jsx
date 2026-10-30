"use client";

import React from "react";
import Image from "next/image";
import ThemePhrase from "./ThemePhrase";
import ImageArchive from "./ImageArchive";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import { worksArtworksData } from "@/works/worksData";
import { exhibitionsData } from "@/data/exhibitions";

function RevealWords({ text }) {
  return (
    <span aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <span key={index}>
            <span style={{ whiteSpace: "nowrap" }}>
              {Array.from(word).map((letter, letterIndex) => (
                <span key={letterIndex} data-about-letter>
                  {letter}
                </span>
              ))}
            </span>{" "}
          </span>
        ))}
      </span>
    </span>
  );
}

// 7 primary artworks for the staggered scroll gallery (.scroll-art-0 to .scroll-art-6)
const selectedPrimaryWorks = [
  worksArtworksData[9],  // River Returns 42 (2021)
  worksArtworksData[2],  // PBJ Abstraction 307 (2024)
  worksArtworksData[7],  // Artificial Intelligence 10 (2019)
  worksArtworksData[11], // Mindscape 7 (2016)
  worksArtworksData[4],  // PBJ Abstraction 313 (2024)
  worksArtworksData[13], // Shadow of a City (2010)
  worksArtworksData[5],  // PBJ Abstraction 314 (2024)
];

// 8 complementary artworks for the extended parallax layout (.scroll-art-extra-0 to .scroll-art-extra-7)
const selectedExtraWorks = [
  worksArtworksData[12], // Dream of Death (2008)
  worksArtworksData[6],  // PBJ Abstraction 308 (2024)
  worksArtworksData[18], // Artificial Intelligence 9 (2019)
  worksArtworksData[14], // PBJ Abstraction 191 (2011)
  worksArtworksData[16], // Supernatural (2009)
  worksArtworksData[17], // PBJ Abstraction 235 (2018)
  worksArtworksData[15], // Untitled (Mixed media)
  worksArtworksData[19], // Untitled (2013)
];

export default function HomeScrollSections({ onOpenArtwork }) {
  useScrollSectionsMotion();

  return (
    <div className="scroll-story">
      {/* Editorial About Section */}
      <section className="story-about" aria-labelledby="story-about-title">
        <h2 id="story-about-title" className="story-label">About the artist</h2>
        <div>
          <p className="story-intro">
            <RevealWords text="An artist, a writer." /><br />
            <RevealWords text="A lifetime of looking closer." />
          </p>
          <p>
            <RevealWords text="Abstract paintings shaped by memory, nature, and the quiet movement of water." />
          </p>
        </div>
      </section>

      {/* Rotating Themes Section */}
      <section className="story-themes" aria-labelledby="themes-title">
        <h2 id="themes-title" className="sr-only">Rivers, memory, and life: themes in the artist’s work</h2>
        <div className="theme-frame" aria-hidden="true">
          <ThemePhrase />
        </div>
      </section>

      {/* Selected Works Parallax Gallery */}
      <section id="selected-works" className="scroll-gallery" aria-labelledby="scroll-gallery-title">
        <div className="gallery-title-layer">
          <h2 id="scroll-gallery-title" aria-label="Selected works">
            <span aria-hidden="true">Selected</span>
            <div className="gallery-changing-title" aria-hidden="true">
              {["WORKS", "COLOUR", "STORIES"].map((word, index) => (
                <b key={word} data-gallery-word className={index === 0 ? "is-active" : ""}>
                  {word}
                </b>
              ))}
            </div>
          </h2>
        </div>

        <div className="scroll-gallery-grid">
          {selectedPrimaryWorks.map((artwork, index) => (
            <figure className={`scroll-art scroll-art-${index}`} key={artwork.id}>
              <div data-scroll-reveal>
                <button
                  type="button"
                  className="scroll-art-button"
                  onClick={() => onOpenArtwork ? onOpenArtwork(artwork) : null}
                  aria-label={`View ${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} by ${artwork.artist}`}
                >
                  <Image
                    src={artwork.image}
                    alt={`${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
                    width={artwork.width || 700}
                    height={artwork.height || 850}
                    style={{ width: "100%", height: "auto" }}
                    sizes="(max-width: 767px) 44vw, 20vw"
                  />
                </button>
                <figcaption>
                  <span>{artwork.title}</span>
                  <span>{artwork.year || artwork.series || "Archive"}</span>
                </figcaption>
              </div>
            </figure>
          ))}

          {selectedExtraWorks.map((artwork, index) => (
            <figure className={`scroll-art scroll-art-extra scroll-art-extra-${index}`} key={artwork.id}>
              <div data-scroll-reveal>
                <button
                  type="button"
                  className="scroll-art-button"
                  onClick={() => onOpenArtwork ? onOpenArtwork(artwork) : null}
                  aria-label={`View ${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} by ${artwork.artist}`}
                >
                  <Image
                    src={artwork.image}
                    alt={`${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
                    width={artwork.width || 700}
                    height={artwork.height || 850}
                    style={{ width: "100%", height: "auto" }}
                    sizes="(max-width: 767px) 44vw, 20vw"
                  />
                </button>
                <figcaption>
                  <span>{artwork.title}</span>
                  <span>{artwork.year || artwork.series || "Archive"}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Works Page Link */}
      <div className="gallery-archive-footer">
        <Link href="/works" className="gallery-archive">
          Explore all works <ArrowUpRight size={20} />
        </Link>
      </div>

      {/* Thematic Archive Groups */}
      <ImageArchive onOpenArtwork={onOpenArtwork} />

      {/* Exhibitions Section */}
      <section className="story-exhibitions" aria-labelledby="story-exhibitions-title">
        <div className="exhibitions-heading" data-scroll-reveal>
          <p className="story-label">Across places &amp; perspectives</p>
          <h2 id="story-exhibitions-title">In good<br /><span>company.</span></h2>
          <Link href="/exhibitions" className="story-link">Exhibition history <ArrowUpRight size={18} /></Link>
        </div>
        <div className="exhibitions-list">
          {exhibitionsData.slice(0, 3).map((exhibition) => (
            <article key={exhibition.id} data-scroll-reveal>
              <span className="story-label">{exhibition.year} / {exhibition.type}</span>
              <h3>{exhibition.title}</h3>
              <p>{exhibition.venue}<br />{exhibition.city}, {exhibition.country}</p>
              <p>{exhibition.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Studio Contact Section */}
      <section className="story-contact" aria-labelledby="story-contact-title">
        <p className="story-label" data-scroll-reveal>Acquisitions · Collaborations · Studio visits</p>
        <h2 id="story-contact-title" data-scroll-reveal><span>Let’s</span> start<br />a conversation.</h2>
        <div data-scroll-reveal>
          <a href={`mailto:${artistData.contact.email}`} className="story-email">{artistData.contact.email}<ArrowUpRight /></a>
          <p>Mumbai, India. Studio visits by appointment.</p>
          <Link href="/contact" className="story-link">Contact the studio <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
