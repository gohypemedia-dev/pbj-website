"use client";

import { useEffect, useRef, useState } from "react";

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
    let cancelled = false;
    let fontTimeout: ReturnType<typeof setTimeout>;
    let revealTimeout: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      // Remove the painted overlay before cancelling fill-mode animations.
      // Otherwise they snap to their initial frames before React unmounts it.
      overlay.style.visibility = "hidden";
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

      const letters = overlay!.querySelectorAll<HTMLElement>(".opening-letter");
      const targets = document.querySelectorAll<HTMLElement>("[data-brand-letter]");
      if (targets.length !== letters.length) return finish();
      overlay!.dataset.started = "true";

      letters.forEach((letter, index) => {
        const target = targets[index].getBoundingClientRect();
        const width = letter.offsetWidth;
        const height = letter.offsetHeight;
        const startX = window.innerWidth * [0.18, 0.5, 0.82][index] - width / 2;
        const startY = window.innerHeight / 2 - height / 2;
        const centerX = window.innerWidth / 2 + (index - 1) * width - width / 2;
        const scale = target.width / width;
        animations.push(letter.animate([
          { transform: `translate(${startX}px, ${startY}px) scale(1)`, offset: 0 },
          { transform: `translate(${startX}px, ${startY}px) scale(1)`, offset: 0.16, easing: "cubic-bezier(.76,0,.24,1)" },
          { transform: `translate(${centerX}px, ${startY}px) scale(1)`, offset: 0.58, easing: "cubic-bezier(.76,0,.24,1)" },
          { transform: `translate(${target.left}px, ${target.top}px) scale(${scale})`, offset: 1 },
        ], { duration: 1850, fill: "both", easing: "linear" }));
      });

      const curtain = overlay!.querySelector<HTMLElement>(".opening-curtain")!;
      revealTimeout = setTimeout(onReveal, 1350);
      animations.push(curtain.animate([
        { clipPath: "inset(0 0 0 0)" },
        { clipPath: "inset(0 0 100% 0)" },
      ], { duration: 850, delay: 1250, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" }));
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
      {Array.from("PBJ").map((letter, index) => (
        <span key={letter} className={`opening-letter opening-letter-${index}`}>{letter}</span>
      ))}
      <noscript><style>{".opening-animation { display: none !important; }"}</style></noscript>
    </div>
  );
}
