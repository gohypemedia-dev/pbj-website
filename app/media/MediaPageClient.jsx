"use client";

import React, { useState, useRef } from "react";
import {
  Maximize2,
  Play,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import {
  pressArticles,
  videos,
  books,
  publicEvents,
} from "./mediaData";
import MediaLightbox from "./MediaLightbox";

const TABS = [
  { id: "features", label: "Features" },
  { id: "events", label: "Events" },
  { id: "books", label: "Books" },
];

export default function MediaPageClient() {
  const [activeTab, setActiveTab] = useState("features");
  const [visibleCount, setVisibleCount] = useState(9);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const activeTriggerRef = useRef(null);

  // Video embed state (click to load player)
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Tab button refs for keyboard navigation
  const tabRefs = useRef([]);

  const handleTabChange = (tabId) => {
    if (tabId !== "events") {
      setActiveVideoId(null);
    }
    setActiveTab(tabId);
  };

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = TABS[nextIndex];
      handleTabChange(nextTab.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const handleOpenLightbox = (index, triggerEl) => {
    activeTriggerRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, pressArticles.length));
  };

  return (
    <div className="min-h-screen bg-[#E9ECEF] text-[#38435C] selection:bg-[#1B2A49] selection:text-white overflow-x-hidden text-left">
      {/* Main Content Area */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-16 sm:pb-24 text-left">
        {/* Compact Page Heading */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A49] tracking-tight leading-[1.15] text-left">
            Media &amp; Archive
          </h1>
        </div>

        {/* Minimal Text-Only Tabs Navigation */}
        <div
          role="tablist"
          aria-label="Media sections"
          className="flex items-center gap-6 sm:gap-10 lg:gap-12 mb-8 border-none p-0 whitespace-nowrap overflow-x-auto scrollbar-none text-left"
        >
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`bg-transparent border-0 p-0 font-serif text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2A49] select-none text-left ${
                  isActive
                    ? "font-semibold text-[#1B2A49]"
                    : "font-normal text-[#38435C]/60 hover:text-[#1B2A49]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* PANEL 1: FEATURES */}
        {/* ============================================================ */}
        {activeTab === "features" && (
          <div
            id="panel-features"
            role="tabpanel"
            aria-labelledby="tab-features"
            tabIndex={0}
            className="tab-panel-fade focus:outline-none text-left"
          >
            {/* Press Articles Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 text-left">
              {pressArticles.map((article, idx) => {
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
                            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                            className="press-article-title italic text-base sm:text-lg text-[#1B2A49] leading-snug line-clamp-2 mt-1 text-left font-normal"
                            lang={article.language === "Marathi" ? "mr" : "en"}
                          >
                            “{article.title}”
                          </h3>
                        ) : (
                          <p
                            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                            className="press-article-title text-xs italic text-[#38435C]/60 mt-1 text-left"
                          >
                            Documented newspaper feature
                          </p>
                        )}

                        {/* Translation when provided (Prabhat) */}
                        {article.translation && (
                          <p
                            style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                            className="press-article-title text-xs text-[#38435C]/80 mt-1 italic text-left"
                          >
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

            {/* Show More Button (Left aligned) */}
            {visibleCount < pressArticles.length && (
              <div className="mt-8 text-left">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#1B2A49] hover:text-white text-[#1B2A49] border border-[#1B2A49]/30 font-heading text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs hover:shadow-md min-h-[44px]"
                >
                  <span>
                    Show more features ({pressArticles.length - visibleCount} remaining)
                  </span>
                  <ChevronDown size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PANEL 2: EVENTS */}
        {/* ============================================================ */}
        {activeTab === "events" && (
          <div
            id="panel-events"
            role="tabpanel"
            aria-labelledby="tab-events"
            tabIndex={0}
            className="tab-panel-fade focus:outline-none text-left"
          >
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
                        <h3
                          style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                          className="media-video-title font-bold text-base sm:text-lg text-[#1B2A49] leading-snug text-left"
                        >
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

            {/* Preserved Documented Exhibitions & Events Subsection */}
            {publicEvents && publicEvents.length > 0 && (
              <div className="mt-12 sm:mt-16 text-left">
                <div className="mb-6 text-left">
                  <h3
                    id="documented-exhibitions-heading"
                    style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                    className="media-events-heading text-xl sm:text-2xl font-bold text-[#1B2A49] tracking-tight text-left"
                  >
                    Documented Exhibitions &amp; Milestones
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#38435C]/80 mt-1 text-left">
                    Archival records and public exhibitions documented in verified press features and catalogues.
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  {publicEvents.map((event) => (
                    <article
                      key={event.id}
                      className="bg-white rounded-sm border border-[#1B2A49]/15 hover:border-[#1B2A49]/35 transition-colors p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 shadow-2xs text-left"
                    >
                      {/* Year & Period Column */}
                      <div className="flex-shrink-0 sm:w-28 text-left">
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-[#1B2A49] block leading-none">
                          {event.year}
                        </span>
                        <span className="text-xs font-sans text-[#38435C]/75 block mt-1">
                          {event.date}
                        </span>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-[#1B2A49]/5 text-[#1B2A49] text-[10px] font-heading font-semibold uppercase tracking-wider rounded-xs">
                          {event.type}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 text-left">
                        <h4 className="font-heading font-bold text-base sm:text-lg text-[#1B2A49] leading-snug text-left">
                          {event.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#38435C] mt-1 text-left">
                          {event.venue}, {event.city}, {event.country}
                        </p>
                        {event.sourceRef && (
                          <p className="font-serif italic text-xs text-[#38435C]/75 mt-2 text-left">
                            {event.sourceRef}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PANEL 3: BOOKS */}
        {/* ============================================================ */}
        {activeTab === "books" && (
          <div
            id="panel-books"
            role="tabpanel"
            aria-labelledby="tab-books"
            tabIndex={0}
            className="tab-panel-fade focus:outline-none text-left"
          >
            {/* Introductory Sentence */}
            <p className="font-serif italic text-sm sm:text-base text-[#38435C] mb-6 max-w-2xl text-left">
              Fiction, short stories, and sketch-illustrated accounts exploring human relationships,
              changing societal values, and the living pulse of Mumbai.
            </p>

            {/* Books Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl text-left">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="bg-white rounded-sm border border-[#1B2A49]/15 hover:border-[#1B2A49]/35 transition-colors p-5 sm:p-6 flex flex-col justify-between shadow-2xs text-left"
                >
                  <div className="text-left">
                    {/* Top Book Accent & Format */}
                    <div className="flex items-center justify-between pb-3 mb-3 text-left">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#1B2A49]">
                        {book.format || (book.year ? `Published ${book.year}` : "Book")}
                      </span>
                      {book.language && (
                        <span className="text-[11px] font-mono text-[#38435C]/60 uppercase">
                          {book.language}
                        </span>
                      )}
                    </div>

                    {/* Book Title */}
                    <h3
                      style={{ fontFamily: '"Hoefler Text", "Baskerville", "Georgia", serif' }}
                      className="media-book-title font-bold text-lg sm:text-xl text-[#1B2A49] leading-snug text-left"
                    >
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
          </div>
        )}
      </main>

      {/* Accessible Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <MediaLightbox
          articles={pressArticles}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
          triggerRef={activeTriggerRef}
        />
      )}
    </div>
  );
}
