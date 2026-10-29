"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorksLightbox({
  artwork,
  triggerElement,
  onClose,
  onPrev,
  onNext,
  onInquire
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus management & keyboard navigation
  useEffect(() => {
    if (!artwork) return;

    // Save previous active element if not passed in triggerElement
    const previousFocus = triggerElement || document.activeElement;

    // Move focus into modal
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
      } else if (e.key === "Tab") {
        // Trap focus inside modal
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "unset";
      // Restore focus to triggering control on close
      if (previousFocus && typeof previousFocus.focus === "function") {
        setTimeout(() => {
          previousFocus.focus();
        }, 50);
      }
    };
  }, [artwork, onClose, onPrev, onNext, triggerElement]);

  if (!artwork) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${artwork.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#E9ECEF] p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Shell: Stable container sizing across viewport */}
      <div
        className="relative w-full max-w-6xl h-full max-h-[100dvh] sm:max-h-[96dvh] flex flex-col justify-between overflow-hidden bg-[#E9ECEF]"
        style={{ maxHeight: "calc(100dvh - 16px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header & Controls Area */}
        <header className="w-full shrink-0 flex items-center justify-between text-[#1B2A49] pb-2 sm:pb-3 border-b border-[#1B2A49]/10 px-1 sm:px-2">
          <div className="text-left pr-3 min-w-0">
            {artwork.series && (
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#38435C]/80 font-heading block truncate">
                {artwork.series}
              </span>
            )}
            <h3 className="font-heading text-base sm:text-xl lg:text-2xl font-bold text-[#1B2A49] leading-tight truncate">
              {artwork.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {onInquire && (
              <button
                type="button"
                onClick={() => onInquire(artwork)}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-[#1B2A49]/25 bg-white/80 hover:bg-white text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#1B2A49] transition-all cursor-pointer"
                title={`Enquire about ${artwork.title}`}
              >
                <span className="hidden sm:inline">Enquire About This Work</span>
                <span className="sm:hidden">Enquire</span>
              </button>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-[#1B2A49] border border-[#1B2A49]/15 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A49] transition-colors cursor-pointer"
              aria-label="Close enlarged view"
            >
              <X size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </header>

        {/* 2. Central Presentation: Stable Stage with Reserved Anchor Controls */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-between relative py-2 sm:py-3">
          {/* Previous Arrow - Stable Reserved Side Anchor */}
          <div className="shrink-0 z-20 flex items-center justify-center w-10 sm:w-14 lg:w-16">
            {onPrev ? (
              <button
                type="button"
                onClick={onPrev}
                className="p-2 sm:p-3.5 rounded-full bg-white/80 hover:bg-white text-[#1B2A49] border border-[#1B2A49]/15 focus:outline-none focus:ring-2 focus:ring-[#1B2A49] transition-all shadow-sm sm:shadow-md active:scale-95 cursor-pointer"
                aria-label="Previous artwork"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
            ) : (
              <div className="w-10 sm:w-14 lg:w-16" aria-hidden="true" />
            )}
          </div>

          {/* Standardised Artwork Stage Area: Stable Width & Height for Every Artwork */}
          <div className="flex-1 min-h-0 h-full w-full relative flex items-center justify-center mx-1 sm:mx-2">
            <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
              <Image
                key={artwork.id}
                src={artwork.image}
                alt={`${artwork.title} by ${artwork.artist}${artwork.year ? ` (${artwork.year})` : ""}`}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 80vw, 1200px"
                className="object-contain object-center drop-shadow-2xl select-none"
                priority
              />
            </div>
          </div>

          {/* Next Arrow - Stable Reserved Side Anchor */}
          <div className="shrink-0 z-20 flex items-center justify-center w-10 sm:w-14 lg:w-16">
            {onNext ? (
              <button
                type="button"
                onClick={onNext}
                className="p-2 sm:p-3.5 rounded-full bg-white/80 hover:bg-white text-[#1B2A49] border border-[#1B2A49]/15 focus:outline-none focus:ring-2 focus:ring-[#1B2A49] transition-all shadow-sm sm:shadow-md active:scale-95 cursor-pointer"
                aria-label="Next artwork"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            ) : (
              <div className="w-10 sm:w-14 lg:w-16" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* 3. Separate Artwork Caption Area */}
        <footer className="w-full shrink-0 pt-2 sm:pt-3 border-t border-[#1B2A49]/10 px-1 sm:px-2 max-h-[22vh] sm:max-h-[16vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[#38435C] text-xs sm:text-sm gap-1.5 sm:gap-2">
            <div className="text-center sm:text-left leading-relaxed">
              <span className="font-heading uppercase tracking-wider text-[11px] sm:text-xs text-[#1B2A49] font-medium mr-2">
                Artist: {artwork.artist}
              </span>
              <span className="font-body italic text-[#38435C]">
                {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
              </span>
            </div>

            <p className="text-[11px] text-[#38435C]/60 hidden lg:block shrink-0">
              Use <kbd className="px-1.5 py-0.5 bg-black/5 border border-[#1B2A49]/10 rounded text-[10px] text-[#1B2A49]">←</kbd> <kbd className="px-1.5 py-0.5 bg-black/5 border border-[#1B2A49]/10 rounded text-[10px] text-[#1B2A49]">→</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-black/5 border border-[#1B2A49]/10 rounded text-[10px] text-[#1B2A49]">Esc</kbd> to close
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
