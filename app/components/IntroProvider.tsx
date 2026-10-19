"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import OpeningAnimation from "./OpeningAnimation";

const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

export default function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const reveal = useCallback(() => setReady(true), []);
  return (
    <IntroContext.Provider value={ready}>
      <OpeningAnimation onReveal={reveal} />
      {children}
    </IntroContext.Provider>
  );
}
