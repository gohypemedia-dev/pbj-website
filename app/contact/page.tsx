"use client";

import React, { useState } from "react";
import Link from "next/link";
import { artistData } from "@/data/artist";
import {
  ArrowLeft,
  Send,
  Copy,
  Check
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [inquiryType, setInquiryType] = useState<string>("Collector / Acquisition Enquiry");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const subjectText = `Enquiry [${inquiryType}]: ${name || "General Enquiry"}`;

  const mailtoLink = `mailto:${artistData.contact.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(
    `Name: ${name || "Not specified"}\nEmail: ${
      email || "Not specified"
    }\nOrganisation: ${
      organization || "Not specified"
    }\nEnquiry Type: ${inquiryType}\n\nMessage:\n${message}`
  )}`;

  const handleCopy = () => {
    const fullText = `To: ${artistData.contact.email}\nSubject: ${subjectText}\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organization}\nEnquiry Type: ${inquiryType}\n\nMessage:\n${message}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
      {/* Top Header */}
      <div className="mb-8 pb-5 flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 font-heading text-xs uppercase tracking-widest text-[#38435C] hover:text-[#1B2A49] mb-3 mx-auto sm:mx-0"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="eyebrow-label text-[#1B2A49] block text-center sm:text-left">
          Studio Communications
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1B2A49] mt-1.5 text-center sm:text-left">
          Contact the Studio
        </h1>
        <p className="font-body text-base sm:text-lg text-[#38435C] mt-1.5 max-w-2xl leading-relaxed mx-auto sm:mx-0 text-center sm:text-left">
          Enquiries for artwork acquisitions, exhibitions, press, and studio visits may be directed to the studio in Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Studio Information (5 cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <span className="eyebrow-label text-[#1B2A49] block mb-1">
              Direct Correspondence
            </span>
            <a
              href={`mailto:${artistData.contact.email}`}
              className="font-serif text-xl sm:text-2xl font-medium text-[#1B2A49] hover:underline break-all"
            >
              {artistData.contact.email}
            </a>
            <p className="font-body text-sm text-[#38435C]/80 mt-1 leading-relaxed max-w-[45ch] mx-auto lg:mx-0">
              Direct communication for curatorial inquiries, museum exhibitions, and collectors.
            </p>
          </div>

          <div className="pt-4 space-y-1.5 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <span className="eyebrow-label text-[#1B2A49] block">
              Studio Location
            </span>
            <p className="font-serif text-base font-medium text-[#1B2A49]">
              {artistData.contact.city}, {artistData.contact.country}
            </p>
          </div>

          <div className="pt-4 space-y-1.5 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <span className="eyebrow-label text-[#1B2A49] block">
              Studio Visits
            </span>
            <p className="font-body text-sm text-[#38435C] leading-relaxed max-w-[45ch] mx-auto lg:mx-0">
              {artistData.contact.visitingPolicy}
            </p>
          </div>

          <div className="pt-4 space-y-1.5 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <span className="eyebrow-label text-[#1B2A49] block">
              Representation &amp; Archives
            </span>
            <p className="font-body text-sm text-[#38435C] leading-relaxed max-w-[45ch] mx-auto lg:mx-0">
              {artistData.contact.representationNote}
            </p>
          </div>
        </div>

        {/* Right Column: Studio Correspondence Form (7 cols) */}
        <div className="lg:col-span-7 bg-white/40 border border-[#1B2A49]/10 rounded-sm p-6 sm:p-8 space-y-5 shadow-[0_4px_24px_rgba(27,42,73,0.04)]">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#1B2A49] text-center sm:text-left">
              Send an Enquiry
            </h2>
            <p className="font-body text-base text-[#38435C] mt-1.5 max-w-[55ch] text-center sm:text-left">
              Please share the nature of your interest. Clicking &ldquo;Open Email App&rdquo; formats your message directly for the studio.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoLink;
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold text-center sm:text-left"
              >
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm text-center sm:text-left"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold text-center sm:text-left"
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm text-center sm:text-left"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-org"
                  className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold text-center sm:text-left"
                >
                  Organisation — optional
                </label>
                <input
                  id="contact-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Gallery, institution, or private collector"
                  className="w-full px-4 py-2.5 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm text-center sm:text-left"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-type"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold text-center sm:text-left"
              >
                Enquiry type
              </label>
              <select
                id="contact-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm text-center sm:text-left"
              >
                <option value="Collector / Acquisition Enquiry">Collector / Artwork Acquisition</option>
                <option value="Curatorial & Institutional Loan">Curatorial &amp; Institutional Loan</option>
                <option value="Studio Visit Request">Studio Visit Request</option>
                <option value="Press & Publication">Press &amp; Publication</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold text-center sm:text-left"
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please share details about your enquiry, specific artworks of interest, or proposed timelines..."
                className="w-full px-4 py-2.5 bg-white/80 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm text-center sm:text-left"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs uppercase tracking-[0.14em] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all flex items-center justify-center space-x-2 text-center"
              >
                <Send size={13} />
                <span>Open Email App</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3 px-5 bg-white/80 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs uppercase tracking-[0.14em] font-semibold rounded-sm hover:bg-white transition-all flex items-center justify-center space-x-2 text-center"
              >
                {copied ? (
                  <Check size={13} className="text-emerald-700" />
                ) : (
                  <Copy size={13} />
                )}
                <span>{copied ? "Message Copied" : "Copy Message"}</span>
              </button>
            </div>

            <p className="text-xs text-[#38435C]/75 pt-2 text-center sm:text-left">
              Opens your email app with your enquiry filled in. If your email app does not open automatically, click &ldquo;Copy Message&rdquo; and email <code>{artistData.contact.email}</code> directly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
