"use client";

import { useEffect, useRef, useState } from "react";
import { artistData } from "@/data/artist";

/** A single opening sequence; the root layout stays mounted during navigation. */
export default function OpeningAnimation({ onReveal }: { onReveal: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let brand: HTMLElement | null = null;
    let brandVisibility = "";
    let cancelled = false;
    let fontTimeout: ReturnType<typeof setTimeout>;
    let revealTimeout: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      // Remove the painted overlay before cancelling fill-mode animations.
      // Otherwise they snap to their initial frames before React unmounts it.
      overlay.style.visibility = "hidden";
      if (brand) brand.style.visibility = brandVisibility;
      clearTimeout(fontTimeout);
      clearTimeout(revealTimeout);
      animations.forEach((animation) => animation.cancel());
      setFinished(true);
      onReveal();
    };
    finishRef.current = finish;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") finish();
    };
    // Never leave an overlay in place if font loading or animation fails.
    const safetyTimeout = setTimeout(finish, 5500);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", finish);
    motion.addEventListener("change", finish);

    async function play() {
      if (motion.matches || window.scrollY > 0) {
        finish();
        return;
      }
      const fontsLoaded = await Promise.race([
        document.fonts.ready.then(() => true),
        new Promise<boolean>((resolve) => { fontTimeout = setTimeout(() => resolve(false), 1500); }),
      ]);
      if (cancelled) return;
      // Skip the intro on a slow font request instead of animating fallback glyphs.
      if (!fontsLoaded) return finish();

      const name = overlay!.querySelector<HTMLElement>(".opening-name")!;
      const line = overlay!.querySelector<SVGPathElement>(".opening-stroke")!;
      brand = document.querySelector<HTMLElement>(".header-brand .artist-wordmark");
      if (!brand) return finish();
      brandVisibility = brand.style.visibility;
      const targetStyle = getComputedStyle(brand);
      const scale = parseFloat(targetStyle.fontSize) / parseFloat(getComputedStyle(name).fontSize);
      name.style.letterSpacing = `${parseFloat(targetStyle.letterSpacing) / scale || 0}px`;
      name.style.lineHeight = String(parseFloat(targetStyle.lineHeight) / parseFloat(targetStyle.fontSize));
      name.style.textTransform = targetStyle.textTransform;
      const source = name.getBoundingClientRect();
      const target = brand.getBoundingClientRect();
      brand.style.visibility = "hidden";
      overlay!.dataset.started = "true";
      animations.push(name.animate([
        { opacity: 0, transform: "translateY(24px)", clipPath: "inset(0 100% 0 0)", offset: 0 },
        { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)", offset: .4 },
        { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)", offset: .56, easing: "cubic-bezier(.76,0,.24,1)" },
        { opacity: 1, transform: `translate(${target.left - source.left}px, ${target.top - source.top}px) scale(${scale})`, clipPath: "inset(0 0 0 0)", offset: 1 },
      ], { duration: 2500, fill: "both" }));
      animations.push(line.animate([
        { strokeDashoffset: 1 }, { strokeDashoffset: 0 },
      ], { duration: 850, delay: 400, easing: "ease-in-out", fill: "both" }));
      overlay!.querySelectorAll(".opening-caption, .opening-line").forEach((element) => {
        animations.push(element.animate([{ opacity: 1 }, { opacity: 0 }],
          { duration: 350, delay: 1300, fill: "both" }));
      });

      const curtain = overlay!.querySelector<HTMLElement>(".opening-curtain")!;
      revealTimeout = setTimeout(onReveal, 1600);
      animations.push(curtain.animate([
        { clipPath: "inset(0 0 0 0)" },
        { clipPath: "inset(0 0 100% 0)" },
      ], { duration: 900, delay: 1600, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" }));
      try {
        await Promise.all(animations.map((animation) => animation.finished));
        if (!cancelled) finish();
      } catch {
        if (!cancelled) finish();
      }
    }
    void play().catch(finish);

    return () => {
      cancelled = true;
      if (brand) brand.style.visibility = brandVisibility;
      clearTimeout(fontTimeout);
      clearTimeout(revealTimeout);
      clearTimeout(safetyTimeout);
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", finish);
      motion.removeEventListener("change", finish);
    };
  }, [onReveal]);

  if (finished) return null;

  return (
    <div ref={overlayRef} className="opening-animation" aria-hidden="true" onPointerDown={() => finishRef.current()}>
      <div className="opening-curtain" />
      <div className="opening-content">
        <p className="opening-caption">Art &middot; Memory &middot; Movement</p>
        <p className="opening-name">{artistData.diacriticName}</p>
        <svg className="opening-line" viewBox="0 0 600 35" fill="none">
          <path className="opening-stroke" pathLength="1" d="M5 27 C180 27 390 3 595 12" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <p className="opening-caption">Artist &amp; writer &middot; Mumbai</p>
      </div>
      <noscript><style>{".opening-animation { display: none !important; }"}</style></noscript>
    </div>
  );
}
