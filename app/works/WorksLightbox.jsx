"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Mail,
  ExternalLink
} from "lucide-react";

export default function WorksLightbox({
  artwork,
  currentIndex = 0,
  totalCount = 22,
  triggerElement,
  onClose,
  onPrev,
  onNext,
  onInquire
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Zoom and Pan State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Reset zoom & pan when navigating to a different artwork
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [artwork?.id]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse pan event handlers
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation, focus trap, and background scroll locking
  useEffect(() => {
    if (!artwork) return;

    const previousFocus = triggerElement || document.activeElement;

    // Focus close button initially
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
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      } else if (e.key === "Tab") {
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
      if (previousFocus && typeof previousFocus.focus === "function") {
        setTimeout(() => {
          previousFocus.focus();
        }, 50);
      }
    };
  }, [artwork, onClose, onPrev, onNext, triggerElement, handleZoomIn, handleZoomOut, handleResetZoom]);

  if (!artwork) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork detail: ${artwork.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2A49]/80 backdrop-blur-xs p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Shell: Preserves Aspect Ratio, Desktop Split, Mobile Stack */}
      <div
        className="relative w-full max-w-7xl h-full sm:h-[94dvh] max-h-[100dvh] bg-[#E9ECEF] flex flex-col lg:flex-row overflow-hidden sm:rounded-sm shadow-2xl border border-[#1B2A49]/20"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* ======================================================== */}
        {/* MOBILE TOP CONTROLS BAR (Visible on small screens) */}
        {/* ======================================================== */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-white shrink-0">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1B2A49]">
            {currentIndex + 1} of {totalCount}
          </span>
          <div className="flex items-center space-x-1">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="p-2 min-w-[44px] min-h-[44px] rounded-sm text-[#1B2A49] hover:bg-[#E9ECEF] flex items-center justify-center cursor-pointer"
                aria-label="Previous artwork"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="p-2 min-w-[44px] min-h-[44px] rounded-sm text-[#1B2A49] hover:bg-[#E9ECEF] flex items-center justify-center cursor-pointer"
                aria-label="Next artwork"
              >
                <ChevronRight size={20} />
              </button>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 min-w-[44px] min-h-[44px] rounded-sm text-[#1B2A49] hover:bg-[#E9ECEF] flex items-center justify-center cursor-pointer"
              aria-label="Close artwork detail"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LEFT / TOP: ARTWORK DISPLAY STAGE WITH ZOOM & PAN */}
        {/* ======================================================== */}
        <div className="relative flex-1 min-h-[300px] lg:min-h-0 bg-[#DEE2E6]/60 flex items-center justify-center overflow-hidden p-2 sm:p-6 lg:p-8 select-none">
          {/* Zoom Controls Overlay */}
          <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5 bg-white/90 backdrop-blur-xs border border-[#1B2A49]/15 rounded-sm p-1 shadow-xs">
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="p-2 min-w-[40px] min-h-[40px] rounded text-[#1B2A49] hover:bg-[#E9ECEF] disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Zoom in"
              title="Zoom in (+)"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="p-2 min-w-[40px] min-h-[40px] rounded text-[#1B2A49] hover:bg-[#E9ECEF] disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Zoom out"
              title="Zoom out (-)"
            >
              <ZoomOut size={16} />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-2 min-w-[40px] min-h-[40px] rounded text-[#1B2A49] hover:bg-[#E9ECEF] transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Reset zoom"
                title="Reset zoom (0)"
              >
                <RotateCcw size={15} />
              </button>
            )}
            <span className="text-[11px] font-mono text-[#38435C]/80 px-1.5 hidden sm:inline">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Interactive Artwork Container */}
          <div
            className={`relative w-full h-full flex items-center justify-center ${
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
            }`}
            onMouseDown={handleMouseDown}
          >
            <div
              className="relative w-full h-full max-w-4xl max-h-full transition-transform duration-100 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transformOrigin: "center center"
              }}
            >
              <Image
                key={artwork.id}
                src={artwork.image}
                alt={`${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-contain object-center drop-shadow-md select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT / BOTTOM: ARTWORK METADATA & ACTIONS PANEL */}
        {/* ======================================================== */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 bg-white lg:border-l border-[#1B2A49]/12 flex flex-col justify-between overflow-y-auto p-5 sm:p-7 text-left">
          <div className="space-y-6 text-left">
            {/* Desktop Top Bar: Position & Close Button */}
            <div className="hidden lg:flex items-center justify-between text-left pb-4">
              <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#38435C]/80">
                Artwork {currentIndex + 1} of {totalCount}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-[#E9ECEF] text-[#1B2A49] transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close artwork detail"
              >
                <X size={20} />
              </button>
            </div>

            {/* Artwork Identity */}
            <div className="text-left">
              {artwork.series && (
                <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-[#1B2A49]/70 block mb-1">
                  Series: {artwork.series}
                </span>
              )}
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] leading-tight text-left">
                {artwork.title}
              </h2>
              {artwork.year && (
                <p className="font-heading text-base text-[#38435C]/85 mt-1 text-left font-medium">
                  {artwork.year}
                </p>
              )}
            </div>

            {/* Factual Metadata List */}
            <dl className="space-y-2.5 text-xs sm:text-sm text-[#38435C] py-4 text-left">
              <div className="flex justify-between items-baseline gap-2">
                <dt className="font-heading uppercase tracking-wider text-[11px] text-[#1B2A49]/70 font-semibold">
                  Artist
                </dt>
                <dd className="font-body text-[#1B2A49] font-medium text-right">
                  {artwork.artist}
                </dd>
              </div>

              <div className="flex justify-between items-baseline gap-2">
                <dt className="font-heading uppercase tracking-wider text-[11px] text-[#1B2A49]/70 font-semibold">
                  Medium
                </dt>
                <dd className="font-serif italic text-[#38435C] text-right">
                  {artwork.medium}
                </dd>
              </div>

              {artwork.dimensions && (
                <div className="flex justify-between items-baseline gap-2">
                  <dt className="font-heading uppercase tracking-wider text-[11px] text-[#1B2A49]/70 font-semibold">
                    Dimensions
                  </dt>
                  <dd className="font-sans text-[#38435C] text-right">
                    {artwork.dimensions}
                  </dd>
                </div>
              )}

              <div className="flex justify-between items-baseline gap-2">
                <dt className="font-heading uppercase tracking-wider text-[11px] text-[#1B2A49]/70 font-semibold">
                  Catalogue ID
                </dt>
                <dd className="font-mono text-[11px] text-[#38435C]/75 text-right">
                  {artwork.id}
                </dd>
              </div>
            </dl>

            {/* Factual Note if present */}
            {artwork.title === "PBJ Abstaction 206" && (
              <p className="text-[11px] font-sans text-[#38435C]/70 italic leading-relaxed text-left">
                Source document records title as &ldquo;PBJ Abstaction 206&rdquo; (2013).
              </p>
            )}
          </div>

          {/* Bottom Actions: Enquire & Navigation */}
          <div className="pt-6 mt-6 space-y-3 text-left">
            {/* Primary Action: Enquire About This Work */}
            <button
              type="button"
              onClick={() => onInquire && onInquire(artwork)}
              className="w-full min-h-[44px] py-3 px-4 bg-[#1B2A49] hover:bg-[#253961] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Mail size={14} />
              <span>Enquire About This Work</span>
            </button>

            {/* Desktop Navigation Arrows */}
            <div className="hidden lg:flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center space-x-1.5 py-2 px-3 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] hover:bg-[#E9ECEF] transition-colors cursor-pointer min-h-[44px]"
                aria-label="Previous artwork"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center space-x-1.5 py-2 px-3 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] hover:bg-[#E9ECEF] transition-colors cursor-pointer min-h-[44px]"
                aria-label="Next artwork"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
