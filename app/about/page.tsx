import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import { ArrowLeft, BookOpen, Landmark, Award, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: `About the Artist | ${artistData.diacriticName}`,
  description:
    "Comprehensive biography and artistic philosophy of Prakash Bal Joshi, veteran journalist and contemporary Indian abstract painter."
};

export default function AboutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Breadcrumb */}
      <div className="mb-8 pb-5">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-2.5"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block">
          Curatorial Biography &amp; Practice
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5">
          About Prakash Bal Joshi
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-1.5">
          Contemporary Indian Abstract Artist, Veteran Journalist &amp; Acclaimed Writer
        </p>
      </div>

      {/* Main Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Portrait & Key Archival Records (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#1B2A49]/5 shadow-[0_4px_24px_rgba(27,42,73,0.06)]">
            <Image
              src="/artworks/artist-portrait.jpg"
              alt="Prakash Bal Joshi seated in his Mumbai artist studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-[#38435C]/75 font-body text-center sm:text-left">
            Prakash Bal Joshi in his studio &middot; Mumbai
          </p>

          {/* Permanent Museum Collections */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center space-x-2 text-[#1B2A49]">
              <Landmark size={16} />
              <h3 className="font-heading text-xs uppercase tracking-[0.16em] font-bold text-[#1B2A49]">
                Permanent Museum Collections
              </h3>
            </div>
            <ul className="space-y-1.5 font-serif text-sm text-[#38435C] leading-relaxed">
              {artistData.biography.collections.map((col, idx) => (
                <li key={idx} className="pb-1.5 border-b border-[#1B2A49]/8 last:border-b-0">
                  {col}
                </li>
              ))}
            </ul>
          </div>

          {/* Literary Publications */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center space-x-2 text-[#1B2A49]">
              <BookOpen size={16} />
              <h3 className="font-heading text-xs uppercase tracking-[0.16em] font-bold text-[#1B2A49]">
                Published Literary Works
              </h3>
            </div>
            <ul className="space-y-1.5 font-serif text-sm text-[#38435C] leading-relaxed">
              {artistData.biography.literaryWorks.map((work, idx) => (
                <li key={idx} className="pb-1.5 border-b border-[#1B2A49]/8 last:border-b-0">
                  {work}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Approved Biography & Themes (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Lead Statement */}
          <div className="space-y-2.5">
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#1B2A49] font-normal leading-snug border-l-2 border-[#1B2A49]/40 pl-4 py-1 my-2.5">
              &ldquo;Painting is an existential contemplation. In spontaneous brushwork, I seek answers to eternal questions: Who am I, why am I here, and where am I going?&rdquo;
            </blockquote>
            <p className="font-body text-lg text-[#38435C] leading-relaxed max-w-[65ch]">
              {artistData.biography.lead}
            </p>
          </div>

          {/* Paragraphs of Approved Biography */}
          <div className="space-y-3 font-body text-base lg:text-lg leading-relaxed text-[#38435C] max-w-[65ch]">
            {artistData.biography.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Artistic Themes Section */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#1B2A49]">
              <Waves size={20} />
              <h2 className="font-heading text-xl font-bold uppercase tracking-wide">
                Key Conceptual Themes
              </h2>
            </div>

            <div className="space-y-4">
              {artistData.biography.themes.map((theme, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-[#1B2A49]/10 last:border-b-0"
                >
                  <h3 className="font-serif text-lg font-medium text-[#1B2A49] mb-1">
                    {theme.title}
                  </h3>
                  <p className="font-body text-base text-[#38435C] leading-relaxed max-w-[65ch]">
                    {theme.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Visit & Link to Contact */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xs uppercase tracking-wider text-[#1B2A49] font-bold">
                Studio Archive &amp; Appointments
              </p>
              <p className="font-body text-sm text-[#38435C]">
                {artistData.contact.visitingPolicy}
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center shrink-0"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
