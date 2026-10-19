"use client";

import { useEffect } from "react";

export function useScrollSectionsMotion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (reduced.matches) return;
      const animations = new Map<Element, Animation>();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animations.get(entry.target)?.play();
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
        const fromRight = element.dataset.scrollReveal === "right";
        if (!fromRight && element.getBoundingClientRect().top < innerHeight * .92) return;
        const animation = element.animate([
          { opacity: 0, transform: fromRight ? "translate3d(80px, 0, 0)" : "translate3d(0, 64px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ], { duration: fromRight ? 1300 : 1100, delay: Number(element.dataset.revealDelay || 0), easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
        animation.pause();
        animations.set(element, animation);
        observer.observe(element);
      });
      const revealFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest("[data-scroll-reveal]");
        if (element) { animations.get(element)?.finish(); observer.unobserve(element); }
      };
      document.addEventListener("focusin", revealFocused);

      const statements = [...document.querySelectorAll<HTMLElement>("[data-scroll-statement]")];
      const themes = [...document.querySelectorAll<HTMLElement>("[data-scroll-themes]")];
      let frame = 0;
      const update = () => {
        frame = 0;
        statements.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight * .85 - rect.top) / (rect.height * .7)));
          const words = section.querySelectorAll<HTMLElement>("[data-scroll-word]");
          words.forEach((word, index) => {
            const amount = Math.max(0, Math.min(1, progress * (words.length + 2) - index));
            word.style.opacity = String(.16 + amount * .84);
          });
        });
        themes.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight * .45 - rect.top) / (rect.height * .8)));
          section.querySelectorAll<HTMLElement>("[data-theme-word]").forEach((word, index) => {
            const distance = progress * 2 - index;
            word.style.opacity = String(Math.max(0, 1 - Math.abs(distance) * 2));
            word.style.transform = `translate3d(0, ${-distance * 80}px, 0)`;
          });
        });
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      dispose = () => {
        observer.disconnect();
        document.removeEventListener("focusin", revealFocused);
        animations.forEach((animation) => animation.cancel());
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        statements.forEach((section) => section.querySelectorAll<HTMLElement>("[data-scroll-word]").forEach((word) => word.style.removeProperty("opacity")));
        themes.forEach((section) => section.querySelectorAll<HTMLElement>("[data-theme-word]").forEach((word) => { word.style.removeProperty("opacity"); word.style.removeProperty("transform"); }));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); };
  }, []);
}
