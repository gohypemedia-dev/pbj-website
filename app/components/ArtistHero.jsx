"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { worksArtworksData } from "@/works/worksData";
import { useIntroReady } from "./IntroProvider";

// Flagship artwork for the edge-to-edge hero banner: Artificial Intelligence 10 (2019)
const heroArtwork =
  worksArtworksData.find((a) => a.id === "artificial-intelligence-10-2019") ||
  worksArtworksData[7];

export default function ArtistHero({ onOpenArtwork }) {
  const ready = useIntroReady();
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroRef = useRef(null);
  const parallaxLayerRef = useRef(null);
  const veilRef = useRef(null);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setImageLoaded(true);
    }, 600);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const scrollY = window.scrollY;
      if (parallaxLayerRef.current) {
        // Subtle downward parallax shift as the user scrolls
        const translateY = Math.min(scrollY * 0.22, 140);
        parallaxLayerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
      if (veilRef.current) {
        // Veil gently darkens as next section slides over
        const opacity = Math.min(Math.max(scrollY / 500, 0), 0.4);
        veilRef.current.style.opacity = opacity.toFixed(3);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    updateParallax();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`artist-hero ${ready && imageLoaded ? "is-ready" : ""}`}
      aria-label="Prakash Bal Joshi - Artificial Intelligence 10"
    >
      <h1 className="sr-only">
        Prakash Bal Joshi &ndash; Artificial Intelligence 10 (2019)
      </h1>

      <div className="hero-banner-frame">
        <button
          type="button"
          onClick={() => (onOpenArtwork ? onOpenArtwork(heroArtwork) : null)}
          className="hero-banner-button"
          aria-label={`View ${heroArtwork.title}${heroArtwork.year ? ` (${heroArtwork.year})` : ""} by ${heroArtwork.artist}`}
        >
          <div ref={parallaxLayerRef} className="hero-parallax-layer">
            <Image
              src={heroArtwork.image}
              alt={`${heroArtwork.title}${heroArtwork.year ? ` (${heroArtwork.year})` : ""} - ${heroArtwork.medium} by ${heroArtwork.artist}`}
              fill
              priority
              quality={95}
              sizes="100vw"
              className="hero-banner-image"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div ref={veilRef} className="hero-parallax-veil" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
