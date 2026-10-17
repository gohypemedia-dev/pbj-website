"use client";

import React, { useState, useEffect } from "react";
import { Artwork } from "@/data/artworks";
import { artistData } from "@/data/artist";
import { X, Mail, Copy, Check, Send } from "lucide-react";

interface EnquiryModalProps {
  artwork?: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({
  artwork,
  isOpen,
  onClose
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [interestType, setInterestType] = useState<"acquisition" | "exhibition" | "studio_visit" | "general">("acquisition");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Set default message when artwork changes
  useEffect(() => {
    if (artwork) {
      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to inquire about the availability, provenance, and acquisition details for the artwork "${artwork.title}" (${artwork.year}, ${artwork.medium}, ${artwork.dimensions}).\n\nPlease let me know the current status and acquisition guidelines.\n\nThank you,\n${name || "[Your Name]"}`
      );
    } else {
      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to inquire regarding curatorial collaboration and studio acquisition details.\n\nThank you,\n${name || "[Your Name]"}`
      );
    }
  }, [artwork, name]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subjectText = artwork
    ? `Curatorial / Acquisition Inquiry: "${artwork.title}" (${artwork.year})`
    : `Studio Inquiry: Prakash Bal Joshi Studio Archive`;

  const mailtoLink = `mailto:${artistData.contact.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(
    `From: ${name || "Collector / Curator"}\nEmail: ${email || "Not specified"}\nAffiliation: ${organization || "Independent"}\nInterest: ${interestType}\n\nMessage:\n${message}`
  )}`;

  const handleCopy = () => {
    const textToCopy = `To: ${artistData.contact.email}\nSubject: ${subjectText}\n\nFrom: ${name}\nEmail: ${email}\nAffiliation: ${organization}\n\n${message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2A49]/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#E9ECEF] border border-[#1B2A49]/20 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-sm shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#1B2A49]/15 pb-4 mb-6">
          <div>
            <span className="eyebrow-label">Curatorial &amp; Acquisition Office</span>
            <h2
              id="enquiry-modal-title"
              className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A49] mt-1"
            >
              {artwork ? `Inquire: ${artwork.title}` : "Studio Inquiry"}
            </h2>
            {artwork && (
              <p className="font-body text-xs text-[#38435C] italic mt-0.5">
                {artwork.medium} &middot; {artwork.dimensions} &middot; {artwork.year}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#1B2A49] hover:bg-[#1B2A49]/10 rounded"
            aria-label="Close enquiry modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-sm">
          <div>
            <label
              htmlFor="enquiry-name"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Full Name *
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Elena Rostova"
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="enquiry-email"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Email Address *
              </label>
              <input
                id="enquiry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="curator@gallery.org"
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="enquiry-org"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Institution / Collector
              </label>
              <input
                id="enquiry-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Modern Arts Foundation"
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="enquiry-type"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Inquiry Type
            </label>
            <select
              id="enquiry-type"
              value={interestType}
              onChange={(e) => setInterestType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-sans"
            >
              <option value="acquisition">Private / Institutional Acquisition</option>
              <option value="exhibition">Curatorial Loan / Biennial Exhibition</option>
              <option value="studio_visit">Studio Visit (Mumbai)</option>
              <option value="general">Press &amp; General Inquiries</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="enquiry-msg"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Message to Studio Archive
            </label>
            <textarea
              id="enquiry-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
            />
          </div>

          {/* Direct Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={mailtoLink}
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center"
            >
              <Send size={14} />
              <span>Send via Email Client</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center space-x-2 py-3 px-4 bg-white/70 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-all text-center"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>{copied ? "Copied to Clipboard" : "Copy Inquiry Text"}</span>
            </button>
          </div>

          <p className="text-[11px] text-[#38435C]/75 pt-2 border-t border-[#1B2A49]/10">
            Direct studio delivery: <code>{artistData.contact.email}</code>. Messages are received directly by the artist&rsquo;s studio archive in Mumbai.
          </p>
        </div>
      </div>
    </div>
  );
}
