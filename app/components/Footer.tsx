"use client";

import { useState, useEffect } from "react";
import { artistData } from "@/data/artist";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="artist-footer text-center relative z-30 bg-[#E9ECEF]">
      <div className="footer-inner flex flex-col items-center justify-center text-center">
        <div className="footer-bottom flex flex-col items-center justify-center text-center gap-1.5">
          <p className="footer-rights text-center">All artwork copyrights reserved by the artist.</p>
          <p className="footer-copyright text-center">&copy; {year} {artistData.name}</p>
        </div>
      </div>
    </footer>
  );
}
