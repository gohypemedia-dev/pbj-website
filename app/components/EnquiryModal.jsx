"use client";

import React, { useState, useEffect } from "react";
import { artistData } from "@/data/artist";
import { X, Copy, Check, Send } from "lucide-react";

export default function EnquiryModal({
  artwork,
  isOpen,
  onClose
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [inquiryType, setInquiryType] = useState("Collector / Acquisition");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Set default message when artwork changes
  useEffect(() => {
    if (artwork) {
      const details = [artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(", ");
      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to enquire about "${artwork.title}"${details ? ` (${details})` : ""}.\n\nPlease let me know the current availability and details.\n\nThank you,\n${name || "[Your Name]"}`
      );
    } else {
      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to enquire regarding your artwork and studio appointments.\n\nThank you,\n${name || "[Your Name]"}`
      );
    }
  }, [artwork, name]);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
    ? `Enquiry: "${artwork.title}"${artwork.year ? ` (${artwork.year})` : ""}`
    : `Studio Enquiry: Prakash Bal Joshi`;

  const mailtoLink = `mailto:${artistData.contact.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(message)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `To: ${artistData.contact.email}\nSubject: ${subjectText}\n\n${message}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Acquisition &amp; Studio Enquiry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2A49]/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#E9ECEF] border border-[#1B2A49]/20 rounded-sm shadow-2xl p-6 sm:p-8 text-[#1B2A49]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#38435C] hover:text-[#1B2A49] focus:outline-none focus:ring-2 focus:ring-[#1B2A49] rounded-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <span className="eyebrow-label block mb-1">Direct Studio Enquiry</span>
        <h2 className="font-heading text-2xl font-bold mb-4">
          {artwork ? `Acquire “${artwork.title}”` : "General Studio Enquiry"}
        </h2>

        {artwork && (
          <div className="mb-5 p-3.5 bg-white/70 border border-[#1B2A49]/10 rounded-sm text-xs font-body space-y-0.5">
            <p className="font-semibold text-[#1B2A49]">{artwork.title}</p>
            <p className="text-[#38435C]/80 italic">
              {[artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ")}
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailtoLink;
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-name" className="block text-xs uppercase tracking-wider font-heading mb-1 text-[#38435C]">
                Your Name *
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 bg-white border border-[#1B2A49]/20 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1B2A49]"
              />
            </div>

            <div>
              <label htmlFor="enquiry-email" className="block text-xs uppercase tracking-wider font-heading mb-1 text-[#38435C]">
                Email Address *
              </label>
              <input
                id="enquiry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 bg-white border border-[#1B2A49]/20 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1B2A49]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-org" className="block text-xs uppercase tracking-wider font-heading mb-1 text-[#38435C]">
                Gallery / Institution (Optional)
              </label>
              <input
                id="enquiry-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Private Collector / Foundation"
                className="w-full px-3 py-2 bg-white border border-[#1B2A49]/20 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1B2A49]"
              />
            </div>

            <div>
              <label htmlFor="enquiry-type" className="block text-xs uppercase tracking-wider font-heading mb-1 text-[#38435C]">
                Enquiry Type
              </label>
              <select
                id="enquiry-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#1B2A49]/20 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#1B2A49]"
              >
                <option>Collector / Acquisition</option>
                <option>Curatorial / Museum Loan</option>
                <option>Studio Visit (Mumbai)</option>
                <option>Press / Publication</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="enquiry-msg" className="block text-xs uppercase tracking-wider font-heading mb-1 text-[#38435C]">
              Message
            </label>
            <textarea
              id="enquiry-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#1B2A49]/20 rounded-sm text-sm font-body focus:outline-none focus:ring-1 focus:ring-[#1B2A49]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#1B2A49]/90 transition-colors cursor-pointer"
            >
              <span>Send via Email Client</span>
              <Send size={13} />
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 border border-[#1B2A49]/30 text-[#1B2A49] bg-white/50 font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-green-700" />
                  <span className="text-green-700">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

