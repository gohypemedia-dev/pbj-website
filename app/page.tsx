"use client";

import React, { useState } from "react";
import { artworksData, Artwork } from "@/data/artworks";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import ArtistHero from "@/components/ArtistHero";
import HomeScrollSections from "@/components/HomeScrollSections";

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState<Artwork | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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
    <div className="w-full bg-[#E9ECEF] text-[#38435C] relative">
      {/* Sticky Parallax Hero Section */}
      <div className="hero-sticky-container">
        <ArtistHero />
      </div>

      {/* Next Section that scrolls on top with parallax curtain reveal */}
      <div className="next-section-overlay">
        <HomeScrollSections onOpenArtwork={setSelectedArtwork} />
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
