"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/data/artworks";
import { ArrowUpRight } from "lucide-react";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
  onOpenLightbox?: (artwork: Artwork) => void;
  showCuratorNote?: boolean;
}

export default function ArtworkCard({
  artwork,
  priority = false,
  onOpenLightbox,
  showCuratorNote = false
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
    <article className="group flex flex-col space-y-3.5 focus-within:ring-2 focus-within:ring-[#1B2A49] rounded-sm p-1">
      {/* Artwork Image Frame */}
      <div className={`artwork-frame w-full ${getAspectClass()} relative overflow-hidden bg-[#1B2A49]/5 border border-[#1B2A49]/10`}>
        <Link
          href={`/works/${artwork.id}`}
          className="block w-full h-full relative"
          aria-label={`View artwork details for ${artwork.title}, ${artwork.year}`}
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
            className="absolute top-3 right-3 p-2 bg-[#E9ECEF]/90 text-[#1B2A49] rounded opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity border border-[#1B2A49]/15 shadow-sm text-xs font-heading font-medium uppercase tracking-wider"
            title={`Enlarge ${artwork.title}`}
            aria-label={`Enlarge image for ${artwork.title}`}
          >
            Expand
          </button>
        )}
      </div>

      {/* Artwork Metadata & Caption */}
      <div className="flex flex-col space-y-1 text-left">
        <div className="flex items-baseline justify-between">
          <Link
            href={`/works/${artwork.id}`}
            className="font-heading text-base sm:text-lg font-bold text-[#1B2A49] group-hover:text-[#1B2A49]/80 inline-flex items-center space-x-1"
          >
            <span>{artwork.title}</span>
            <ArrowUpRight
              size={15}
              className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#1B2A49]"
              aria-hidden="true"
            />
          </Link>
          <span className="font-heading text-xs text-[#38435C]/80 font-medium">
            {artwork.year}
          </span>
        </div>

        <p className="font-body text-sm text-[#38435C] italic">
          {artwork.medium}
        </p>

        <p className="text-xs text-[#38435C]/80 tracking-wide font-mono">
          {artwork.dimensions}
        </p>

        {showCuratorNote && artwork.curatorNote && (
          <p className="text-xs text-[#38435C]/90 font-serif border-l-2 border-[#1B2A49]/20 pl-2 mt-1.5 line-clamp-2">
            {artwork.curatorNote}
          </p>
        )}
      </div>
    </article>
  );
}
