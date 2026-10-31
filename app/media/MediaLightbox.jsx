"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export default function MediaLightbox({
  articles,
  currentIndex,
  onClose,
  onNavigate,
  triggerRef,
}) {
  const current = articles[currentIndex];
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startPanX: 0, startPanY: 0 });
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Reset zoom & pan when image changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex]);

  // Lock background scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    };
  }, [triggerRef]);

  // Focus trap inside modal
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) onNavigate(currentIndex - 1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < articles.length - 1) onNavigate(currentIndex + 1);
        return;
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(3, +(z + 0.35).toFixed(2)));
        return;
      }
      if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => {
          const next = Math.max(1, +(z - 0.35).toFixed(2));
          if (next === 1) setPan({ x: 0, y: 0 });
          return next;
        });
        return;
      }
      if (e.key === "0") {
        e.preventDefault();
        setZoom(1);
        setPan({ x: 0, y: 0 });
        return;
      }

      // Trap focus
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, articles.length, onClose, onNavigate]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(3, +(z + 0.35).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, +(z - 0.35).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Dragging / panning handlers
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    // Limit pan bounds based on zoom level
    const maxPan = 300 * (zoom - 1);
    setPan({
      x: Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.startPanX + dx)),
      y: Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.startPanY + dy)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch panning
  const handleTouchStart = (e) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    const maxPan = 300 * (zoom - 1);
    setPan({
      x: Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.startPanX + dx)),
      y: Math.max(-maxPan, Math.min(maxPan, dragStartRef.current.startPanY + dy)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!current) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.publication} clipping: ${current.title || current.date}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#0F172A]/90 backdrop-blur-md text-white select-none animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0F172A]/60 z-10 shrink-0">
        <div className="flex flex-col min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-sm sm:text-base tracking-wide text-white truncate">
              {current.publication}
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-xs text-white/70 whitespace-nowrap">{current.date}</span>
          </div>
          {current.title && (
            <p className="text-xs sm:text-sm text-white/80 italic truncate font-serif mt-0.5">
              {current.title}
            </p>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:flex items-center bg-white/10 rounded-md p-0.5 border border-white/10 mr-2">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              aria-label="Zoom out"
              className="p-2 text-white/80 hover:text-white disabled:opacity-30 disabled:hover:text-white/80 transition-colors rounded"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono px-2 text-white/70 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              aria-label="Zoom in"
              className="p-2 text-white/80 hover:text-white disabled:opacity-30 disabled:hover:text-white/80 transition-colors rounded"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset zoom"
              className="p-2 text-white/80 hover:text-white transition-colors rounded"
              title="Reset Zoom (0)"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Open original link */}
          <a
            href={current.image}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-heading tracking-wider uppercase bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white transition-colors min-h-[44px]"
            title="Open original scan in full resolution"
          >
            <ExternalLink size={14} />
            <span className="hidden md:inline">Open original</span>
          </a>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close viewer (Escape)"
            className="p-2.5 bg-white/10 hover:bg-white/25 border border-white/20 rounded-md text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <div
        className={`relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden ${
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            aria-label="Previous clipping"
            className="absolute left-3 sm:left-6 z-20 p-3 bg-black/40 hover:bg-black/70 backdrop-blur-xs border border-white/15 text-white rounded-full transition-all hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {currentIndex < articles.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            aria-label="Next clipping"
            className="absolute right-3 sm:right-6 z-20 p-3 bg-black/40 hover:bg-black/70 backdrop-blur-xs border border-white/15 text-white rounded-full transition-all hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Scan Image Container */}
        <div
          className="relative max-w-full max-h-full transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={`${current.publication} - ${current.title || current.date}`}
            className="max-w-[92vw] max-h-[75vh] object-contain shadow-2xl rounded-sm border border-white/10 bg-[#1e293b]"
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Footer Info & Mobile Controls */}
      <footer className="px-4 py-2.5 sm:py-3 bg-[#0F172A]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px] text-white/90">
            {currentIndex + 1} of {articles.length}
          </span>
          <span className="hidden sm:inline">Use arrow keys or buttons to navigate</span>
        </div>

        {/* Mobile Zoom buttons */}
        <div className="flex sm:hidden items-center gap-1 bg-white/10 rounded p-0.5">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="p-1.5 text-white/80 hover:text-white disabled:opacity-30 rounded"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[11px] font-mono px-1.5">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            aria-label="Zoom in"
            className="p-1.5 text-white/80 hover:text-white disabled:opacity-30 rounded"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            aria-label="Reset zoom"
            className="p-1.5 text-white/80 hover:text-white rounded"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {current.translation && (
          <div className="w-full sm:w-auto text-[11px] text-amber-200/90 italic truncate">
            English: “{current.translation}”
          </div>
        )}
      </footer>
    </div>
  );
}

