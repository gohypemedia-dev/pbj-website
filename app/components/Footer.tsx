"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";

export default function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="artist-footer">
      <div className="footer-topline">
        <a href="#page-top" className="footer-back">Back to top <ArrowUp size={16} /></a>
        <nav aria-label="Footer navigation">
          <Link href="/works">Works</Link>
          <Link href="/about">About the artist</Link>
          <Link href="/exhibitions">Exhibitions</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-studio">
          <a href={`mailto:${artistData.contact.email}`}>{artistData.contact.email} <ArrowUpRight size={16} /></a>
          <p>Mumbai, India</p>
          <p>&copy; {year} {artistData.name}</p>
        </div>
      </div>
      <Link href="/" className="footer-signoff" aria-label={`${artistData.name} home`}>
        {artistData.diacriticName}
      </Link>
      <p className="footer-rights">All artwork copyrights reserved by the artist.</p>
    </footer>
  );
}
