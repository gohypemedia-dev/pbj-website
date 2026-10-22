"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="artist-footer">
      <div className="footer-inner">
        <div className="footer-topline">
          <nav aria-label="Footer navigation">
            <Link href="/works">Works</Link>
            <Link href="/about">About the artist</Link>
            <Link href="/exhibitions">Exhibitions</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-studio">
            <a href={`mailto:${artistData.contact.email}`}>
              {artistData.contact.email} <ArrowUpRight size={16} />
            </a>
            <p>Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-rights">All artwork copyrights reserved by the artist.</p>
          <p className="footer-copyright">&copy; {year} {artistData.name}</p>
        </div>
      </div>
    </footer>
  );
}
