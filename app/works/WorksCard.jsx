"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

export default function WorksCard({
  artwork,
  priority = false,
  onOpenLightbox
}) {
  const triggerRef = useRef(null);

  const handleOpen = () => {
    if (onOpenLightbox) {
      onOpenLightbox(artwork, triggerRef.current);
    }
  };

  return (
    <article className="group flex flex-col space-y-3 rounded-sm">
      {/* Artwork Frame - Natural Aspect Ratio Container (No Object-Cover, No Edge Clipping) */}
      <div className="relative w-full overflow-hidden bg-[#1B2A49]/[0.03] border border-[#1B2A49]/[0.08] rounded-sm transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(27,42,73,0.04)] group-hover:shadow-[0_8px_20px_rgba(27,42,73,0.08)]">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          className="block w-full h-auto cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:ring-offset-2"
          aria-label={`Enlarge ${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} by ${artwork.artist}`}
        >
          <Image
            src={artwork.image}
            alt={`${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
            width={artwork.width}
            height={artwork.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="w-full h-auto block object-contain"
          />
        </button>

        {/* Quick Zoom Trigger Button Overlay */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpen();
            }}
            className="absolute top-2.5 right-2.5 p-1.5 bg-[#E9ECEF]/95 hover:bg-white text-[#1B2A49] rounded-sm shadow-sm text-xs font-heading tracking-wider flex items-center space-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
            title={`Enlarge ${artwork.title}`}
            aria-label={`Enlarge image for ${artwork.title}`}
          >
            <Maximize2 size={13} />
            <span className="sr-only sm:not-sr-only text-[11px] uppercase">Enlarge</span>
          </button>
        )}
      </div>

      {/* Artwork Metadata & Caption */}
      <div className="flex flex-col space-y-1 text-center sm:text-left items-center sm:items-start pt-1">
        <div className="flex flex-wrap items-baseline justify-center sm:justify-between gap-1.5 sm:gap-2 w-full">
          <button
            type="button"
            onClick={handleOpen}
            className="font-serif text-lg font-medium text-[#1B2A49] hover:underline text-left cursor-zoom-in"
          >
            {artwork.title}
          </button>
          {artwork.year && (
            <span className="font-display text-base text-[#38435C]/80 font-normal shrink-0">
              {artwork.year}
            </span>
          )}
        </div>

        <p className="font-body text-xs text-[#38435C]/80 uppercase tracking-wider">
          Artist: {artwork.artist}
        </p>

        <p className="font-body text-sm text-[#38435C]/90 italic">
          {artwork.medium}
        </p>

        {artwork.dimensions && (
          <p className="font-body text-xs text-[#38435C]/75">
            {artwork.dimensions}
          </p>
        )}
      </div>
    </article>
  );
}

