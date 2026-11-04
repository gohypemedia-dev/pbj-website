"use client";

import React from "react";
import Link from "next/link";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import FlyThrough from "./FlyThrough";

export default function HomeScrollSections({ onOpenArtwork }) {
  useScrollSectionsMotion();

  return (
    <div className="scroll-story">
      {/* Editorial About Section */}
      <section className="story-about" aria-labelledby="story-about-title">
        <h1 id="story-about-title" className="story-label">PRĀKASH BĀL JOSHI</h1>
        <div className="story-bio text-center" data-scroll-reveal>
          <p>
            Prakash Bal Joshi is a self-taught artist from Mumbai, born in 1951. His work explores the transience of nature, the psychological complexity of human experience, and the contradictions of a rapidly changing society.
          </p>
          <p>
            The mythological River Saraswati, which he treats as both a literal presence and a metaphor for the passage of time, recurs frequently in his work. In his own words, “I want my work to invite reflection rather than prescribe an answer—to reveal something familiar, yet make us look at it differently.”
          </p>
          <p>
            Alongside his art practice, he writes Marathi short fiction and political commentary as a columnist.
          </p>
        </div>
      </section>

      {/* 3D Corridor FlyThrough Section */}
      <FlyThrough onOpenArtwork={onOpenArtwork} />

      {/* View All Works CTA Button */}
      <div className="view-all-works-cta relative z-30 bg-[#E9ECEF] flex items-center justify-center text-center pt-8 pb-2 sm:pt-10 sm:pb-3 w-full">
        <Link
          href="/works"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B2A49] hover:bg-[#253961] text-[#E9ECEF] hover:text-white font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] rounded-xs transition-colors shadow-xs min-h-[46px]"
          aria-label="View all works in the catalogue"
        >
          View all works
        </Link>
      </div>

      {/* Studio Contact Section */}
      <section className="story-contact relative z-30 bg-[#E9ECEF] flex flex-col items-center justify-center text-center mx-auto w-full pt-4 pb-16 sm:pt-6 sm:pb-24" aria-labelledby="story-contact-title">
        <h2
          id="story-contact-title"
          style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
          className="text-center mx-auto w-full whitespace-nowrap mt-2 mb-6 sm:mt-3 sm:mb-8"
          data-scroll-reveal
        >
          Connect with the team
        </h2>
        <div className="flex flex-col items-center justify-center text-center w-full mx-auto" data-scroll-reveal>
          <a href={`mailto:${artistData.contact.email}`} className="story-email inline-flex items-center justify-center mx-auto gap-2.5">{artistData.contact.email}<ArrowUpRight size={20} /></a>
          <p className="text-center mx-auto">Studio visits by appointment.</p>
        </div>
      </section>
    </div>
  );
}
