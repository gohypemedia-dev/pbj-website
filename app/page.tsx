"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { artistData } from "@/data/artist";
import { artworksData, Artwork } from "@/data/artworks";
import { exhibitionsData } from "@/data/exhibitions";
import ArtworkCard from "@/components/ArtworkCard";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import { ArrowRight, Maximize2 } from "lucide-react";

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState<Artwork | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Hero Featured Artwork (Prominent landscape artwork on the right)
  const heroFeaturedArtwork =
    artworksData.find((a) => a.featuredInHero) || artworksData[0];

  // Opening asymmetric row of three complementary artworks immediately below
  const lowerRowArtworks = [
    artworksData.find((a) => a.lowerRowPosition === 1) || artworksData[1],
    artworksData.find((a) => a.lowerRowPosition === 2) || artworksData[2],
    artworksData.find((a) => a.lowerRowPosition === 3) || artworksData[3]
  ];

  // Distinct approved artworks for the curated homepage preview — eliminates repetition of the first four
  const additionalCuratedWorks = artworksData.filter(
    (a) => !a.featuredInHero && !a.featuredInLowerRow
  );

  // Lightbox navigation
  const handleNextLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworksData.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const nextIndex =
      currentIndex >= artworksData.length - 1 ? 0 : currentIndex + 1;
    setSelectedArtwork(artworksData[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworksData.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const prevIndex =
      currentIndex <= 0 ? artworksData.length - 1 : currentIndex - 1;
    setSelectedArtwork(artworksData[prevIndex]);
  };

  return (
    <div className="w-full bg-[#E9ECEF] text-[#38435C]">
      {/* ======================================================== */}
      {/* SECTION 1: FIRST VIEWPORT / OPENING ART-DIRECTED SUITE   */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-[#1B2A49]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Artist Name & Concise Intro (~7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:space-y-6 pr-0 lg:pr-4">
            <div className="space-y-2.5">
              <span className="eyebrow-label text-[#1B2A49]/80 block">
                Contemporary Indian Abstract Artist &amp; Writer
              </span>

              {/* Balanced Artist Name with Intentional Line Breaks and Diacritics */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-[4.4rem] font-bold tracking-[0.06em] text-[#1B2A49] leading-[1.04] uppercase">
                <span className="block">PRĀKASH BĀL</span>
                <span className="block">JOSHI</span>
              </h1>
            </div>

            {/* Concise Editorial Introduction */}
            <p className="font-body text-base sm:text-lg lg:text-[1.2rem] leading-relaxed text-[#38435C] max-w-xl">
              {artistData.conciseIntro}
            </p>

            {/* Restrained Navigation: Exactly two clear CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 font-heading text-xs sm:text-sm uppercase tracking-[0.15em]">
              <Link
                href="/works"
                className="gallery-link font-bold text-[#1B2A49] inline-flex items-center space-x-2"
              >
                <span>View Works</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/about"
                className="gallery-link text-[#38435C] hover:text-[#1B2A49]"
              >
                About the Artist
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Landscape-Format Artwork (~5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="artwork-frame group relative aspect-[3/2] w-full overflow-hidden bg-[#1B2A49]/5 border border-[#1B2A49]/15 rounded-sm">
              <Link
                href={`/works/${heroFeaturedArtwork.id}`}
                className="block w-full h-full relative"
                aria-label={`View featured artwork: ${heroFeaturedArtwork.title}`}
              >
                <Image
                  src={heroFeaturedArtwork.image}
                  alt={`${heroFeaturedArtwork.title} by Prakash Bal Joshi`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="artwork-img-hover object-cover w-full h-full transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Enlarge Trigger */}
              <button
                type="button"
                onClick={() => setSelectedArtwork(heroFeaturedArtwork)}
                className="absolute bottom-2.5 right-2.5 p-1.5 bg-[#E9ECEF]/95 text-[#1B2A49] rounded-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity border border-[#1B2A49]/20 shadow text-xs font-heading tracking-wider flex items-center space-x-1"
                aria-label={`Enlarge ${heroFeaturedArtwork.title}`}
              >
                <Maximize2 size={13} />
                <span className="text-[11px] uppercase">Enlarge</span>
              </button>
            </div>

            {/* Featured Painting Caption */}
            <div className="mt-2.5 flex items-baseline justify-between text-left gap-2">
              <div>
                <Link
                  href={`/works/${heroFeaturedArtwork.id}`}
                  className="font-heading text-base font-bold text-[#1B2A49] hover:underline"
                >
                  {heroFeaturedArtwork.title}
                </Link>
                <span className="font-body text-xs text-[#38435C] italic ml-2">
                  {heroFeaturedArtwork.medium}
                </span>
              </div>
              <span className="font-heading text-xs text-[#38435C]/80 font-medium shrink-0">
                {heroFeaturedArtwork.year}
              </span>
            </div>
            <p className="font-body text-xs text-[#38435C]/75">
              {heroFeaturedArtwork.dimensions} &middot; {heroFeaturedArtwork.series}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRIC ROW OF THREE COMPLEMENTARY ARTWORKS           */}
        {/* Aligned deliberately along top edges                     */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#1B2A49]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Artwork 1: Left (Portrait format, 3 cols) */}
            <div className="md:col-span-3">
              <ArtworkCard
                artwork={lowerRowArtworks[0]}
                onOpenLightbox={(artwork) => setSelectedArtwork(artwork)}
              />
            </div>

            {/* Artwork 2: Center (Square format, 4 cols) */}
            <div className="md:col-span-4">
              <ArtworkCard
                artwork={lowerRowArtworks[1]}
                onOpenLightbox={(artwork) => setSelectedArtwork(artwork)}
              />
            </div>

            {/* Artwork 3: Right (Wider work, 5 cols) */}
            <div className="md:col-span-5">
              <ArtworkCard
                artwork={lowerRowArtworks[2]}
                onOpenLightbox={(artwork) => setSelectedArtwork(artwork)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: DISTINCT SELECTED WORKS (NO REPETITION)       */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#1B2A49]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#1B2A49]/10 gap-4">
          <div>
            <span className="eyebrow-label text-[#1B2A49]">Curated Portfolio</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] mt-1">
              Selected Works
            </h2>
          </div>
          <Link
            href="/works"
            className="font-heading text-xs uppercase tracking-wider font-semibold text-[#1B2A49] gallery-link"
          >
            Complete Archive &rarr;
          </Link>
        </div>

        {/* Grid showing distinct complementary pieces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {additionalCuratedWorks.map((artwork, idx) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={idx < 3}
              onOpenLightbox={(art) => setSelectedArtwork(art)}
            />
          ))}
        </div>

        {/* View All Works CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/works"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all shadow-sm"
          >
            <span>View All Works</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: SHORT ARTIST INTRODUCTION & PHILOSOPHY        */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#1B2A49]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Artist Portrait Photograph */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-[#1B2A49]/15 bg-[#1B2A49]/5 shadow-sm">
              <Image
                src="/artworks/artist-portrait.jpg"
                alt="Prakash Bal Joshi in his Mumbai studio"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="font-body text-xs text-[#38435C]/70 mt-2 text-center sm:text-left">
              Prakash Bal Joshi in his studio &middot; Mumbai
            </p>
          </div>

          {/* Statement & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#1B2A49]">
              Artist Practice &amp; Philosophy
            </span>

            {/* Verified Direct Quote */}
            <blockquote className="font-heading text-2xl sm:text-3xl text-[#1B2A49] font-bold leading-tight border-l-2 border-[#1B2A49] pl-6 py-1">
              &ldquo;Painting is a spontaneous, meditative search. Water—and the memory of rivers—is my metaphor for the relentless flow of life, time, and inner consciousness.&rdquo;
            </blockquote>

            <p className="font-body text-base sm:text-lg leading-relaxed text-[#38435C]">
              {artistData.extendedIntro}
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 font-heading text-xs uppercase tracking-wider font-bold text-[#1B2A49] gallery-link"
              >
                <span>About the Artist</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: CONCISE EXHIBITION PREVIEW (2-3 ENTRIES)       */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#1B2A49]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#1B2A49]/10 gap-4">
          <div>
            <span className="eyebrow-label text-[#1B2A49]">Exhibition Highlights</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] mt-1">
              Recent Exhibitions
            </h2>
          </div>
          <Link
            href="/exhibitions"
            className="font-heading text-xs uppercase tracking-wider font-semibold text-[#1B2A49] gallery-link"
          >
            Complete History &rarr;
          </Link>
        </div>

        {/* Exactly 3 concise entries */}
        <div className="divide-y divide-[#1B2A49]/10">
          {exhibitionsData.slice(0, 3).map((exh) => (
            <div
              key={exh.id}
              className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline group hover:bg-white/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded transition-colors"
            >
              <div className="md:col-span-2">
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A49]">
                  {exh.year}
                </span>
                <span className="block text-xs uppercase tracking-wider text-[#38435C]/75 font-heading">
                  {exh.type}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#1B2A49]">
                  {exh.title}
                </h3>
                <p className="font-body text-xs text-[#38435C] italic">
                  {exh.venue} &middot; {exh.city}, {exh.country}
                </p>
              </div>

              <div className="md:col-span-5 text-sm text-[#38435C] font-body leading-relaxed">
                <p>{exh.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: CONCISE STUDIO INVITATION & CONTACT           */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-18">
        <div className="bg-white/40 border border-[#1B2A49]/12 rounded-sm p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="eyebrow-label text-[#1B2A49]">
              Studio Enquiries
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A49]">
              Acquisitions, Collaborations &amp; Studio Appointments
            </h2>
            <p className="font-body text-sm text-[#38435C] leading-relaxed">
              For collectors, galleries, and institutions interested in original works or studio visits in Mumbai.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.14em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center"
            >
              Contact the Studio
            </Link>

            <a
              href={`mailto:${artistData.contact.email}`}
              className="px-6 py-3 bg-white/70 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs uppercase tracking-[0.14em] font-semibold rounded-sm hover:bg-white transition-all text-center"
            >
              {artistData.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onInquire={(art) => {
          setSelectedArtwork(null);
          setEnquiryArtwork(art);
          setIsEnquiryOpen(true);
        }}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        artwork={enquiryArtwork}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
