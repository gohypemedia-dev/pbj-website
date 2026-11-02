"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksArtworksData } from "@/works/worksData";

// 10 curated artworks from the Works catalogue hung in 3D space.
// x/y in vw/vh from centre, z in px (more negative = further away into the corridor).
const items = [
  { artwork: worksArtworksData[0],  x: -30, y: -12, z: -300,  w: 42 }, // PBJ Abstraction 316
  { artwork: worksArtworksData[1],  x: 30,  y: 14,  z: -800,  w: 35 }, // PBJ Abstraction 315
  { artwork: worksArtworksData[2],  x: -26, y: 20,  z: -1300, w: 40 }, // PBJ Abstraction 307
  { artwork: worksArtworksData[3],  x: 28,  y: -18, z: -1800, w: 38 }, // Artificial Intelligence 9
  { artwork: worksArtworksData[4],  x: -30, y: -6,  z: -2300, w: 42 }, // PBJ Abstraction 313
  { artwork: worksArtworksData[5],  x: 25,  y: 18,  z: -2800, w: 36 }, // PBJ Abstraction 314
  { artwork: worksArtworksData[6],  x: -20, y: -20, z: -3300, w: 32 }, // PBJ Abstraction 308
  { artwork: worksArtworksData[8],  x: 28,  y: -4,  z: -3800, w: 40 }, // River Returns 75
  { artwork: worksArtworksData[9],  x: -28, y: 16,  z: -4300, w: 38 }, // River Returns 42
  { artwork: worksArtworksData[11], x: 24,  y: -20, z: -4800, w: 38 }, // Mindscape 7
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

    const mm = gsap.matchMedia();

    // DESKTOP (>= 768px): 3D Corridor FlyThrough
    mm.add("(min-width: 768px)", () => {
      const els = gsap.utils.toArray(".fly__item");
      const state = { z: 0 };

      const renderDesktop = () => {
        els.forEach((el, i) => {
          const depth = items[i].z + state.z;
          const fogIn = gsap.utils.clamp(0, 1, (depth + 2500) / 1000);
          const pass = gsap.utils.clamp(0, 1, 1 - (depth - 250) / 450);
          el.style.opacity = String(fogIn * pass);
          el.style.transform = `translate(-50%, -50%) translate3d(${items[i].x}vw, ${items[i].y}vh, ${depth}px)`;
          el.style.visibility = fogIn * pass < 0.01 ? "hidden" : "visible";
          el.style.zIndex = String(Math.round(depth + 5000));
        });
      };
      renderDesktop();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=360%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(state, { z: TRAVEL, duration: 1, onUpdate: renderDesktop }, 0)
        .fromTo(".fly__glow", { scale: 0.4, opacity: 0 }, { scale: 1.4, opacity: 0.85, duration: 0.75 }, 0)
        .to(".fly__glow", { opacity: 0, duration: 0.2 }, 0.8)
        .to(".fly__stage", { opacity: 0, duration: 0.15 }, 0.85);

      return () => {
        els.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.visibility = "";
          el.style.zIndex = "";
        });
      };
    });

    // MOBILE (< 768px): Controlled Vertical Parallax Showcase
    mm.add("(max-width: 767px)", () => {
      const els = gsap.utils.toArray(".fly__item");
      const N = items.length;
      // Target focal points: item 0 focused at 0, item 9 at 0.82
      const targets = [];
      for (let i = 0; i < N; i++) {
        targets.push((i / (N - 1)) * 0.82);
      }
      // Gentle lateral micro-offsets in vw: subtle natural breathing without edge clipping
      const mobileX = [0, 1.5, -1.5, 1.2, -1.2, 1.5, -1.2, 1.2, -1.5, 0];
      const state = { progress: 0 };

      const renderMobile = () => {
        const p = state.progress;
        els.forEach((el, i) => {
          const target = targets[i];
          const diff = p - target;
          let y = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 1;
          let visible = true;

          if (diff < -0.15) {
            // Far below
            visible = false;
            opacity = 0;
          } else if (diff < 0) {
            // Arriving from below
            const t = (diff + 0.15) / 0.15;
            y = (1 - t) * 55; // from +55vh to 0vh
            scale = 0.90 + t * 0.10;
            opacity = Math.pow(t, 2);
            visible = opacity > 0.02;
            zIndex = 10;
          } else if (diff <= 0.05) {
            // Prime viewing moment in center
            y = -diff * 18;
            scale = 1.0;
            opacity = 1.0;
            visible = true;
            zIndex = 30;
          } else if (diff <= 0.18) {
            // Gliding upward out of view
            const t = (diff - 0.05) / 0.13;
            y = -0.9 - t * 54; // from -0.9vh to -55vh
            scale = 1.0 - t * 0.06;
            opacity = Math.pow(Math.max(0, 1 - t), 1.2);
            visible = opacity > 0.02;
            zIndex = 15;
          } else {
            // Far above
            visible = false;
            opacity = 0;
          }

          // Fade out completely as user exits into next section
          if (p >= 0.98) {
            opacity = 0;
            visible = false;
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translate(-50%, -50%) translate3d(${mobileX[i] || 0}vw, ${y}vh, 0) scale(${scale})`;
          el.style.visibility = visible ? "visible" : "hidden";
          el.style.zIndex = String(zIndex);
        });
      };
      renderMobile();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=420%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(state, { progress: 1, duration: 1, onUpdate: renderMobile }, 0)
        .fromTo(".fly__glow", { scale: 0.6, opacity: 0 }, { scale: 1.1, opacity: 0.55, duration: 0.6 }, 0)
        .to(".fly__glow", { opacity: 0, duration: 0.25 }, 0.75);

      return () => {
        els.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.visibility = "";
          el.style.zIndex = "";
        });
      };
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("orientationchange", handleResize);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="selected-works"
      ref={root}
      className="fly"
      aria-label="Selected Works - Interactive fly-through gallery"
    >
      <div className="fly__glow" aria-hidden="true" />
      <div className="fly__stage" aria-hidden="false">
        {items.map((it, idx) => (
          <div
            key={it.artwork.id}
            className="fly__item"
            style={{
              "--w": it.w,
              "--ar": `${it.artwork.width || 700} / ${it.artwork.height || 850}`,
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
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 42vw"
                  className="fly__img"
                  priority={idx < 2}
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
    </section>
  );
}
