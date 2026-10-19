"use client";

import { useEffect, useState } from "react";

const themes = ["rivers.", "memory.", "life."];

export default function ThemePhrase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!reduced.matches && !document.hidden) {
        setIndex((current) => (current + 1) % themes.length);
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="theme-phrase">
      <span className="theme-prefix">On</span>
      <span className="theme-rotator">
        <span key={index} className="theme-changing-word">{themes[index]}</span>
      </span>
    </p>
  );
}
