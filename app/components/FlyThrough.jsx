"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksArtworksData } from "@/works/worksData";

// 10 curated artworks from the Works catalogue hung in 3D space.
// x/y in vw/vh from centre, z in px (more negative = further away into the corridor).
const items = [
  { artwork: worksArtworksData[0],  x: -30, y: -14, z: -300,  w: 30 }, // PBJ Abstraction 316
  { artwork: worksArtworksData[1],  x: 30,  y: 16,  z: -800,  w: 22 }, // PBJ Abstraction 315
  { artwork: worksArtworksData[2],  x: -26, y: 22,  z: -1300, w: 28 }, // PBJ Abstraction 307
  { artwork: worksArtworksData[3],  x: 28,  y: -20, z: -1800, w: 26 }, // Artificial Intelligence 9
  { artwork: worksArtworksData[4],  x: -32, y: -6,  z: -2300, w: 30 }, // PBJ Abstraction 313
  { artwork: worksArtworksData[5],  x: 24,  y: 20,  z: -2800, w: 24 }, // PBJ Abstraction 314
  { artwork: worksArtworksData[6],  x: -18, y: -24, z: -3300, w: 20 }, // PBJ Abstraction 308
  { artwork: worksArtworksData[8],  x: 30,  y: -4,  z: -3800, w: 28 }, // River Returns 75
  { artwork: worksArtworksData[9],  x: -28, y: 18,  z: -4300, w: 26 }, // River Returns 42
  { artwork: worksArtworksData[11], x: 22,  y: -22, z: -4800, w: 26 }, // Mindscape 7
];

const TRAVEL = 5600;

/** Scroll flies the camera forward through a 3D corridor of floating artworks. */
export default function FlyThrough({ onOpenArtwork }) {
  const root = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(".fly__item");
      const state = { z: 0 };

      const render = () => {
        els.forEach((el, i) => {
          const depth = items[i].z + state.z; // distance in front of (−) or behind (+) the screen plane
          // fade in out of the fog, fade out just before passing the camera
          const fogIn = gsap.utils.clamp(0, 1, (depth + 2500) / 1000);
          const pass = gsap.utils.clamp(0, 1, 1 - (depth - 250) / 450);
          el.style.opacity = String(fogIn * pass);
          el.style.transform = `translate(-50%, -50%) translate3d(${items[i].x}vw, ${items[i].y}vh, ${depth}px)`;
          el.style.visibility = fogIn * pass < 0.01 ? "hidden" : "visible";
        });
      };
      render();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=360%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(state, { z: TRAVEL, duration: 1, onUpdate: render }, 0)
        // "Step inside." is visible right in the starting, then scales up and fades out as user scrolls forward
        .fromTo(
          ".fly__intro",
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 1.6, duration: 0.16 },
          0.02
        )
        .fromTo(".fly__outro", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.16 }, 0.8)
        .fromTo(".fly__glow", { scale: 0.4, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 1 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="selected-works"
      ref={root}
      className="fly"
      aria-label="Selected Works - Step inside the portfolio"
    >
      <div className="fly__glow" aria-hidden="true" />
      <div className="fly__stage" aria-hidden="false">
        {items.map((it) => (
          <div
            key={it.artwork.id}
            className="fly__item"
            style={{
              "--w": it.w,
              aspectRatio: `${it.artwork.width || 700} / ${it.artwork.height || 850}`,
            }}
          >
            <button
              type="button"
              onClick={() => (onOpenArtwork ? onOpenArtwork(it.artwork) : null)}
              className="fly__item-button"
              aria-label={`View ${it.artwork.title}${it.artwork.year ? ` (${it.artwork.year})` : ""} by ${it.artwork.artist}`}
            >
              <div className="fly__img-wrap">
                <Image
                  src={it.artwork.image}
                  alt={`${it.artwork.title}${it.artwork.year ? ` (${it.artwork.year})` : ""} - ${it.artwork.medium} by ${it.artwork.artist}`}
                  fill
                  sizes="(max-width: 900px) 45vw, 25vw"
                  className="fly__img"
                />
              </div>
              <div className="fly__caption">
                <span className="fly__caption-title">{it.artwork.title}</span>
                <span className="fly__caption-year">
                  {it.artwork.year || it.artwork.series || "Archive"}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="fly__ui" aria-hidden="true">
        <div className="fly__intro">
          <p className="fly__big">
            Step <em>inside.</em>
          </p>
        </div>
        <div className="fly__outro">
          <p className="fly__big">
            Worlds drawn <em>in light.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
