import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import { imageArchive } from "@/data/imageArchive";
import { ArrowLeft, BookOpen, Feather, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Writings | ${artistData.diacriticName}`,
  description:
    "Published short story collections, literary works, and journalistic essays by Prakash Bal Joshi.",
};

const literaryWorks = [
  {
    title: "Prakash Bal Joshi yanchya Katha",
    genre: "Short Story Collection",
    language: "Marathi (Translated into English, French, German, & major Indian languages)",
    recognition: "State Literary Award Recipient",
    summary:
      "A renowned collection of evocative short fiction capturing the subtle tensions, quiet grief, and unspoken human dignity found across rural and urban landscapes.",
  },
  {
    title: "Gateway",
    genre: "Urban Chronicle & Narrative Fiction",
    language: "Marathi & English",
    recognition: "Acclaimed Cultural Anthology",
    summary:
      "An incisive exploration of Mumbai’s complex social tapestry, examining the paradox of high-density metropolitan ambition set against resilient human warmth.",
  },
  {
    title: "Currents of the Unseen",
    genre: "Artistic & Philosophical Essays",
    language: "English",
    recognition: "Monograph & Catalog Essay",
    summary:
      "Reflections on river metaphors, ecological memory, and the lost Saraswati river, drawing parallels between contemplative writing and spontaneous abstract painting.",
  },
];

export default function WritingsPage() {
  const printedBooks = imageArchive.art1.slice(0, 8);

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
          Literary Works &amp; Publications
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5">
          Writings
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-1.5 max-w-2xl leading-relaxed">
          The literary practice of Prakash Bal Joshi—spanning award-winning short stories, social journalism with The Times of India, and philosophical meditations on art and nature.
        </p>
      </div>

      {/* Featured Literary Titles */}
      <section className="mb-14">
        <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-[#1B2A49]/80 font-semibold mb-6">
          Selected Books &amp; Fiction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {literaryWorks.map((work) => (
            <div
              key={work.title}
              className="p-6 bg-white/40 border border-[#1B2A49]/10 rounded-sm flex flex-col justify-between hover:border-[#1B2A49]/30 transition-all shadow-[0_2px_12px_rgba(27,42,73,0.03)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-heading uppercase tracking-widest text-[#1B2A49]/70">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={13} />
                    {work.genre}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1B2A49] leading-snug">
                  {work.title}
                </h3>
                <p className="text-xs font-heading text-[#38435C]/80 uppercase tracking-wider">
                  {work.language}
                </p>
                <p className="font-body text-base text-[#38435C] leading-relaxed pt-2">
                  {work.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1B2A49]/10">
                <span className="inline-block text-xs font-serif italic text-[#1B2A49]">
                  {work.recognition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journalism & Essays Overview */}
      <section className="mb-14 p-8 sm:p-10 bg-white/30 border border-[#1B2A49]/10 rounded-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#1B2A49]">
            <Feather size={14} />
            <span>Journalistic Perspective</span>
          </div>
          <h2 className="font-serif text-3xl font-medium text-[#1B2A49]">
            A Lifetime of Looking Closer
          </h2>
          <p className="font-body text-base text-[#38435C] leading-relaxed">
            Alongside his visual art, Prakash Bal Joshi spent decades as a senior journalist with{" "}
            <em>The Times of India</em>, documenting political transitions, ecological emergencies, and everyday human stories across Maharashtra and India. This keen journalistic habit of unhurried observation forms the intellectual spine of his painterly mark-making.
          </p>
        </div>
      </section>

      {/* Art on the Printed Page (Book covers and literary editions) */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-[#1B2A49]/80 font-semibold">
            Art on the Printed Page
          </h2>
          <p className="font-serif italic text-base text-[#38435C] mt-1">
            Book covers, translated editions, and printed illustrations from the artist&rsquo;s personal archive.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {printedBooks.map((item) => (
            <figure
              key={item.src}
              className="bg-white/40 border border-[#1B2A49]/10 rounded-sm p-3 group hover:border-[#1B2A49]/30 transition-all flex flex-col justify-between"
            >
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-xs"
                aria-label={`Open printed work ${item.number} in full size`}
              >
                <Image
                  src={item.src}
                  alt={`Printed publication ${item.number} by Prakash Bal Joshi`}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 45vw, 22vw"
                />
              </a>
              <figcaption className="pt-2 text-xs font-heading uppercase tracking-widest text-[#1B2A49]/70 text-center">
                Publication {String(item.number).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact Callout */}
      <div className="mt-10 p-6 sm:p-7 bg-white/30 border border-[#1B2A49]/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_2px_12px_rgba(27,42,73,0.03)]">
        <div>
          <h3 className="font-serif text-xl font-medium text-[#1B2A49]">
            Literary Inquiries &amp; Translations
          </h3>
          <p className="font-body text-base text-[#38435C] mt-1 max-w-[60ch]">
            For publishing inquiries, rights, or academic research regarding Prakash Bal Joshi&rsquo;s literary works, contact the studio.
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
  );
}
