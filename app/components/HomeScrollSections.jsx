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
        <h2 id="story-about-title" className="story-label">PRĀKASH BĀL JOSHI</h2>
        <div className="story-bio text-center" data-scroll-reveal>
          <p>
            Prakash Bal Joshi is a self-taught artist from Mumbai, born in 1951. His work explores the transience of nature, the psychological complexity of human experience, and the contradictions of a rapidly changing society.
          </p>
          <p>
            The mythological River Saraswati, which he treats as both a literal presence and a metaphor for the passage of time, recurs frequently in his work. In his own words, “ I want my work to invite reflection rather than prescribe an answer to reveal something familiar, yet make us look at it differently.”
          </p>
          <p>
            In addition to art, he writes Marathi short stories and works as a political writer and columnist.
          </p>
        </div>
      </section>

      {/* 3D Corridor FlyThrough Section */}
      <FlyThrough onOpenArtwork={onOpenArtwork} />

      {/* Studio Contact Section */}
      <section className="story-contact flex flex-col items-center justify-center text-center mx-auto w-full" aria-labelledby="story-contact-title">
        <p className="story-label text-center mx-auto" data-scroll-reveal>Acquisitions · Collaborations · Studio visits</p>
        <h2 id="story-contact-title" className="text-center mx-auto w-full" data-scroll-reveal><span>Let’s</span> start<br />a conversation.</h2>
        <div className="flex flex-col items-center justify-center text-center w-full mx-auto" data-scroll-reveal>
          <a href={`mailto:${artistData.contact.email}`} className="story-email inline-flex items-center justify-center mx-auto gap-2.5">{artistData.contact.email}<ArrowUpRight size={20} /></a>
          <p className="text-center mx-auto">Mumbai, India. Studio visits by appointment.</p>
          <Link href="/contact" className="story-link inline-flex items-center justify-center mx-auto gap-2">Contact the studio <ArrowUpRight size={19} /></Link>
        </div>
      </section>
    </div>
  );
}
