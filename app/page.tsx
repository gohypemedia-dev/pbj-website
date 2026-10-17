"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { artistData } from "@/data/artist";
import {
  artworksData,
  artworkCategories,
  Artwork
} from "@/data/artworks";
import { exhibitionsData } from "@/data/exhibitions";
import ArtworkCard from "@/components/ArtworkCard";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import {
  ArrowRight,
  Maximize2,
  Mail,
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState<Artwork | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Hero Featured Artwork (Prominent landscape artwork on the right)
  const heroFeaturedArtwork =
    artworksData.find((a) => a.featuredInHero) || artworksData[0];

  // Asymmetric lower row of three artworks immediately below
  const lowerRowArtworks = [
    artworksData.find((a) => a.lowerRowPosition === 1) || artworksData[1],
    artworksData.find((a) => a.lowerRowPosition === 2) || artworksData[2],
    artworksData.find((a) => a.lowerRowPosition === 3) || artworksData[3]
  ];

  // Filtered works for curated gallery section
  const filteredArtworks =
    activeCategory === "all"
      ? artworksData
      : artworksData.filter((a) => a.collectionId === activeCategory);

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
      {/* SECTION 1: FIRST VIEWPORT / IMAGE 2 ART-DIRECTED HERO    */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 border-b border-[#1B2A49]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Artist Name & Concise Intro (~7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 pr-0 lg:pr-4">
            <div className="space-y-3">
              <span className="eyebrow-label text-[#1B2A49]/80 block">
                Contemporary Indian Abstract Artist &amp; Writer
              </span>

              {/* Large Artist Name with Approved Diacritics */}
              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl xl:text-[5.2rem] font-bold tracking-[0.04em] text-[#1B2A49] leading-[0.98] uppercase">
                {artistData.diacriticName}
              </h1>
            </div>

            {/* Concise Editorial Introduction */}
            <p className="font-body text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed text-[#38435C] max-w-2xl">
              {artistData.conciseIntro}
            </p>

            {/* Restrained Navigation / Links */}
            <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 font-heading text-xs sm:text-sm uppercase tracking-[0.16em]">
              <Link
                href="/works"
                className="gallery-link font-bold text-[#1B2A49] inline-flex items-center space-x-2"
              >
                <span>View Selected Works</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/about"
                className="gallery-link text-[#38435C] hover:text-[#1B2A49]"
              >
                About the Practice
              </Link>

              <Link
                href="/contact"
                className="gallery-link text-[#38435C] hover:text-[#1B2A49]"
              >
                Studio Inquiries
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Landscape-Format Artwork (~5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="artwork-frame group relative aspect-[3/2] w-full overflow-hidden bg-[#1B2A49]/5 border border-[#1B2A49]/15 rounded-sm shadow-sm">
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
                className="absolute bottom-3 right-3 p-2 bg-[#E9ECEF]/90 text-[#1B2A49] rounded-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity border border-[#1B2A49]/20 shadow text-xs font-heading font-medium tracking-wider flex items-center space-x-1"
                aria-label={`Enlarge ${heroFeaturedArtwork.title}`}
              >
                <Maximize2 size={13} />
                <span className="hidden sm:inline">Enlarge</span>
              </button>
            </div>

            {/* Featured Painting Caption */}
            <div className="mt-3 flex items-baseline justify-between text-left">
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
              <span className="font-mono text-xs text-[#38435C]/80">
                {heroFeaturedArtwork.year}
              </span>
            </div>
            <p className="text-xs text-[#38435C]/75 font-mono">
              {heroFeaturedArtwork.dimensions} &middot; {heroFeaturedArtwork.series}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRIC ROW OF THREE ARTWORKS IMMEDIATELY BELOW       */}
        {/* Translates Image 2 lower gallery row:                   */}
        {/* Left: Portrait / Center: Square / Right: Wider landscape */}
        {/* ======================================================== */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-[#1B2A49]/10">
          <div className="mb-6 flex items-center justify-between">
            <span className="eyebrow-label text-[#1B2A49]">
              Featured Gallery Row &middot; Curatorial Selection
            </span>
            <span className="text-xs text-[#38435C]/70 font-mono hidden sm:inline">
              3-Artwork Asymmetric Suite
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-end">
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
      {/* SECTION 2: CURATED ARTWORK GALLERY & INTERACTIVE FILTERS  */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 border-b border-[#1B2A49]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1B2A49]/10 gap-6">
          <div>
            <span className="eyebrow-label text-[#1B2A49]">Portfolio Archive</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1B2A49] mt-1">
              Selected Works
            </h2>
          </div>

          {/* Meaningful Category Filters */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter artworks by collection"
          >
            {artworkCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-heading uppercase tracking-wider rounded-sm transition-all border ${
                    isSelected
                      ? "bg-[#1B2A49] text-[#E9ECEF] border-[#1B2A49] font-bold"
                      : "bg-white/40 text-[#38435C] border-[#1B2A49]/15 hover:bg-white/80 hover:text-[#1B2A49]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid: Respects Natural Proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredArtworks.map((artwork, idx) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={idx < 3}
              onOpenLightbox={(art) => setSelectedArtwork(art)}
              showCuratorNote={true}
            />
          ))}
        </div>

        {/* View All in Works Page Link */}
        <div className="mt-14 text-center">
          <Link
            href="/works"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all shadow-sm"
          >
            <span>Explore Complete Works Archive</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: ARTIST INTRODUCTION & PHILOSOPHY (ABOUT TEASER)*/}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 border-b border-[#1B2A49]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
            <p className="text-xs text-[#38435C]/70 font-mono mt-2 text-center sm:text-left">
              Prakash Bal Joshi in his Mumbai artist studio &middot; Monograph archive
            </p>
          </div>

          {/* Statement & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-label text-[#1B2A49]">
              The Artist &amp; His Philosophy
            </span>

            {/* Pull Quote */}
            <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#1B2A49] font-bold leading-tight">
              &ldquo;Painting is a spontaneous, meditative search. Water—and the memory of rivers—is my metaphor for the relentless flow of life, time, and inner consciousness.&rdquo;
            </blockquote>

            <p className="font-body text-base sm:text-lg leading-relaxed text-[#38435C]">
              {artistData.extendedIntro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1B2A49]/10">
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider text-[#1B2A49] font-bold mb-1">
                  Journalist &amp; Author
                </h3>
                <p className="text-sm font-body text-[#38435C] leading-normal">
                  Decades with <em>The Times of India</em> inform his analytical perspective, complemented by award-winning published fiction translated into French, German, and English.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider text-[#1B2A49] font-bold mb-1">
                  Global Collections
                </h3>
                <p className="text-sm font-body text-[#38435C] leading-normal">
                  Permanently accessioned into museums and public galleries across Las Vegas, Lisbon, Russia, and Switzerland.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 font-heading text-sm uppercase tracking-wider font-bold text-[#1B2A49] gallery-link"
              >
                <span>Read Comprehensive Biography &amp; Themes</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: EXHIBITION HIGHLIGHTS (VERIFIED HISTORICAL RECORDS)*/}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 border-b border-[#1B2A49]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#1B2A49]/10 gap-4">
          <div>
            <span className="eyebrow-label text-[#1B2A49]">Selected Milestones</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1B2A49] mt-1">
              Exhibitions &amp; Institutional Showcases
            </h2>
          </div>
          <Link
            href="/exhibitions"
            className="font-heading text-xs uppercase tracking-wider font-semibold text-[#1B2A49] gallery-link"
          >
            All Exhibitions &rarr;
          </Link>
        </div>

        <div className="divide-y divide-[#1B2A49]/10">
          {exhibitionsData.slice(0, 4).map((exh) => (
            <div
              key={exh.id}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-white/30 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded transition-colors"
            >
              <div className="md:col-span-2">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49]">
                  {exh.year}
                </span>
                <span className="block text-xs uppercase tracking-wider text-[#38435C]/75 font-mono">
                  {exh.type}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1B2A49]">
                  {exh.title}
                </h3>
                <p className="font-serif text-sm text-[#38435C] italic mt-0.5">
                  {exh.venue} &middot; {exh.city}, {exh.country}
                </p>
                {exh.dates && (
                  <p className="text-xs text-[#38435C]/70 mt-1 font-mono">
                    {exh.dates}
                  </p>
                )}
              </div>

              <div className="md:col-span-5 text-sm text-[#38435C] font-body leading-relaxed">
                <p>{exh.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: RESTRAINED STUDIO ENQUIRY & CONTACT BANNER    */}
      {/* ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="bg-white/40 border border-[#1B2A49]/15 rounded-sm p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow-label text-[#1B2A49]">
              Studio Inquiries &amp; Curatorial Loan
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49]">
              Acquisitions, Archival Research &amp; Studio Appointments
            </h2>
            <p className="font-body text-base text-[#38435C] leading-relaxed">
              For gallery representation inquiries, museum acquisitions, or to schedule a studio visit in Mumbai, please reach out directly to the studio archive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setEnquiryArtwork(null);
                setIsEnquiryOpen(true);
              }}
              className="px-6 py-3.5 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center"
            >
              Initiate Studio Enquiry
            </button>

            <a
              href={`mailto:${artistData.contact.email}`}
              className="px-6 py-3.5 bg-white/70 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-white transition-all text-center"
            >
              Email Studio Directly
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
