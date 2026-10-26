"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useIntroReady } from "./IntroProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ArtistHero() {
  const ready = useIntroReady();
  const heroRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const layer = parallaxLayerRef.current;
    const veil = veilRef.current;
    const hero = heroRef.current;
    if (!layer || !hero) return;

    const ctx = gsap.context(() => {
      const getHeaderOffset = () =>
        document.querySelector("header")?.offsetHeight || 80;
      const getHeroHeight = () =>
        hero.querySelector(".hero-banner-frame")?.clientHeight || 600;

      // Parallax depth veil that fades in as the next section comes on top
      if (veil) {
        gsap.to(veil, {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-sticky-container",
            start: () => `top ${getHeaderOffset()}`,
            end: () => `+=${getHeroHeight()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Hide hero banner completely once the next section slides over it
      gsap.to(hero, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".next-section-overlay",
          start: () => `top ${getHeaderOffset() + 32}`,
          end: () => `top ${getHeaderOffset()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`artist-hero ${ready ? "is-ready" : ""}`}
      aria-labelledby="hero-title"
    >
      {/* Accessible h1 heading for SEO and screen readers */}
      <h1 id="hero-title" className="sr-only">
        Prakash Bal Joshi &ndash; Contemporary Abstract Artist &amp; Writer
      </h1>

      {/* Single static painting banner: edge-to-edge, unframed, zero gaps */}
      <div className="hero-banner-frame">
        <div ref={parallaxLayerRef} className="hero-parallax-layer w-full h-full relative">
          <Image
            src="/artworks/hero-banner-unframed.jpg"
            alt="River Returns 186 (2024), Acrylic on canvas by Prakash Bal Joshi"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="hero-banner-image"
          />
        </div>
        {/* Parallax depth veil that fades in as the next section rises */}
        <div
          ref={veilRef}
          className="hero-parallax-veil"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
