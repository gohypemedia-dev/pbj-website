"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Artwork, getAdjacentArtworks } from "@/data/artworks";
import LightboxModal from "@/components/LightboxModal";
import EnquiryModal from "@/components/EnquiryModal";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Mail,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface ArtworkDetailClientProps {
  artwork: Artwork;
}

export default function ArtworkDetailClient({
  artwork
}: ArtworkDetailClientProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const { prev, next } = getAdjacentArtworks(artwork.id);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1B2A49]/10">
        <Link
          href="/works"
          className="inline-flex items-center space-x-2 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Works</span>
        </Link>

        {/* Prev / Next Artwork Links */}
        <div className="flex items-center space-x-6 text-xs font-heading uppercase tracking-wider text-[#38435C]">
          <Link
            href={`/works/${prev.id}`}
            className="hover:text-[#1B2A49] inline-flex items-center space-x-1"
            title={`Previous: ${prev.title}`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </Link>

          <span className="text-[#1B2A49]/20">/</span>

          <Link
            href={`/works/${next.id}`}
            className="hover:text-[#1B2A49] inline-flex items-center space-x-1"
            title={`Next: ${next.title}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Grid: Artwork Presentation & Editorial Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Large Artwork Presentation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#1B2A49]/5 border border-[#1B2A49]/15 rounded-sm overflow-hidden cursor-zoom-in group shadow-sm"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
            aria-label={`Enlarge view of ${artwork.title}`}
          >
            <Image
              src={artwork.image}
              alt={`${artwork.title} (${artwork.year}) - ${artwork.medium} by Prakash Bal Joshi`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain p-2 sm:p-4 group-hover:scale-[1.01] transition-transform duration-500 ease-out"
            />

            {/* Click to Enlarge Overlay Pill */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#E9ECEF]/90 backdrop-blur-sm text-[#1B2A49] border border-[#1B2A49]/15 rounded text-xs font-heading uppercase tracking-wider flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={13} />
              <span>Full View Lightbox</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#38435C]/75 font-mono pt-1">
            <span>Click canvas to open accessible full-resolution lightbox</span>
            <span>Uncropped Original Aspect</span>
          </div>
        </div>

        {/* Artwork Metadata & Curatorial Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div className="space-y-3">
            <span className="eyebrow-label text-[#1B2A49] block">
              {artwork.series}
            </span>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A49] leading-tight">
              {artwork.title}
            </h1>

            <p className="font-serif italic text-lg text-[#38435C]">
              {artwork.medium}, {artwork.year}
            </p>
          </div>

          {/* Key Specifications Table */}
          <div className="border-t border-b border-[#1B2A49]/15 py-5 space-y-3 font-mono text-xs text-[#38435C]">
            <div className="flex justify-between">
              <span className="text-[#38435C]/70">Dimensions:</span>
              <span className="font-semibold text-[#1B2A49]">{artwork.dimensions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#38435C]/70">Medium:</span>
              <span className="font-semibold text-[#1B2A49]">{artwork.medium}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#38435C]/70">Year of Execution:</span>
              <span className="font-semibold text-[#1B2A49]">{artwork.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#38435C]/70">Curatorial Series:</span>
              <span className="font-semibold text-[#1B2A49]">{artwork.series}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#38435C]/70">Acquisition Status:</span>
              <span className="inline-flex items-center space-x-1 font-semibold text-[#1B2A49]">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>{artwork.status}</span>
              </span>
            </div>
          </div>

          {/* Curatorial Description */}
          <div className="space-y-3">
            <h2 className="eyebrow-label text-[#1B2A49]">
              Curatorial Commentary
            </h2>
            <p className="font-body text-base lg:text-lg leading-relaxed text-[#38435C]">
              {artwork.description}
            </p>
          </div>

          {artwork.curatorNote && (
            <div className="p-4 bg-white/50 border-l-2 border-[#1B2A49] rounded-r text-sm text-[#38435C] font-body">
              <p>
                <strong className="font-heading uppercase text-xs tracking-wider text-[#1B2A49] block mb-1">
                  Exhibition Archive Note
                </strong>
                {artwork.curatorNote}
              </p>
            </div>
          )}

          {/* Action Button: Inquire About This Work */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
              className="flex-1 py-4 px-6 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
            >
              <Mail size={15} />
              <span>Inquire About This Work</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="py-4 px-5 bg-white/60 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-white transition-all text-center"
            >
              Enlarge View
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        artwork={isLightboxOpen ? artwork : null}
        onClose={() => setIsLightboxOpen(false)}
        onInquire={() => {
          setIsLightboxOpen(false);
          setIsEnquiryOpen(true);
        }}
      />

      {/* Connected Enquiry Modal */}
      <EnquiryModal
        artwork={artwork}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
