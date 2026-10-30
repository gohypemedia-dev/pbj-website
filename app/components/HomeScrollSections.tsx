"use client";

import Image from "next/image";
import ThemePhrase from "./ThemePhrase";
import ImageArchive from "./ImageArchive";
import { imageArchive } from "@/data/imageArchive";
import { useScrollSectionsMotion } from "./useScrollSectionsMotion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artistData } from "@/data/artist";
import { artworksData, type Artwork } from "@/data/artworks";
import { exhibitionsData } from "@/data/exhibitions";

function RevealWords({ text }: { text: string }) {
  return <span aria-label={text}><span aria-hidden="true">{text.split(" ").map((word, index) => <span key={index}><span style={{ whiteSpace: "nowrap" }}>{Array.from(word).map((letter, letterIndex) => <span key={letterIndex} data-about-letter>{letter}</span>)}</span>{" "}</span>)}</span></span>;
}

export default function HomeScrollSections({ onOpenArtwork }: { onOpenArtwork: (artwork: Artwork) => void }) {
  useScrollSectionsMotion();
  return (
    <div className="scroll-story">
      <section className="story-about" aria-labelledby="story-about-title">
        <h2 id="story-about-title" className="story-label">About the artist</h2>
        <div>
          <p className="story-intro"><RevealWords text="An artist, a writer." /><br /><RevealWords text="A lifetime of looking closer." /></p>
          <p><RevealWords text="Abstract paintings shaped by memory, nature, and the quiet movement of water." /></p>
        </div>
      </section>

      <section className="story-themes" aria-labelledby="themes-title">
        <h2 id="themes-title" className="sr-only">Rivers, memory, and life: themes in the artist’s work</h2>
        <div className="theme-frame" aria-hidden="true">
          <ThemePhrase />
        </div>
      </section>

      <section id="selected-works" className="scroll-gallery" aria-labelledby="scroll-gallery-title">
        <div className="gallery-title-layer"><h2 id="scroll-gallery-title" aria-label="Selected works"><span aria-hidden="true">Selected</span><div className="gallery-changing-title" aria-hidden="true">{["WORKS", "COLOUR", "STORIES"].map((word, index) => <b key={word} data-gallery-word className={index === 0 ? "is-active" : ""}>{word}</b>)}</div></h2></div>
        <div className="scroll-gallery-grid">
          {artworksData.map((artwork, index) => (
            <figure className={`scroll-art scroll-art-${index}`} key={artwork.id}>
              <div data-scroll-reveal>
                <button className="scroll-art-button" onClick={() => onOpenArtwork(artwork)} aria-label={`View ${artwork.title}`}>
                  <Image src={artwork.image} alt={artwork.title} width={700} height={850} style={{ width: "100%", height: "auto" }} sizes="(max-width: 767px) 44vw, 20vw" />
                </button>
                <figcaption><span>{artwork.title}</span><span>{artwork.year}</span></figcaption>
              </div>
            </figure>
          ))}
          {imageArchive.art.filter((image) => [1, 3, 7, 8, 11, 12, 14, 16].includes(image.number)).map((image, index) => (
            <figure className={`scroll-art scroll-art-extra scroll-art-extra-${index}`} key={image.src}>
              <div data-scroll-reveal>
                <a className="scroll-art-button" href={image.src} target="_blank" rel="noreferrer" aria-label={`Open monochrome artwork ${image.number} at full size`}>
                  <Image src={image.src} alt={`Monochrome artwork ${image.number} from the artist’s archive`} width={image.width} height={image.height} sizes="(max-width: 767px) 44vw, 20vw" />
                </a>
                <figcaption><span>Artwork {String(image.number).padStart(2, "0")}</span><span>Archive</span></figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>
      <div className="gallery-archive-footer">
        <Link href="/works" className="gallery-archive">Explore all works <ArrowUpRight size={20} /></Link>
      </div>

      <ImageArchive />

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
