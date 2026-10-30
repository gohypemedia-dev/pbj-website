"use client";

import Image from "next/image";
import Link from "next/link";
import { artworksData } from "@/data/artworks";
import { useIntroReady } from "./IntroProvider";
import { useEffect, useRef, useState } from "react";

const heroWorks = [artworksData[1], artworksData[4], artworksData[0], artworksData[5], artworksData[2]];

export default function ArtistHero() {
  const ready = useIntroReady();
  const sectionRef = useRef<HTMLElement>(null);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let active = true;
    const reveal = () => { if (active) setImagesReady(true); };
    // Decode before movement so large paintings don't pop into moving frames.
    const timeout = setTimeout(() => { void document.fonts.ready.then(reveal); }, 1600);
    const images = [...(sectionRef.current?.querySelectorAll("img") ?? [])];
    void Promise.allSettled([
      ...images.map((image) => image.decode()),
      document.fonts.ready,
    ]).then(reveal);
    return () => { active = false; clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready || !imagesReady) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const reset = () => {
      section.style.removeProperty("--hero-images-progress");
    };
    const ease = (value: number) => {
      const t = Math.max(0, Math.min(1, value));
      return t * t * (3 - 2 * t);
    };
    const update = () => {
      frame = 0;
      if (reduced.matches) {
        reset();
        return;
      }
      const rect = section.getBoundingClientRect();
      const start = section.offsetTop - (document.querySelector("header")?.offsetHeight ?? 0);
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / rect.height));
      const paintings = ease((progress - .2) / .8);
      section.style.setProperty("--hero-images-progress", paintings.toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      reset();
    };
  }, [ready, imagesReady]);

  return (
    <section ref={sectionRef} className={`artist-hero ${ready && imagesReady ? "is-ready" : ""}`} aria-label="Prakash Bal Joshi">
      <h1 className="sr-only">Prakash Bal Joshi</h1>
      <p className="hero-kicker hero-rise">A life in colour. A world within.</p>
      <div className="hero-paintings">
        {heroWorks.map((artwork, index) => (
          <Link href={`/works/${artwork.id}`} key={artwork.id} className={`hero-painting hero-painting-${index} hero-rise`} aria-label={`Explore ${artwork.title}`}>
            <Image src={artwork.image} alt={artwork.title} fill priority sizes="(max-width: 600px) 70vw, 50vw" />
          </Link>
        ))}
      </div>
      <noscript><style>{".artist-hero .hero-rise { animation: none !important; opacity: 1 !important; transform: none !important; }"}</style></noscript>
    </section>
  );
}
