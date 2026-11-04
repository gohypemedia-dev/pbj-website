"use client";

import { createContext, useCallback, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import OpeningAnimation from "./OpeningAnimation";

const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

export default function IntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [ready, setReady] = useState(!isHome);
  const hasPlayedRef = useRef(false);

  const reveal = useCallback(() => {
    hasPlayedRef.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setReady(true);
      hasPlayedRef.current = true;
    }
  }, [isHome]);

  const shouldPlayIntro = isHome && !hasPlayedRef.current;

  return (
    <IntroContext.Provider value={isHome ? ready : true}>
      {shouldPlayIntro && <OpeningAnimation onReveal={reveal} />}
      {children}
    </IntroContext.Provider>
  );
}
