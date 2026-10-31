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
    <article className="group flex flex-col space-y-3 rounded-sm text-left">
      {/* Artwork Frame - Consistent Square Stage with object-contain (Unclipped Paintings) */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/70 border border-[#1B2A49]/12 rounded-sm transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(27,42,73,0.03)] group-hover:border-[#1B2A49]/30 group-hover:shadow-[0_6px_16px_rgba(27,42,73,0.06)] flex items-center justify-center p-3 sm:p-4">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          className="relative w-full h-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A49] focus-visible:ring-offset-2 flex items-center justify-center"
          aria-label={`Enlarge ${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
        >
          <Image
            src={artwork.image}
            alt={`${artwork.title}${artwork.year ? ` (${artwork.year})` : ""} - ${artwork.medium} by ${artwork.artist}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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
            className="absolute top-2.5 right-2.5 py-1 px-2 bg-[#E9ECEF]/95 hover:bg-white text-[#1B2A49] border border-[#1B2A49]/10 rounded-sm shadow-xs text-xs font-heading tracking-wider flex items-center space-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10 cursor-pointer min-h-[32px]"
            title={`Enlarge ${artwork.title}`}
            aria-label={`Enlarge image for ${artwork.title}`}
          >
            <Maximize2 size={12} />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Enlarge</span>
          </button>
        )}
      </div>

      {/* Artwork Metadata & Caption (Consistent, Natural Card Height, Left-Aligned) */}
      <div className="flex flex-col space-y-0.5 text-left pt-0.5">
        <div className="flex items-baseline justify-between gap-2 w-full text-left">
          <button
            type="button"
            onClick={handleOpen}
            className="font-serif text-base sm:text-lg font-medium text-[#1B2A49] hover:underline text-left cursor-zoom-in leading-snug"
          >
            {artwork.title}
          </button>
          {artwork.year && (
            <span className="font-heading text-xs sm:text-sm text-[#38435C]/80 font-normal shrink-0">
              {artwork.year}
            </span>
          )}
        </div>

        <p className="font-serif italic text-xs sm:text-sm text-[#38435C]/90 text-left">
          {artwork.medium}
        </p>

        {artwork.dimensions && (
          <p className="font-sans text-xs text-[#38435C]/75 text-left">
            {artwork.dimensions}
          </p>
        )}
      </div>
    </article>
  );
}
