"use client";

import React, { useState } from "react";
import { worksArtworksData } from "@/works/worksData";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import ArtistHero from "@/components/ArtistHero";
import HomeScrollSections from "@/components/HomeScrollSections";

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [enquiryArtwork, setEnquiryArtwork] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Lightbox navigation cycling through the 21 Works catalogue items
  const handleNextLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = worksArtworksData.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const nextIndex =
      currentIndex >= worksArtworksData.length - 1 ? 0 : currentIndex + 1;
    setSelectedArtwork(worksArtworksData[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedArtwork) return;
    const currentIndex = worksArtworksData.findIndex(
      (a) => a.id === selectedArtwork.id
    );
    const prevIndex =
      currentIndex <= 0 ? worksArtworksData.length - 1 : currentIndex - 1;
    setSelectedArtwork(worksArtworksData[prevIndex]);
  };

  return (
    <div className="w-full bg-[#E9ECEF] text-[#38435C] relative">
      {/* Sticky Parallax Hero Section */}
      <div className="hero-sticky-container">
        <ArtistHero onOpenArtwork={setSelectedArtwork} />
      </div>

      {/* Next Section that scrolls on top with parallax curtain reveal */}
      <div className="next-section-overlay">
        <HomeScrollSections onOpenArtwork={setSelectedArtwork} />
      </div>

      {/* Interactive Lightbox Modal */}
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

      {/* Acquisition & Studio Enquiry Modal */}
      <EnquiryModal
        artwork={enquiryArtwork}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
