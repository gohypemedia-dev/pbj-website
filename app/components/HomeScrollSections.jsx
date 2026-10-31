"use client";

import React from "react";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import FlyThrough from "./FlyThrough";

export default function HomeScrollSections({ onOpenArtwork }) {
  useScrollSectionsMotion();

  return (
    <div className="scroll-story">
      {/* Editorial About Section */}
      <section className="story-about" aria-labelledby="story-about-title">
        <h2 id="story-about-title" className="story-label">About the artist</h2>
        <div className="story-bio" data-scroll-reveal>
          <p>
            Prakash Bal Joshi is a self-taught artist from Mumbai who was born in 1951. His writing examines the inconsistencies of a society that is changing quickly, the fleeting character of the natural world, and the psychological complexity of human experience.
          </p>
          <p>
            The mythological River Saraswati, which he treats as both a literal presence and a metaphor for the passage of time; a power that carries, alters, and erases, recurs frequently in his work.
          </p>
          <p>
            In addition to art, he writes Marathi short stories and works as a political writer and columnist.
          </p>
        </div>
      </section>

      {/* 3D Corridor FlyThrough Section */}
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
