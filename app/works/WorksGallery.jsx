"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ExternalLink } from "lucide-react";
import { worksArtworksData } from "./worksData";
import WorksCard from "./WorksCard";
import WorksLightbox from "./WorksLightbox";
import WorksEnquiryModal from "./WorksEnquiryModal";

export default function WorksGallery() {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
  const [lightboxTrigger, setLightboxTrigger] = useState(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState(null);
  const [enquiryTrigger, setEnquiryTrigger] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const selectedArtwork =
    selectedArtworkIndex !== null ? worksArtworksData[selectedArtworkIndex] : null;

  const handleNextLightbox = () => {
    setSelectedArtworkIndex((prev) =>
      prev === null ? 0 : (prev + 1) % worksArtworksData.length
    );
  };

  const handlePrevLightbox = () => {
    setSelectedArtworkIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + worksArtworksData.length) % worksArtworksData.length
    );
  };

  const handleOpenLightbox = (artwork, triggerEl) => {
    const idx = worksArtworksData.findIndex((a) => a.id === artwork.id);
    setLightboxTrigger(triggerEl || null);
    setSelectedArtworkIndex(idx >= 0 ? idx : 0);
  };

  const handleCloseLightbox = () => {
    setSelectedArtworkIndex(null);
  };

  const handleOpenEnquiry = (artwork, triggerEl) => {
    setEnquiryTrigger(triggerEl || null);
    setEnquiryArtwork(artwork || null);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 py-8 lg:py-12 text-left">
      {/* Editorial Header */}
      <header className="mb-8 sm:mb-12 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3 text-left">
          <ol className="flex items-center space-x-2 text-xs font-heading uppercase tracking-widest text-[#38435C]/80">
            <li>
              <Link
                href="/"
                className="hover:text-[#1B2A49] transition-colors inline-flex items-center space-x-1"
              >
                <ArrowLeft size={13} className="mr-0.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-[#1B2A49]/40">/</li>
            <li className="text-[#1B2A49] font-semibold" aria-current="page">
              Works
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A49] tracking-tight leading-[1.15] text-left">
          Works
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[#38435C] max-w-3xl mt-2 leading-relaxed text-left">
          Joshi’s painting practice includes recurring bodies of work that explore abstraction,
          nature, urban change and the relationship between memory and consciousness.
        </p>
      </header>

      {/* Artworks Catalogue Grid */}
      {/* Consistent row-based layout: 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <section
        id="works-gallery-panel"
        aria-label="Paintings Catalogue"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start text-left"
      >
        {worksArtworksData.map((artwork, idx) => (
          <WorksCard
            key={artwork.id}
            artwork={artwork}
            priority={idx < 3}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </section>

      {/* Compact Closing Section: Studio Acquisition & Enquiry */}
      <section className="mt-16 sm:mt-24 pt-8 sm:pt-12 text-left">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] text-left">
          Enquire About a Work
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#38435C] mt-2 text-left">
          For further information on the portfolio and pricing, contact the studio.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-left">
          <a
            href="mailto:studio@prakashbaljoshi.com?subject=Portfolio%20and%20Pricing%20Enquiry%20-%20Prakash%20Bal%20Joshi"
            className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#1B2A49] hover:bg-[#253961] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs cursor-pointer min-h-[44px]"
          >
            <Mail size={14} />
            <span>studio@prakashbaljoshi.com</span>
            <ExternalLink size={12} className="opacity-75" />
          </a>
        </div>
      </section>

      {/* Artwork Detail Viewer (Lightbox Modal) */}
      {selectedArtwork && (
        <WorksLightbox
          artwork={selectedArtwork}
          currentIndex={selectedArtworkIndex}
          totalCount={worksArtworksData.length}
          triggerElement={lightboxTrigger}
          onClose={handleCloseLightbox}
          onPrev={worksArtworksData.length > 1 ? handlePrevLightbox : undefined}
          onNext={worksArtworksData.length > 1 ? handleNextLightbox : undefined}
          onInquire={(art) => {
            handleCloseLightbox();
            handleOpenEnquiry(art, lightboxTrigger);
          }}
        />
      )}

      {/* Acquisition & Studio Enquiry Modal */}
      <WorksEnquiryModal
        artwork={enquiryArtwork}
        triggerElement={enquiryTrigger}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
