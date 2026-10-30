"use client";

import React from "react";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import FlyThrough from "./FlyThrough";

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

export default function HomeScrollSections({ onOpenArtwork }) {
  useScrollSectionsMotion();

  return (
    <div className="scroll-story">
      {/* Editorial About Section */}
      <section className="story-about" aria-labelledby="story-about-title">
        <h2 id="story-about-title" className="story-label">About the artist</h2>
        <div>
          <p className="story-intro">
            <RevealWords text="An artist, a writer. A lifetime of looking closer." />
          </p>
        </div>
      </section>

      {/* 3D Corridor FlyThrough Section (replacing old scroll-gallery) */}
      <FlyThrough onOpenArtwork={onOpenArtwork} />

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
