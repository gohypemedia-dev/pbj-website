"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/data/artworks";
import { ArrowUpRight, Maximize2 } from "lucide-react";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
  onOpenLightbox?: (artwork: Artwork) => void;
}

export default function ArtworkCard({
  artwork,
  priority = false,
  onOpenLightbox
}: ArtworkCardProps) {
  // Determine aspect ratio class
  const getAspectClass = () => {
    switch (artwork.aspectRatio) {
      case "portrait":
        return "aspect-[3/4]";
      case "square":
        return "aspect-square";
      case "panoramic":
        return "aspect-[16/9]";
      case "landscape":
      default:
        return "aspect-[3/2]";
    }
  };

  return (
    <article className="group flex flex-col space-y-3 focus-within:ring-2 focus-within:ring-[#1B2A49] rounded-sm p-1">
      {/* Artwork Image Frame */}
      <div
        className={`artwork-frame w-full ${getAspectClass()} relative overflow-hidden bg-[#1B2A49]/5 border border-[#1B2A49]/12 rounded-sm`}
      >
        <Link
          href={`/works/${artwork.id}`}
          className="block w-full h-full relative"
          aria-label={`View artwork: ${artwork.title}, ${artwork.year}`}
        >
          <Image
            src={artwork.image}
            alt={`${artwork.title} (${artwork.year}) - ${artwork.medium} by Prakash Bal Joshi`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="artwork-img-hover object-cover w-full h-full transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Quick Zoom Trigger Button */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenLightbox(artwork);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 bg-[#E9ECEF]/95 text-[#1B2A49] rounded-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity border border-[#1B2A49]/20 shadow-sm text-xs font-heading tracking-wider flex items-center space-x-1"
            title={`Enlarge ${artwork.title}`}
            aria-label={`Enlarge image for ${artwork.title}`}
          >
            <Maximize2 size={13} />
            <span className="sr-only sm:not-sr-only text-[11px] uppercase">Enlarge</span>
          </button>
        )}
      </div>

      {/* Artwork Metadata & Caption (Title, Year, Medium, Dimensions) */}
      <div className="flex flex-col space-y-1 text-left">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            href={`/works/${artwork.id}`}
            className="font-heading text-base font-bold text-[#1B2A49] group-hover:underline inline-flex items-center space-x-1"
          >
            <span>{artwork.title}</span>
            <ArrowUpRight
              size={14}
              className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#1B2A49]"
              aria-hidden="true"
            />
          </Link>
          <span className="font-heading text-xs text-[#38435C]/80 font-medium shrink-0">
            {artwork.year}
          </span>
        </div>

        <p className="font-body text-xs text-[#38435C] italic">
          {artwork.medium}
        </p>

        <p className="font-body text-xs text-[#38435C]/75">
          {artwork.dimensions}
        </p>
      </div>
    </article>
  );
}
