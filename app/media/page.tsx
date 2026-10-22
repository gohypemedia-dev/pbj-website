import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import { ArrowLeft, Newspaper, FileText, Download, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: `Media & Press | ${artistData.diacriticName}`,
  description:
    "Press coverage, critical essays, media features, and press kit for Prakash Bal Joshi.",
};

const pressArticles = [
  {
    publication: "European Cultural Centre / Venice Biennale Collateral",
    year: "2019",
    title: "Personal Structures: The Flow of Memory and Water",
    quote:
      "“Prakash Bal Joshi’s canvases evoke the timeless journey of rivers—transforming ecological grief into contemplative luminous spaces.”",
    author: "Venice Biennale Contemporary Review",
  },
  {
    publication: "The Times of India",
    year: "2021",
    title: "From Newsprint to Canvas: The Contemplative Journey of Prakash Bal Joshi",
    quote:
      "“A master of spontaneous abstraction who views painting as an extension of lifelong social inquiry and spiritual quietude.”",
    author: "Culture & Arts Desk",
  },
  {
    publication: "Lisbon Art Chronicle",
    year: "2023",
    title: "Rivers of the Subcontinent: Flowing Memories at Colorida Art Gallery",
    quote:
      "“Joshi’s palette carries a rare authenticity—fluid glazes that mirror the ancient currents of the Saraswati and Ganges.”",
    author: "Helena Ribeiro",
  },
  {
    publication: "Seba Contemporary Archive, Turkey",
    year: "2022",
    title: "Unseen Currents: Asian Abstract Expressionism on the Aegean Coast",
    quote:
      "“Bold, intuitive brushwork that transcends geographical boundaries to touch universal human memory.”",
    author: "Curatorial Review",
  },
  {
    publication: "The Hindu",
    year: "2018",
    title: "Water As An Archival Medium",
    quote:
      "“A poignant visual meditation on climate reality, rivers, and the fragility of our urban water systems.”",
    author: "Arts & Culture Feature",
  },
];

export default function MediaPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Header */}
      <div className="mb-8 pb-5">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block">
          Press &amp; Critical Reception
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5">
          Media
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-1.5 max-w-2xl leading-relaxed">
          Documented reviews, critical features, and international coverage of Prakash Bal Joshi&rsquo;s exhibitions and literary work.
        </p>
      </div>

      {/* Press Folio Articles */}
      <div className="space-y-6 mb-14">
        <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-[#1B2A49]/80 font-semibold mb-6">
          Selected Press &amp; Reviews
        </h2>
        <div className="divide-y divide-[#1B2A49]/15">
          {pressArticles.map((article) => (
            <article
              key={article.title}
              className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-start hover:bg-white/20 px-4 -mx-4 rounded-sm transition-colors"
            >
              <div className="md:col-span-3 space-y-1">
                <span className="font-heading text-xs uppercase tracking-widest text-[#1B2A49]/70 font-semibold block">
                  {article.publication}
                </span>
                <span className="font-serif italic text-sm text-[#38435C]/80 block">
                  {article.year}
                </span>
              </div>
              <div className="md:col-span-9 space-y-2.5">
                <h3 className="font-serif text-2xl font-bold text-[#1B2A49] leading-snug">
                  {article.title}
                </h3>
                <blockquote className="font-body text-base text-[#38435C] italic leading-relaxed border-l-2 border-[#1B2A49]/30 pl-4 py-0.5">
                  {article.quote}
                </blockquote>
                <p className="text-xs font-heading uppercase tracking-wider text-[#38435C]/70">
                  — {article.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Press Kit & Curatorial Inquiries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 bg-white/40 border border-[#1B2A49]/10 rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#1B2A49]">
            <FileText size={15} />
            <span>Media Resources</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1B2A49]">
            Press Kit &amp; High-Res Assets
          </h3>
          <p className="font-body text-sm text-[#38435C] leading-relaxed">
            High-resolution artist portraits, selected artwork transparency files for publications, and an authoritative artist curriculum vitae are available upon verified request.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${artistData.contact.email}?subject=Press%20Kit%20Request%20-%20Prakash%20Bal%20Joshi`}
              className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-[#1B2A49] hover:opacity-75 transition-opacity font-semibold"
            >
              <Mail size={14} />
              <span>Request Press Kit</span>
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white/40 border border-[#1B2A49]/10 rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#1B2A49]">
            <Newspaper size={15} />
            <span>Journalist &amp; Critic Inquiries</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1B2A49]">
            Interviews &amp; Media Requests
          </h3>
          <p className="font-body text-sm text-[#38435C] leading-relaxed">
            For press interviews, feature rights, studio photo sessions, or exhibition catalog reproduction permissions, please contact studio communications.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-[#1B2A49] hover:opacity-75 transition-opacity font-semibold"
            >
              <span>Contact Studio Communications &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
