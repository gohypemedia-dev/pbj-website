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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2A49]/90 backdrop-blur-md p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Shell */}
      <div
        className="relative max-w-6xl w-full max-h-[96vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between text-[#E9ECEF] pb-3 border-b border-[#E9ECEF]/10">
          <div className="text-left pr-4">
            {artwork.series && (
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E9ECEF]/70 font-heading block">
                {artwork.series}
              </span>
            )}
            <h3 className="font-heading text-lg sm:text-2xl font-bold text-[#E9ECEF] leading-tight">
              {artwork.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {onInquire && (
              <button
                type="button"
                onClick={() => onInquire(artwork)}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#E9ECEF] text-[#1B2A49] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-colors"
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
              className="p-2 sm:p-2.5 rounded-full bg-[#E9ECEF]/10 text-[#E9ECEF] hover:bg-[#E9ECEF]/20 focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-colors"
              aria-label="Close enlarged view"
            >
              <X size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </div>

        {/* Central Presentation: Full Painting without Cropping or Distortion */}
        <div className="relative w-full h-[60vh] sm:h-[68vh] lg:h-[72vh] flex items-center justify-center my-auto py-2">
          {/* Previous Arrow */}
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-1 sm:left-3 z-10 p-2.5 sm:p-3 rounded-full bg-[#1B2A49]/70 text-[#E9ECEF] hover:bg-[#1B2A49] focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-all shadow-lg"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={22} className="sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Painting Image - Uncropped Natural Aspect Ratio */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={artwork.image}
              alt={`${artwork.title} by ${artwork.artist}${artwork.year ? ` (${artwork.year})` : ""}`}
              width={artwork.width}
              height={artwork.height}
              className="max-h-[58vh] sm:max-h-[66vh] lg:max-h-[70vh] w-auto max-w-full object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Next Arrow */}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-1 sm:right-3 z-10 p-2.5 sm:p-3 rounded-full bg-[#1B2A49]/70 text-[#E9ECEF] hover:bg-[#1B2A49] focus:outline-none focus:ring-2 focus:ring-[#E9ECEF] transition-all shadow-lg"
              aria-label="Next artwork"
            >
              <ChevronRight size={22} className="sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Bottom Metadata Bar */}
        <div className="w-full pt-3 border-t border-[#E9ECEF]/10 flex flex-col sm:flex-row items-center justify-between text-[#E9ECEF]/80 text-xs sm:text-sm gap-2">
          <div className="text-center sm:text-left">
            <span className="font-heading uppercase tracking-wider text-[11px] sm:text-xs text-[#E9ECEF]/70 mr-2">
              Artist: {artwork.artist}
            </span>
            <span className="font-body italic text-[#E9ECEF]/90">
              {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
            </span>
          </div>

          <p className="text-[11px] text-[#E9ECEF]/50 hidden sm:block">
            Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">→</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}

