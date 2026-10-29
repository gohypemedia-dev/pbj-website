"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowRight } from "lucide-react";
import {
  worksArtworksData,
  WORKS_SERIES_DESCRIPTIONS,
  WORKS_FILTER_TABS
} from "./worksData";
import WorksCard from "./WorksCard";
import WorksLightbox from "./WorksLightbox";
import WorksEnquiryModal from "./WorksEnquiryModal";

export default function WorksGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [lightboxTrigger, setLightboxTrigger] = useState(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState(null);
  const [enquiryTrigger, setEnquiryTrigger] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const galleryRef = useRef(null);

  // Filter artworks by series (unassigned works remain visible in All Works)
  const filteredArtworks =
    activeCategory === "all"
      ? worksArtworksData
      : worksArtworksData.filter((a) => a.series === activeCategory);

  const handleNextLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex((a) => a.id === selectedArtwork.id);
    const nextIndex = currentIndex >= filteredArtworks.length - 1 ? 0 : currentIndex + 1;
    setSelectedArtwork(filteredArtworks[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = filteredArtworks.findIndex((a) => a.id === selectedArtwork.id);
    const prevIndex = currentIndex <= 0 ? filteredArtworks.length - 1 : currentIndex - 1;
    setSelectedArtwork(filteredArtworks[prevIndex]);
  };

  const handleOpenLightbox = (artwork, triggerEl) => {
    setLightboxTrigger(triggerEl || null);
    setSelectedArtwork(artwork);
  };

  const handleOpenEnquiry = (artwork, triggerEl) => {
    setEnquiryTrigger(triggerEl || null);
    setEnquiryArtwork(artwork || null);
    setIsEnquiryOpen(true);
  };

  const handleScrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine series description display
  const currentSeriesDescription =
    activeCategory !== "all" ? WORKS_SERIES_DESCRIPTIONS[activeCategory] : null;

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Editorial Header */}
      <header className="mb-8 pb-5 flex flex-col items-center sm:items-start text-center sm:text-left border-b border-[#1B2A49]/10">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3 mx-auto sm:mx-0 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>

        <span className="eyebrow-label text-[#1B2A49] block text-center sm:text-left">
          Curated Portfolio &amp; Archive
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5 text-center sm:text-left">
          Selected Works
        </h1>

        <p className="font-heading text-base sm:text-lg font-medium text-[#1B2A49] max-w-2xl mt-2 leading-relaxed text-center sm:text-left mx-auto sm:mx-0">
          Original abstract paintings in oil and acrylic, exhibited from Venice to Las Vegas.
        </p>

        <p className="font-body text-base text-[#38435C] max-w-2xl mt-1.5 leading-relaxed text-center sm:text-left mx-auto sm:mx-0">
          Joshi’s painting practice includes recurring bodies of work that explore abstraction, nature, urban change and the relationship between memory and consciousness.
        </p>

        {/* Action CTAs */}
        <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <button
            type="button"
            onClick={handleScrollToGallery}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#1B2A49]/90 transition-colors cursor-pointer"
          >
            <span>View Paintings</span>
            <ArrowDown size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => handleOpenEnquiry(null, e.currentTarget)}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-[#1B2A49]/30 text-[#1B2A49] bg-white/60 font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-colors cursor-pointer"
          >
            <span>Enquire About a Work</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="mt-6 pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 w-full border-t border-[#1B2A49]/10"
          role="tablist"
          aria-label="Filter works by series"
        >
          {WORKS_FILTER_TABS.map((tab) => {
            const isSelected = activeCategory === tab.id;
            const count =
              tab.id === "all"
                ? worksArtworksData.length
                : worksArtworksData.filter((a) => a.series === tab.id).length;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls="works-gallery-panel"
                onClick={() => setActiveCategory(tab.id)}
                className={`gallery-filter-btn ${
                  isSelected
                    ? "active !bg-[#1B2A49] !text-[#E9ECEF] !border-[#1B2A49]"
                    : ""
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-70 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Series Description Callout Above Gallery */}
        {currentSeriesDescription && (
          <div className="mt-4 p-3.5 bg-white/50 border-l-2 border-[#1B2A49] rounded-sm max-w-2xl text-left">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#1B2A49] block mb-0.5">
              {activeCategory} Series
            </span>
            <p className="font-body text-sm text-[#38435C] italic m-0">
              {currentSeriesDescription}
            </p>
          </div>
        )}
      </header>

      {/* Artworks Grid */}
      {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column. Natural aspect ratios. */}
      <section
        id="works-gallery-panel"
        ref={galleryRef}
        aria-label="Paintings Catalogue"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-start"
      >
        {filteredArtworks.map((artwork, idx) => (
          <WorksCard
            key={artwork.id}
            artwork={artwork}
            priority={idx < 3}
            onOpenLightbox={handleOpenLightbox}
            onInquire={handleOpenEnquiry}
          />
        ))}
      </section>

      {/* Works-Only Lightbox Modal */}
      <WorksLightbox
        artwork={selectedArtwork}
        triggerElement={lightboxTrigger}
        onClose={() => setSelectedArtwork(null)}
        onPrev={filteredArtworks.length > 1 ? handlePrevLightbox : undefined}
        onNext={filteredArtworks.length > 1 ? handleNextLightbox : undefined}
        onInquire={(art) => {
          setSelectedArtwork(null);
          handleOpenEnquiry(art, lightboxTrigger);
        }}
      />

      {/* Works-Only Enquiry Modal */}
      <WorksEnquiryModal
        artwork={enquiryArtwork}
        triggerElement={enquiryTrigger}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}

