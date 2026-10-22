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
        <div>
          <p><RevealWords text="From his Mumbai studio, Prakash Bal Joshi follows an intuitive practice in oil and acrylic. Each painting begins with a mark, and finds its own course." /></p>
        </div>
      </section>

      <section className="story-philosophy" aria-label="Artistic quote">
        <div className="philosophy-inner" data-scroll-reveal>
          <blockquote className="philosophy-quote">
            &ldquo;Water carries human memory, ecological fragility, and the quiet rhythm of time. Each canvas begins without preconception—a mark that finds its own course.&rdquo;
          </blockquote>
          <p className="philosophy-byline">
            {artistData.diacriticName}
          </p>
        </div>
      </section>

      {/* Selected Works and scrolling gallery section hidden per user request */}
      {/*
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
      */}

      <ImageArchive />

      <section className="story-contact" aria-labelledby="story-contact-title">
        <div className="story-contact-inner" data-scroll-reveal>
          <h2 id="story-contact-title">Connecting with<br /><span>the studio.</span></h2>
          <div>
            <a href={`mailto:${artistData.contact.email}`} className="story-email">
              <span>{artistData.contact.email}</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
