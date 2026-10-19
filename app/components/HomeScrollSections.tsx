"use client";

import Image from "next/image";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import { artworksData, type Artwork } from "@/data/artworks";
import { exhibitionsData } from "@/data/exhibitions";

export default function HomeScrollSections({ onOpenArtwork }: { onOpenArtwork: (artwork: Artwork) => void }) {
  useScrollSectionsMotion();
  return (
    <div className="scroll-story">
      <section className="story-about" aria-labelledby="story-about-title">
        <h2 id="story-about-title" className="story-label" data-scroll-reveal="right">About the artist</h2>
        <div data-scroll-reveal="right" data-reveal-delay="100">
          <p className="story-intro">An artist, a writer.<br />A lifetime of looking closer.</p>
          <p>Abstract paintings shaped by memory, nature, and the quiet movement of water.</p>
        </div>
        <div data-scroll-reveal="right" data-reveal-delay="200">
          <p>From his Mumbai studio, Prakash Bal Joshi follows an intuitive practice in oil and acrylic. Each painting begins with a mark, and finds its own course.</p>
          <Link className="story-link" href="/about">Discover the artist <ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="story-themes" data-scroll-themes aria-labelledby="themes-title">
        <h2 id="themes-title" className="sr-only">Rivers, memory, and life: themes in the artist’s work</h2>
        <div className="theme-frame" aria-hidden="true">
          <span className="theme-corner theme-corner-start" />
          <span className="theme-corner theme-corner-end" />
          {["Rivers", "Memory", "Life"].map((theme, index) => <p key={theme} data-theme-word className={index === 0 ? "theme-word theme-word-first" : "theme-word"}><span>On</span> {theme.toLowerCase()}.</p>)}
        </div>
      </section>

      <section className="story-statement" data-scroll-statement aria-label="The artist's practice">
        <div className="statement-sticky">
          <p className="story-label">Colour, memory &amp; the movement of water</p>
          <p className="statement-line">
            {"Following the flow of life".split(" ").map((word, index) => <span key={index} data-scroll-word className={index > 1 ? "statement-script" : ""}>{word}{" "}</span>)}
          </p>
          <p className="statement-note">Spontaneous paintings. Quiet discoveries.<br />An ongoing conversation with the world within.</p>
        </div>
      </section>

      <section id="selected-works" className="scroll-gallery" aria-labelledby="scroll-gallery-title">
        <div className="gallery-title-layer"><h2 id="scroll-gallery-title"><span>Selected</span>WORKS</h2></div>
        <div className="scroll-gallery-grid">
          {artworksData.map((artwork, index) => (
            <figure className={`scroll-art scroll-art-${index}`} key={artwork.id}>
              <div data-scroll-reveal>
                <button className="scroll-art-button" onClick={() => onOpenArtwork(artwork)} aria-label={`View ${artwork.title}`}>
                  <Image src={artwork.image} alt={artwork.title} width={700} height={850} style={{ width: "100%", height: "auto" }} sizes="(max-width: 767px) 44vw, 24vw" />
                </button>
                <figcaption><span>{artwork.title}</span><span>{artwork.year}</span></figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>
      <div className="gallery-archive-footer">
        <Link href="/works" className="gallery-archive">Explore all works <ArrowUpRight size={20} /></Link>
      </div>

      <section className="story-exhibitions" aria-labelledby="story-exhibitions-title">
        <div className="exhibitions-heading" data-scroll-reveal>
          <p className="story-label">Across places &amp; perspectives</p>
          <h2 id="story-exhibitions-title">In good<br /><span>company.</span></h2>
          <Link href="/exhibitions" className="story-link">Exhibition history <ArrowUpRight size={18} /></Link>
        </div>
        <div className="exhibitions-list">
          {exhibitionsData.slice(0, 3).map((exhibition) => <article key={exhibition.id} data-scroll-reveal>
            <span className="story-label">{exhibition.year} / {exhibition.type}</span>
            <h3>{exhibition.title}</h3>
            <p>{exhibition.venue}<br />{exhibition.city}, {exhibition.country}</p>
            <p>{exhibition.description}</p>
          </article>)}
        </div>
      </section>

      <section className="story-contact" aria-labelledby="story-contact-title">
        <p className="story-label" data-scroll-reveal>Acquisitions · Collaborations · Studio visits</p>
        <h2 id="story-contact-title" data-scroll-reveal><span>Let’s</span> start<br />a conversation.</h2>
        <div data-scroll-reveal>
          <a href={`mailto:${artistData.contact.email}`} className="story-email">{artistData.contact.email}<ArrowUpRight /></a>
          <p>Mumbai, India. Studio visits by appointment.</p>
          <Link href="/contact" className="story-link">Contact the studio <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}
