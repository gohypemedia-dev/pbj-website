"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

/**
 * @param {object} props
 * @param {any} [props.artwork]
 * @param {() => void} props.onClose
 * @param {(() => void)} [props.onPrev]
 * @param {(() => void)} [props.onNext]
 * @param {((artwork: any) => void)} [props.onInquire]
 */
export default function LightboxModal({
  artwork,
  onClose,
  onPrev,
  onNext,
  onInquire
}) {
  const closeButtonRef = useRef(null);

  // Focus restoration & keyboard navigation
  useEffect(() => {
    if (!artwork) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [artwork, onClose, onPrev, onNext]);

  if (!artwork) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${artwork.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2A49]/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Container */}
      <div
        className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="w-full flex items-center justify-between text-[#E9ECEF] pb-4">
          <div className="text-left">
            <span className="text-xs uppercase tracking-widest text-[#E9ECEF]/70 font-heading">
              {artwork.series || "Original Artwork"}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#E9ECEF]">
              {artwork.title}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            {onInquire && (
              <button
                type="button"
                onClick={() => onInquire(artwork)}
                className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-[#E9ECEF] text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#E9ECEF]/90 transition-colors cursor-pointer"
              >
                <span>Acquisition Enquiry</span>
                <ArrowRight size={13} />
              </button>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#E9ECEF]/10 text-[#E9ECEF] hover:bg-[#E9ECEF]/20 focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-colors cursor-pointer"
              aria-label="Close enlarged view"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Central High-Resolution Artwork Presentation */}
        <div className="relative w-full h-[62vh] sm:h-[70vh] flex items-center justify-center my-auto">
          {/* Previous Arrow */}
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-[#1B2A49]/60 text-[#E9ECEF] hover:bg-[#1B2A49] focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-all cursor-pointer"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Painting Image */}
          <div className="relative w-full h-full max-w-full max-h-full">
            <Image
              src={artwork.image}
              alt={`${artwork.title} by ${artwork.artist || "Prakash Bal Joshi"}`}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Next Arrow */}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-[#1B2A49]/60 text-[#E9ECEF] hover:bg-[#1B2A49] focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-all cursor-pointer"
              aria-label="Next artwork"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Metadata & Links Bar */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-[#E9ECEF]/80 text-xs sm:text-sm mt-2 gap-2">
          <p className="font-body italic text-center sm:text-left">
            {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
          </p>

          <div className="flex items-center space-x-4">
            <Link
              href="/works"
              onClick={onClose}
              className="hover:text-white underline underline-offset-4 font-heading uppercase tracking-wider text-xs"
            >
              Explore Full Collection in Works &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
