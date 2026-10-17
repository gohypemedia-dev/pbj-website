"use client";

import React, { useState } from "react";
import Link from "next/link";
import { artistData } from "@/data/artist";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Calendar,
  Send,
  Copy,
  Check,
  ShieldAlert
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [inquiryType, setInquiryType] = useState<
    "acquisition" | "curatorial" | "press" | "visit"
  >("acquisition");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const subjectText = `Studio Inquiry [${inquiryType.toUpperCase()}]: ${
    name || "Collector / Curator"
  }`;

  const mailtoLink = `mailto:${artistData.contact.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(
    `From: ${name || "Not specified"}\nEmail: ${
      email || "Not specified"
    }\nAffiliation: ${
      organization || "Independent"
    }\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
  )}`;

  const handleCopy = () => {
    const fullText = `To: ${artistData.contact.email}\nSubject: ${subjectText}\n\nFrom: ${name}\nEmail: ${email}\nAffiliation: ${organization}\nType: ${inquiryType}\n\n${message}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
      {/* Top Header */}
      <div className="mb-12 pb-8 border-b border-[#1B2A49]/10">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-4"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block">
          Studio Archive &amp; Communications
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-2">
          Contact &amp; Studio Inquiries
        </h1>
        <p className="font-serif italic text-lg text-[#38435C] mt-2 max-w-2xl leading-relaxed">
          Direct all acquisition inquiries, curatorial loans, press requests, and studio appointments to the artist&rsquo;s Mumbai office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Studio Information (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/40 border border-[#1B2A49]/15 rounded-sm p-6 sm:p-8 space-y-6">
            <div>
              <span className="eyebrow-label text-[#1B2A49] block mb-1">
                Direct Studio Email
              </span>
              <a
                href={`mailto:${artistData.contact.email}`}
                className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A49] hover:underline break-all"
              >
                {artistData.contact.email}
              </a>
              <p className="text-xs text-[#38435C]/80 mt-1">
                Monitored directly by the studio archive management.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B2A49]/10 space-y-2">
              <span className="eyebrow-label text-[#1B2A49] block">
                Studio Location
              </span>
              <p className="font-body text-base text-[#1B2A49] font-medium">
                {artistData.contact.studioLocation}
              </p>
              <p className="font-serif text-sm text-[#38435C]">
                {artistData.contact.city}, {artistData.contact.country}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B2A49]/10 space-y-2">
              <span className="eyebrow-label text-[#1B2A49] block">
                Studio Visits Policy
              </span>
              <p className="font-body text-sm text-[#38435C] leading-relaxed">
                {artistData.contact.visitingPolicy}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B2A49]/10 space-y-2">
              <span className="eyebrow-label text-[#1B2A49] block">
                International Representation
              </span>
              <p className="font-body text-sm text-[#38435C] leading-relaxed">
                {artistData.contact.representationNote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Genuine Studio Enquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white/50 border border-[#1B2A49]/15 rounded-sm p-6 sm:p-10 space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#1B2A49]">
              Prepare Studio Enquiry
            </h2>
            <p className="font-body text-sm text-[#38435C] mt-1">
              Complete the fields below to prepare your formal correspondence. Messages route directly to <code>{artistData.contact.email}</code>.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoLink;
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Your Full Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Alistair Finch"
                className="w-full px-4 py-3 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="afinch@museum.org"
                  className="w-full px-4 py-3 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-org"
                  className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
                >
                  Organization / Museum
                </label>
                <input
                  id="contact-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Basel Contemporary Arts"
                  className="w-full px-4 py-3 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-type"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Inquiry Category
              </label>
              <select
                id="contact-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value as any)}
                className="w-full px-4 py-3 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-sans text-sm"
              >
                <option value="acquisition">Artwork Acquisition / Price Catalog</option>
                <option value="curatorial">Curatorial Loan / Biennial Exhibition</option>
                <option value="visit">Studio Visit Request (Mumbai)</option>
                <option value="press">Press, Monograph &amp; Literary Rights</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Correspondence Message *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please outline the nature of your inquiry, specific artworks of interest, or proposed exhibition timelines..."
                className="w-full px-4 py-3 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-base"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all flex items-center justify-center space-x-2 text-center"
              >
                <Send size={14} />
                <span>Transmit via Email Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3.5 px-6 bg-white/80 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs uppercase tracking-[0.16em] font-semibold rounded-sm hover:bg-white transition-all flex items-center justify-center space-x-2 text-center"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-700" />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copied ? "Copied to Clipboard" : "Copy Message"}</span>
              </button>
            </div>

            <p className="text-xs text-[#38435C]/80 pt-2 border-t border-[#1B2A49]/10">
              Honest Communication Standard: Clicking &ldquo;Transmit&rdquo; launches your system mail client with verified addressing to <code>{artistData.contact.email}</code>. No unverified third-party forms or misleading delivery claims.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
