"use client";

import React, { useState, useEffect, useRef } from "react";
import { artistData } from "@/data/artist";
import { X, Copy, Check, Send } from "lucide-react";

export default function WorksEnquiryModal({
  artwork,
  isOpen,
  onClose,
  triggerElement
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [inquiryType, setInquiryType] = useState("Collector / Acquisition");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Set default message when artwork changes
  useEffect(() => {
    if (artwork) {
      const artworkDetails = [artwork.year, artwork.medium, artwork.dimensions]
        .filter(Boolean)
        .join(", ");
      const detailsSuffix = artworkDetails ? ` (${artworkDetails})` : "";

      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to enquire about "${artwork.title}"${detailsSuffix}.\n\nPlease let me know the current availability and details.\n\nThank you,\n${name || "[Your Name]"}`
      );
    } else {
      setMessage(
        `Dear Studio of Prakash Bal Joshi,\n\nI am writing to enquire regarding your available paintings and studio appointments.\n\nThank you,\n${name || "[Your Name]"}`
      );
    }
  }, [artwork, name]);

  // Focus trap, Escape key, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = triggerElement || document.activeElement;

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "unset";
      if (previousFocus && typeof previousFocus.focus === "function") {
        setTimeout(() => {
          previousFocus.focus();
        }, 50);
      }
    };
  }, [isOpen, onClose, triggerElement]);

  if (!isOpen) return null;

  const subjectText = artwork
    ? `Enquiry: "${artwork.title}"${artwork.year ? ` (${artwork.year})` : ""}`
    : "Studio Enquiry: Prakash Bal Joshi";

  const mailtoLink = `mailto:${artistData.contact.email}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(
    `Name: ${name || "Not specified"}\nEmail: ${email || "Not specified"}\nOrganisation: ${organization || "Not specified"}\nEnquiry Type: ${inquiryType}\n\nMessage:\n${message}`
  )}`;

  const handleCopy = () => {
    const textToCopy = `To: ${artistData.contact.email}\nSubject: ${subjectText}\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organization}\n\nMessage:\n${message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const formattedArtworkMeta = artwork
    ? [artwork.artist, artwork.medium, artwork.dimensions, artwork.year]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="works-enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2A49]/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#E9ECEF] border border-[#1B2A49]/20 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-sm shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-[#1B2A49]/10">
          <div>
            <span className="eyebrow-label text-[#1B2A49]">Contact the Studio</span>
            <h2
              id="works-enquiry-modal-title"
              className="font-heading text-xl sm:text-2xl font-bold text-[#1B2A49] mt-0.5"
            >
              {artwork ? `Enquire: ${artwork.title}` : "Studio Enquiry"}
            </h2>
            {formattedArtworkMeta && (
              <p className="font-body text-xs text-[#38435C] italic mt-0.5">
                {formattedArtworkMeta}
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#1B2A49] hover:bg-[#1B2A49]/10 rounded transition-colors"
            aria-label="Close enquiry dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-sm">
          <div>
            <label
              htmlFor="works-enquiry-name"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Name *
            </label>
            <input
              id="works-enquiry-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="works-enquiry-email"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Email *
              </label>
              <input
                id="works-enquiry-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="works-enquiry-org"
                className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
              >
                Organisation — optional
              </label>
              <input
                id="works-enquiry-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Institution or gallery"
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] placeholder:text-[#38435C]/50 focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="works-enquiry-type"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Enquiry type
            </label>
            <select
              id="works-enquiry-type"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
            >
              <option value="Collector / Acquisition">Collector / Artwork Acquisition</option>
              <option value="Curatorial & Institutional Loan">Curatorial &amp; Institutional Loan</option>
              <option value="Studio Visit Request">Studio Visit Request</option>
              <option value="Press & General">Press &amp; General Enquiries</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="works-enquiry-msg"
              className="block font-heading text-xs uppercase tracking-wider text-[#1B2A49] mb-1 font-semibold"
            >
              Message
            </label>
            <textarea
              id="works-enquiry-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/70 border border-[#1B2A49]/20 rounded-sm text-[#1B2A49] focus:bg-white focus:border-[#1B2A49] transition-all font-body text-sm"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={mailtoLink}
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 bg-[#1B2A49] text-[#E9ECEF] font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#1B2A49]/90 transition-all text-center"
            >
              <Send size={13} />
              <span>Open Email App</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center space-x-2 py-3 px-4 bg-white/70 text-[#1B2A49] border border-[#1B2A49]/20 font-heading text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-all text-center"
            >
              {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
              <span>{copied ? "Message Copied" : "Copy Message"}</span>
            </button>
          </div>

          <p className="text-xs text-[#38435C]/75 pt-1">
            Directly addresses the studio at <code>{artistData.contact.email}</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

