"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  X,
  Maximize2,
  Play,
  ExternalLink,
  BookOpen,
  Calendar,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  pressArticles,
  videos,
  books,
} from "./mediaData";
import MediaLightbox from "./MediaLightbox";

export default function MediaPageClient() {
  // Press filtering state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const activeTriggerRef = useRef(null);

  // Video embed state (click to load player)
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Available years from press articles
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(pressArticles.map((a) => a.year)));
    return years.sort((a, b) => b - a);
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return pressArticles.filter((item) => {
      // Year check
      if (selectedYear !== "all" && item.year !== Number(selectedYear)) {
        return false;
      }
      // Query check (publication, title, date, translation, notes)
      if (q) {
        const pub = (item.publication || "").toLowerCase();
        const altPub = (item.altPublication || "").toLowerCase();
        const title = (item.title || "").toLowerCase();
        const transl = (item.translation || "").toLowerCase();
        const date = (item.date || "").toLowerCase();
        const yr = String(item.year);
        const matches =
          pub.includes(q) ||
          altPub.includes(q) ||
          title.includes(q) ||
          transl.includes(q) ||
          date.includes(q) ||
          yr.includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedYear]);

  // Actual count visible on screen
  const visibleArticleCount = Math.min(visibleCount, filteredArticles.length);

  const handleOpenLightbox = (index, triggerEl) => {
    activeTriggerRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setVisibleCount(9);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, filteredArticles.length));
  };

  return (
    <div className="min-h-screen bg-[#E9ECEF] text-[#38435C] selection:bg-[#1B2A49] selection:text-white overflow-x-hidden text-left">
      {/* Top Header / Introduction */}
      <header className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 pb-2 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-left">
          <ol className="flex items-center space-x-2 text-xs font-heading uppercase tracking-widest text-[#38435C]/80">
            <li>
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 hover:text-[#1B2A49] transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-[#1B2A49]/40">/</li>
            <li className="text-[#1B2A49] font-semibold" aria-current="page">
              Media
            </li>
          </ol>
        </nav>

        {/* Clean Editorial Title & Description */}
        <div className="max-w-3xl text-left">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A49] tracking-tight leading-[1.15] text-left">
            Media &amp; Archive
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#38435C] mt-2 leading-relaxed text-left">
            Explore press features, videos, books and exhibition records from Prakash Bal Joshi’s
            practice.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 space-y-16 sm:space-y-20 text-left">
        {/* ============================================================ */}
        {/* SECTION 1: PRESS & FEATURES */}
        {/* ============================================================ */}
        <section id="press" aria-labelledby="heading-press" className="scroll-mt-24 text-left">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 text-left">
            <div className="text-left">
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-[#1B2A49]/80 block mb-1 text-left">
                PRINT ARCHIVE
              </span>
              <h2
                id="heading-press"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A49] tracking-tight text-left"
              >
                Press &amp; Features
              </h2>
              <p className="font-serif italic text-sm sm:text-base text-[#38435C] mt-1 max-w-2xl text-left">
                A consolidated archive of 23 published newspaper articles, critical profiles, and
                reviews from 2016 to 2008.
              </p>
            </div>

            {/* Live Count Indicator */}
            <div
              className="text-xs font-mono text-[#38435C]/80 self-start md:self-end text-left"
              aria-live="polite"
              aria-atomic="true"
            >
              Showing {visibleArticleCount} of {filteredArticles.length} records
              {filteredArticles.length < pressArticles.length && (
                <span className="text-[#1B2A49] font-medium ml-1">
                  (filtered from {pressArticles.length})
                </span>
              )}
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white/70 p-4 sm:p-5 rounded-sm border border-[#1B2A49]/12 mb-8 space-y-4 shadow-2xs text-left">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between text-left">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md text-left">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#38435C]/50 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(9);
                  }}
                  placeholder="Search publication, headline, or topic..."
                  aria-label="Search press archive"
                  className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder-[#38435C]/50 focus:outline-hidden focus:ring-1 focus:ring-[#1B2A49] focus:border-[#1B2A49] transition-all text-left"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setVisibleCount(9);
                    }}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#38435C]/60 hover:text-[#1B2A49] transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Reset Control (only shown if filtering is active) */}
              {(searchQuery || selectedYear !== "all") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center px-3 py-2 text-xs font-heading uppercase tracking-wider font-semibold text-[#1B2A49] bg-white border border-[#1B2A49]/20 hover:bg-[#E9ECEF] rounded-sm transition-colors min-h-[38px] self-start"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Year Filters */}
            <div className="pt-2 text-left">
              <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#1B2A49]/70 block mb-2 text-left">
                Filter by Year:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear("all");
                    setVisibleCount(9);
                  }}
                  aria-pressed={selectedYear === "all"}
                  className={`px-3 py-1.5 text-xs font-heading tracking-wider rounded-sm transition-colors min-h-[36px] ${
                    selectedYear === "all"
                      ? "bg-[#1B2A49] text-white font-semibold shadow-xs"
                      : "bg-white/80 hover:bg-white text-[#38435C] border border-[#1B2A49]/15"
                  }`}
                >
                  All ({pressArticles.length})
                </button>
                {availableYears.map((yr) => {
                  const countInYear = pressArticles.filter((a) => a.year === yr).length;
                  const isSelected = selectedYear === String(yr);
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setSelectedYear(isSelected ? "all" : String(yr));
                        setVisibleCount(9);
                      }}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 text-xs font-heading tracking-wider rounded-sm transition-colors min-h-[36px] ${
                        isSelected
                          ? "bg-[#1B2A49] text-white font-semibold shadow-xs"
                          : "bg-white/80 hover:bg-white text-[#38435C] border border-[#1B2A49]/15"
                      }`}
                    >
                      {yr} ({countInYear})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Empty Search Result State (Left aligned) */}
          {filteredArticles.length === 0 && (
            <div className="bg-white/80 border border-[#1B2A49]/15 rounded-sm p-6 sm:p-8 text-left max-w-xl">
              <Info size={24} className="text-[#1B2A49]/60 mb-2" />
              <h3 className="font-heading font-bold text-lg text-[#1B2A49] mb-1 text-left">
                No matching press records found
              </h3>
              <p className="font-serif italic text-sm text-[#38435C] mb-4 text-left">
                No articles matched your criteria “{searchQuery}” in{" "}
                {selectedYear === "all" ? "any year" : selectedYear}.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#1B2A49] hover:bg-[#253961] text-white text-xs font-heading uppercase tracking-wider font-semibold rounded-sm transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Press Articles Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
          {filteredArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left">
              {filteredArticles.map((article, idx) => {
                const isHidden = idx >= visibleCount;
                return (
                  <article
                    key={article.id}
                    className={`group bg-white rounded-sm border border-[#1B2A49]/15 hover:border-[#1B2A49]/40 transition-all duration-200 flex flex-col overflow-hidden shadow-2xs hover:shadow-md text-left ${
                      isHidden ? "hidden" : ""
                    }`}
                  >
                    {/* Scan Preview Frame (object-fit: contain, neutral surround) */}
                    <div
                      className="relative w-full aspect-[700/500] bg-[#EEF1F5] p-2 sm:p-3 overflow-hidden cursor-pointer flex items-center justify-center"
                      onClick={(e) => handleOpenLightbox(idx, e.currentTarget)}
                      role="button"
                      tabIndex={isHidden ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleOpenLightbox(idx, e.currentTarget);
                        }
                      }}
                      aria-label={`View clipping for ${article.publication}, ${article.date}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={`${article.publication} clipping preview - ${article.date}`}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading={idx < 6 ? "eager" : "lazy"}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#1B2A49]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2A49]/90 text-white text-xs font-heading tracking-wider uppercase rounded-sm shadow-md">
                          <Maximize2 size={13} />
                          <span>View clipping</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Editorial Metadata */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                      <div className="text-left">
                        {/* Publication & Date Header */}
                        <div className="flex items-baseline justify-between gap-2 mb-1.5 text-left">
                          <span className="font-heading font-bold text-sm sm:text-base text-[#1B2A49] tracking-wide text-left">
                            {article.publication}
                          </span>
                          <span className="text-xs font-sans text-[#38435C]/75 whitespace-nowrap">
                            {article.date}
                          </span>
                        </div>

                        {/* Article Title when supplied */}
                        {article.title ? (
                          <h3
                            className="font-serif italic text-base sm:text-lg text-[#1B2A49] leading-snug line-clamp-2 mt-1 text-left"
                            lang={article.language === "Marathi" ? "mr" : "en"}
                          >
                            “{article.title}”
                          </h3>
                        ) : (
                          <p className="text-xs font-serif italic text-[#38435C]/60 mt-1 text-left">
                            Documented newspaper feature
                          </p>
                        )}

                        {/* Translation when provided (Prabhat) */}
                        {article.translation && (
                          <p className="text-xs text-[#38435C]/80 mt-1 italic text-left">
                            Transl: “{article.translation}”
                          </p>
                        )}
                      </div>

                      {/* Card Footer Action */}
                      <div className="mt-4 pt-3 flex items-center justify-between text-left">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#38435C]/60">
                          {article.language}
                        </span>
                        <button
                          type="button"
                          tabIndex={isHidden ? -1 : 0}
                          onClick={(e) => handleOpenLightbox(idx, e.currentTarget)}
                          className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] hover:text-[#2a4577] transition-colors p-1"
                        >
                          <Maximize2 size={13} />
                          <span>View clipping</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Show More Button (Left aligned) */}
          {visibleCount < filteredArticles.length && (
            <div className="mt-8 text-left">
              <button
                type="button"
                onClick={handleShowMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#1B2A49] hover:text-white text-[#1B2A49] border border-[#1B2A49]/30 font-heading text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs hover:shadow-md min-h-[44px]"
              >
                <span>
                  Show more features ({filteredArticles.length - visibleCount} remaining)
                </span>
                <ChevronDown size={15} />
              </button>
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: VIDEOS */}
        {/* ============================================================ */}
        <section id="videos" aria-labelledby="heading-videos" className="scroll-mt-24 text-left">
          {/* Section Header */}
          <div className="mb-6 text-left">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-[#1B2A49]/80 block mb-1 text-left">
              EVENTS
            </span>
            <h2
              id="heading-videos"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A49] tracking-tight text-left"
            >
              Videos
            </h2>
          </div>

          {/* Videos Grid (3 cols wide desktop, 1 col mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {videos.map((vid) => {
              const isPlaying = activeVideoId === vid.youtubeId;
              return (
                <article
                  key={vid.id}
                  className="bg-white rounded-sm border border-[#1B2A49]/15 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col text-left"
                >
                  {/* 16:9 Video Frame */}
                  <div className="relative aspect-video w-full bg-[#0F172A] overflow-hidden">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                        title={vid.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <div
                        className="relative w-full h-full group cursor-pointer"
                        onClick={() => setActiveVideoId(vid.youtubeId)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveVideoId(vid.youtubeId);
                          }
                        }}
                        aria-label={`Play video: ${vid.title}`}
                      >
                        {/* Thumbnail */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={`Thumbnail for ${vid.title}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-[#0F172A]/25 transition-colors" />

                        {/* Obvious Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1B2A49]/90 group-hover:bg-[#1B2A49] group-hover:scale-110 text-white flex items-center justify-center shadow-xl border border-white/20 transition-all">
                            <Play size={24} className="ml-1 fill-white" />
                          </div>
                        </div>

                        {/* Click to play label badge */}
                        <div className="absolute bottom-3 left-3 bg-[#0F172A]/80 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-heading uppercase tracking-wider text-white">
                          Click to play
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Editorial Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#1B2A49] leading-snug text-left">
                        {vid.title}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-[#38435C] mt-2 leading-relaxed text-left">
                        {vid.description}
                      </p>
                    </div>

                    {/* Fallback Watch on YouTube Link */}
                    <div className="mt-4 pt-3 text-left">
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49] hover:text-[#2a4577] transition-colors min-h-[36px]"
                      >
                        <ExternalLink size={13} />
                        <span>Watch on YouTube</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: BOOKS */}
        {/* ============================================================ */}
        <section id="books" aria-labelledby="heading-books" className="scroll-mt-24 text-left">
          {/* Section Header */}
          <div className="mb-6 text-left">
            <h2
              id="heading-books"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A49] tracking-tight text-left"
            >
              Books
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#38435C] mt-1 max-w-2xl text-left">
              Fiction, short stories, and sketch-illustrated accounts exploring human relationships,
              changing societal values, and the living pulse of Mumbai.
            </p>
          </div>

          {/* Books Editorial Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl text-left">
            {books.map((book) => (
              <article
                key={book.id}
                className="bg-white rounded-sm border border-[#1B2A49]/15 hover:border-[#1B2A49]/35 transition-colors p-5 sm:p-6 flex flex-col justify-between shadow-2xs text-left"
              >
                <div className="text-left">
                  {/* Top Book Accent & Format */}
                  <div className="flex items-center justify-between pb-3 mb-3 text-left">
                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49]">
                      <BookOpen size={14} className="text-[#1B2A49]/70" />
                      <span>{book.format || (book.year ? `Published ${book.year}` : "Book")}</span>
                    </span>
                    {book.language && (
                      <span className="text-[11px] font-mono text-[#38435C]/60 uppercase">
                        {book.language}
                      </span>
                    )}
                  </div>

                  {/* Book Title */}
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1B2A49] leading-snug text-left">
                    {book.title}
                  </h3>

                  {/* Author / Translator / Series Meta */}
                  <div className="mt-3 space-y-1 text-xs text-[#38435C] text-left">
                    <p className="text-left">
                      <strong className="text-[#1B2A49] font-semibold">Author:</strong>{" "}
                      {book.author}
                    </p>
                    {book.translator && (
                      <p className="text-left">
                        <strong className="text-[#1B2A49] font-semibold">Translator:</strong>{" "}
                        {book.translator}
                      </p>
                    )}
                    {book.series && (
                      <p className="text-left">
                        <strong className="text-[#1B2A49] font-semibold">Series:</strong>{" "}
                        {book.series}
                      </p>
                    )}
                  </div>

                  {/* Bibliographic Note */}
                  {book.notes && (
                    <p className="font-serif italic text-xs sm:text-sm text-[#38435C]/80 mt-3 leading-relaxed text-left">
                      {book.notes}
                    </p>
                  )}
                </div>

                {/* Purchase Action (Only for supplied Amazon links) */}
                <div className="mt-6 pt-3 text-left">
                  {book.hasPurchaseLink && book.amazonUrl ? (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1B2A49] hover:bg-[#253961] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[44px]"
                    >
                      <span>View on Amazon</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#38435C]/50 block py-2 text-left">
                      Archival Bibliographic Record
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Accessible Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <MediaLightbox
          articles={filteredArticles}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
          triggerRef={activeTriggerRef}
        />
      )}
    </div>
  );
}
