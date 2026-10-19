"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function ScrollExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (reduced.matches) return;
      const lenis = new Lenis({
        autoRaf: true,
        // A longer, gentle settle keeps the hero and scroll reveals in sync.
        lerp: 0.065,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        anchors: { offset: -120 },
        prevent: (node) => !!node.closest('[role="dialog"], [data-lenis-prevent]'),
      });
      const syncLock = () => {
        if (document.body.style.overflow === "hidden") lenis.stop();
        else lenis.start();
      };
      const bodyObserver = new MutationObserver(syncLock);
      bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      syncLock();

      dispose = () => { lenis.destroy(); bodyObserver.disconnect(); };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => { dispose(); reduced.removeEventListener("change", setup); };
  }, [pathname]);
  return null;
}
