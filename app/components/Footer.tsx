"use client";

import { useState, useEffect } from "react";
import { artistData } from "@/data/artist";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="artist-footer">
      <div className="footer-inner">
        <div className="footer-bottom">
          <p className="footer-rights">All artwork copyrights reserved by the artist.</p>
          <p className="footer-copyright">&copy; {year} {artistData.name}</p>
        </div>
      </div>
    </footer>
  );
}
