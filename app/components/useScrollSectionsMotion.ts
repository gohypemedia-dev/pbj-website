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
        const writing = element.dataset.scrollReveal === "write";
        if (!fromRight && !writing && element.getBoundingClientRect().top < innerHeight * .92) return;
        const animation = element.animate(writing ? [
          { clipPath: "inset(-15% 100% -20% -5%)" },
          { clipPath: "inset(-15% -5% -20% -5%)" },
        ] : [
          { opacity: 0, transform: fromRight ? "translate3d(80px, 0, 0)" : "translate3d(0, 64px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ], { duration: writing ? 2200 : fromRight ? 1300 : 1100, delay: writing ? 300 : Number(element.dataset.revealDelay || 0), easing: writing ? "cubic-bezier(.4,0,.2,1)" : "cubic-bezier(.22,1,.36,1)", fill: "both" });
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
      const gallery = document.querySelector<HTMLElement>(".scroll-gallery");
      const galleryWords = [...document.querySelectorAll<HTMLElement>("[data-gallery-word]")];
      let activeGalleryWord = -1;
      let frame = 0;
      const update = () => {
        frame = 0;
        if (gallery) {
          const rect = gallery.getBoundingClientRect();
          // Hold the opening title while the first artwork rises into view.
          const titleIntro = innerHeight * .65;
          const progress = Math.max(0, Math.min(1, (-rect.top - titleIntro) / Math.max(1, rect.height - innerHeight - titleIntro)));
          const index = Math.min(2, Math.floor(progress * 3));
          if (index !== activeGalleryWord) {
            galleryWords.forEach((word, position) => word.classList.toggle("is-active", position === index));
            activeGalleryWord = index;
          }
        }
        statements.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight * .85 - rect.top) / (rect.height * .7)));
          const words = section.querySelectorAll<HTMLElement>("[data-scroll-word]");
          words.forEach((word, index) => {
            const amount = Math.max(0, Math.min(1, progress * (words.length + 2) - index));
            word.style.opacity = String(.16 + amount * .84);
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
        galleryWords.forEach((word, index) => word.classList.toggle("is-active", index === 0));
        statements.forEach((section) => section.querySelectorAll<HTMLElement>("[data-scroll-word]").forEach((word) => word.style.removeProperty("opacity")));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); };
  }, []);
}
