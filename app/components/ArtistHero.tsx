"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
      ["--hero-signature-y", "--hero-images-progress", "--hero-ink-opacity"].forEach((property) => section.style.removeProperty(property));
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
      // The signature leads; the paintings pick up after the first fifth of the scroll.
      const signature = ease(progress / .72);
      const paintings = ease((progress - .2) / .8);
      const distance = Math.min(rect.height * .42, innerWidth < 768 ? 190 : 360);
      section.style.setProperty("--hero-signature-y", `${-signature * distance}px`);
      section.style.setProperty("--hero-images-progress", paintings.toFixed(4));
      section.style.setProperty("--hero-ink-opacity", String(1 - ease((progress - .72) / .28)));
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
    <section ref={sectionRef} className={`artist-hero ${ready && imagesReady ? "is-ready" : ""}`} aria-labelledby="hero-title">
      <p className="hero-kicker hero-rise">A life in colour. A world within.</p>
      <div className="hero-paintings">
        {heroWorks.map((artwork, index) => (
          <Link href={`/works/${artwork.id}`} key={artwork.id} className={`hero-painting hero-painting-${index} hero-rise`} aria-label={`Explore ${artwork.title}`}>
            <Image src={artwork.image} alt={artwork.title} fill priority sizes="(max-width: 600px) 70vw, 50vw" />
          </Link>
        ))}
      </div>
      <div className="hero-signature hero-rise">
        <h1 id="hero-title">Prakash Bal Joshi</h1>
        <svg viewBox="0 0 1200 70" fill="none" aria-hidden="true" preserveAspectRatio="none">
          <path d="M12 52 C360 60 880 0 1188 24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="hero-footer hero-rise">
        <p>Contemporary abstract artist &amp; writer<br /><span>Mumbai, India</span></p>
        <Link href="/works" className="hero-explore">Explore the works <ArrowUpRight size={18} /></Link>
        <a href="#selected-works" className="hero-scroll" aria-label="Scroll to selected works"><ArrowDown size={20} /></a>
      </div>
      <noscript><style>{".artist-hero .hero-rise { animation: none !important; opacity: 1 !important; transform: none !important; }"}</style></noscript>
    </section>
  );
}
