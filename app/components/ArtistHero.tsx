"use client";

import Image from "next/image";
import { useIntroReady } from "./IntroProvider";

export default function ArtistHero() {
  const ready = useIntroReady();

  return (
    <section
      className={`artist-hero ${ready ? "is-ready" : ""}`}
      aria-labelledby="hero-title"
    >
      {/* Accessible h1 heading for SEO and screen readers */}
      <h1 id="hero-title" className="sr-only">
        Prakash Bal Joshi &ndash; Contemporary Abstract Artist &amp; Writer
      </h1>

      {/* Single static painting banner: edge-to-edge, unframed, zero gaps */}
      <div className="hero-banner-frame">
        <Image
          src="/artworks/hero-banner-unframed.jpg"
          alt="River Returns 186 (2024), Acrylic on canvas by Prakash Bal Joshi"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="hero-banner-image"
        />
      </div>
    </section>
  );
}
