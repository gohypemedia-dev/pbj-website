"use client";

import React, { useState } from "react";
import Link from "next/link";
import { artworksData, artworkCategories, Artwork } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import { ArrowLeft } from "lucide-react";

export default function WorksPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState<Artwork | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredArtworks =
    activeCategory === "all"
      ? artworksData
      : artworksData.filter((a) => a.collectionId === activeCategory);

  const handleNextLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworksData.findIndex((a) => a.id === selectedArtwork.id);
    const nextIndex = currentIndex >= artworksData.length - 1 ? 0 : currentIndex + 1;
    setSelectedArtwork(artworksData[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = artworksData.findIndex((a) => a.id === selectedArtwork.id);
    const prevIndex = currentIndex <= 0 ? artworksData.length - 1 : currentIndex - 1;
    setSelectedArtwork(artworksData[prevIndex]);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
      {/* Editorial Header */}
      <div className="mb-10 pb-8 border-b border-[#1B2A49]/10">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-4"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>

        <span className="eyebrow-label text-[#1B2A49] block">
          Curated Portfolio &amp; Archive
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-2">
          Selected Works
        </h1>
        <p className="font-body text-base sm:text-lg text-[#38435C] max-w-2xl mt-2 leading-relaxed">
          Spontaneous abstract expressionism spanning monumental canvases, delicate mixed-media studies, and heavy impasto oils.
        </p>

        {/* Category Filter Tabs: Consistent row beneath the introduction */}
        <div
          className="mt-8 pt-6 border-t border-[#1B2A49]/10 flex flex-wrap items-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Filter works by collection"
        >
          {artworkCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat.id)}
                className={`gallery-filter-btn ${
                  isSelected
                    ? "active !bg-[#1B2A49] !text-[#E9ECEF] !border-[#1B2A49]"
                    : ""
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {filteredArtworks.map((artwork, idx) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            priority={idx < 4}
            onOpenLightbox={(art) => setSelectedArtwork(art)}
          />
        ))}
      </div>

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
